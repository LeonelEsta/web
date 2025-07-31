<?php
// Configuración de base de datos
$host = 'localhost';
$dbname = 'talent_management';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Error de conexión: " . $e->getMessage());
}

// Configurar headers para CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

// Obtener método HTTP y endpoint
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'] ?? '', '/'));
$endpoint = $request[0] ?? '';

// Función para enviar respuesta JSON
function sendResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

// Función para obtener datos POST/PUT
function getRequestData() {
    return json_decode(file_get_contents('php://input'), true);
}

// Función para validar autenticación (simplificada para demo)
function validateAuth() {
    // En producción, validar JWT o sesión
    return true;
}

// Router principal
switch ($endpoint) {
    case 'login':
        handleLogin();
        break;
    
    case 'users':
        handleUsers();
        break;
    
    case 'tasks':
        handleTasks();
        break;
    
    case 'progress':
        handleProgress();
        break;
    
    case 'recognitions':
        handleRecognitions();
        break;
    
    case 'onboarding':
        handleOnboarding();
        break;
    
    case 'stats':
        handleStats();
        break;
    
    default:
        sendResponse(['error' => 'Endpoint no encontrado'], 404);
}

// Manejar login
function handleLogin() {
    global $pdo, $method;
    
    if ($method !== 'POST') {
        sendResponse(['error' => 'Método no permitido'], 405);
    }
    
    $data = getRequestData();
    $username = $data['username'] ?? '';
    $password = $data['password'] ?? '';
    
    if (empty($username) || empty($password)) {
        sendResponse(['error' => 'Usuario y contraseña requeridos'], 400);
    }
    
    try {
        $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ?");
        $stmt->execute([$username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user && password_verify($password, $user['password'])) {
            // Remover contraseña de la respuesta
            unset($user['password']);
            sendResponse([
                'success' => true,
                'user' => $user,
                'message' => 'Login exitoso'
            ]);
        } else {
            sendResponse([
                'success' => false,
                'message' => 'Credenciales incorrectas'
            ], 401);
        }
    } catch (Exception $e) {
        sendResponse(['error' => 'Error del servidor'], 500);
    }
}

// Manejar usuarios
function handleUsers() {
    global $pdo, $method;
    
    if (!validateAuth()) {
        sendResponse(['error' => 'No autorizado'], 401);
    }
    
    switch ($method) {
        case 'GET':
            try {
                $stmt = $pdo->query("SELECT id, username, email, full_name, role, department, position, hire_date, status FROM users WHERE role = 'user'");
                $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
                sendResponse($users);
            } catch (Exception $e) {
                sendResponse(['error' => 'Error obteniendo usuarios'], 500);
            }
            break;
        
        case 'POST':
            $data = getRequestData();
            
            // Validar datos requeridos
            $required = ['username', 'password', 'email', 'full_name'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    sendResponse(['error' => "Campo $field requerido"], 400);
                }
            }
            
            try {
                $hashedPassword = password_hash($data['password'], PASSWORD_DEFAULT);
                
                $stmt = $pdo->prepare("
                    INSERT INTO users (username, password, email, full_name, role, department, position, hire_date) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, CURDATE())
                ");
                
                $stmt->execute([
                    $data['username'],
                    $hashedPassword,
                    $data['email'],
                    $data['full_name'],
                    $data['role'] ?? 'user',
                    $data['department'] ?? null,
                    $data['position'] ?? null
                ]);
                
                sendResponse([
                    'success' => true,
                    'message' => 'Usuario creado correctamente',
                    'id' => $pdo->lastInsertId()
                ]);
            } catch (PDOException $e) {
                if ($e->getCode() == 23000) {
                    sendResponse(['error' => 'Usuario o email ya existe'], 409);
                } else {
                    sendResponse(['error' => 'Error creando usuario'], 500);
                }
            }
            break;
        
        default:
            sendResponse(['error' => 'Método no permitido'], 405);
    }
}

// Manejar tareas
function handleTasks() {
    global $pdo, $method, $request;
    
    if (!validateAuth()) {
        sendResponse(['error' => 'No autorizado'], 401);
    }
    
    switch ($method) {
        case 'GET':
            $userId = $request[1] ?? null;
            
            try {
                if ($userId) {
                    // Obtener tareas de un usuario específico
                    $stmt = $pdo->prepare("
                        SELECT t.*, tc.name as category_name, u.full_name as assigned_name
                        FROM tasks t
                        LEFT JOIN task_categories tc ON t.category_id = tc.id
                        LEFT JOIN users u ON t.assigned_to = u.id
                        WHERE t.assigned_to = ?
                        ORDER BY t.created_at DESC
                    ");
                    $stmt->execute([$userId]);
                } else {
                    // Obtener todas las tareas
                    $stmt = $pdo->query("
                        SELECT t.*, tc.name as category_name, u.full_name as assigned_name
                        FROM tasks t
                        LEFT JOIN task_categories tc ON t.category_id = tc.id
                        LEFT JOIN users u ON t.assigned_to = u.id
                        ORDER BY t.created_at DESC
                    ");
                }
                
                $tasks = $stmt->fetchAll(PDO::FETCH_ASSOC);
                sendResponse($tasks);
            } catch (Exception $e) {
                sendResponse(['error' => 'Error obteniendo tareas'], 500);
            }
            break;
        
        case 'POST':
            $data = getRequestData();
            
            // Validar datos requeridos
            $required = ['title', 'assigned_to', 'created_by'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    sendResponse(['error' => "Campo $field requerido"], 400);
                }
            }
            
            try {
                $stmt = $pdo->prepare("
                    INSERT INTO tasks (title, description, category_id, assigned_to, created_by, priority, due_date) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ");
                
                $stmt->execute([
                    $data['title'],
                    $data['description'] ?? null,
                    $data['category_id'] ?? null,
                    $data['assigned_to'],
                    $data['created_by'],
                    $data['priority'] ?? 'medium',
                    $data['due_date'] ?? null
                ]);
                
                sendResponse([
                    'success' => true,
                    'message' => 'Tarea creada correctamente',
                    'id' => $pdo->lastInsertId()
                ]);
            } catch (Exception $e) {
                sendResponse(['error' => 'Error creando tarea'], 500);
            }
            break;
        
        case 'PUT':
            $taskId = $request[1] ?? null;
            if (!$taskId) {
                sendResponse(['error' => 'ID de tarea requerido'], 400);
            }
            
            $data = getRequestData();
            
            try {
                // Actualizar tarea
                $stmt = $pdo->prepare("
                    UPDATE tasks 
                    SET status = ?, progress = ?, updated_at = CURRENT_TIMESTAMP 
                    WHERE id = ?
                ");
                
                $stmt->execute([
                    $data['status'] ?? 'not_started',
                    $data['progress'] ?? 0,
                    $taskId
                ]);
                
                // Insertar/actualizar progreso
                if (isset($data['notes'])) {
                    $stmt = $pdo->prepare("
                        INSERT INTO task_progress (task_id, user_id, progress_percentage, notes) 
                        VALUES (?, ?, ?, ?)
                        ON DUPLICATE KEY UPDATE 
                        progress_percentage = VALUES(progress_percentage),
                        notes = VALUES(notes),
                        updated_at = CURRENT_TIMESTAMP
                    ");
                    
                    $stmt->execute([
                        $taskId,
                        $data['user_id'] ?? 1,
                        $data['progress'] ?? 0,
                        $data['notes']
                    ]);
                }
                
                sendResponse([
                    'success' => true,
                    'message' => 'Progreso actualizado correctamente'
                ]);
            } catch (Exception $e) {
                sendResponse(['error' => 'Error actualizando tarea'], 500);
            }
            break;
        
        default:
            sendResponse(['error' => 'Método no permitido'], 405);
    }
}

// Manejar progreso
function handleProgress() {
    global $pdo, $method, $request;
    
    if (!validateAuth()) {
        sendResponse(['error' => 'No autorizado'], 401);
    }
    
    if ($method !== 'GET') {
        sendResponse(['error' => 'Método no permitido'], 405);
    }
    
    $userId = $request[1] ?? null;
    
    try {
        if ($userId) {
            // Progreso por categoría para un usuario
            $stmt = $pdo->prepare("
                SELECT 
                    tc.name as category_name,
                    COUNT(t.id) as total_tasks,
                    SUM(CASE WHEN t.status = 'completed' THEN 1 ELSE 0 END) as completed_tasks,
                    ROUND(
                        (SUM(CASE WHEN t.status = 'completed' THEN 1 ELSE 0 END) / COUNT(t.id)) * 100, 
                        0
                    ) as progress_percentage
                FROM tasks t
                JOIN task_categories tc ON t.category_id = tc.id
                WHERE t.assigned_to = ?
                GROUP BY tc.id, tc.name
                HAVING total_tasks > 0
            ");
            $stmt->execute([$userId]);
        } else {
            // Progreso general por departamento
            $stmt = $pdo->query("
                SELECT 
                    u.department,
                    COUNT(t.id) as total_tasks,
                    SUM(CASE WHEN t.status = 'completed' THEN 1 ELSE 0 END) as completed_tasks,
                    ROUND(
                        (SUM(CASE WHEN t.status = 'completed' THEN 1 ELSE 0 END) / COUNT(t.id)) * 100, 
                        0
                    ) as progress
                FROM tasks t
                JOIN users u ON t.assigned_to = u.id
                WHERE u.department IS NOT NULL
                GROUP BY u.department
                HAVING total_tasks > 0
            ");
        }
        
        $progress = $stmt->fetchAll(PDO::FETCH_ASSOC);
        sendResponse($progress);
    } catch (Exception $e) {
        sendResponse(['error' => 'Error obteniendo progreso'], 500);
    }
}

// Manejar reconocimientos
function handleRecognitions() {
    global $pdo, $method, $request;
    
    if (!validateAuth()) {
        sendResponse(['error' => 'No autorizado'], 401);
    }
    
    switch ($method) {
        case 'GET':
            $userId = $request[1] ?? null;
            
            try {
                if ($userId) {
                    $stmt = $pdo->prepare("
                        SELECT r.*, u.full_name as given_by_name
                        FROM recognitions r
                        JOIN users u ON r.given_by = u.id
                        WHERE r.user_id = ?
                        ORDER BY r.created_at DESC
                    ");
                    $stmt->execute([$userId]);
                } else {
                    $stmt = $pdo->query("
                        SELECT r.*, u1.full_name as user_name, u2.full_name as given_by_name
                        FROM recognitions r
                        JOIN users u1 ON r.user_id = u1.id
                        JOIN users u2 ON r.given_by = u2.id
                        ORDER BY r.created_at DESC
                    ");
                }
                
                $recognitions = $stmt->fetchAll(PDO::FETCH_ASSOC);
                sendResponse($recognitions);
            } catch (Exception $e) {
                sendResponse(['error' => 'Error obteniendo reconocimientos'], 500);
            }
            break;
        
        case 'POST':
            $data = getRequestData();
            
            $required = ['user_id', 'given_by', 'title', 'description'];
            foreach ($required as $field) {
                if (empty($data[$field])) {
                    sendResponse(['error' => "Campo $field requerido"], 400);
                }
            }
            
            try {
                $stmt = $pdo->prepare("
                    INSERT INTO recognitions (user_id, given_by, title, description, type, points) 
                    VALUES (?, ?, ?, ?, ?, ?)
                ");
                
                $stmt->execute([
                    $data['user_id'],
                    $data['given_by'],
                    $data['title'],
                    $data['description'],
                    $data['type'] ?? 'achievement',
                    $data['points'] ?? 100
                ]);
                
                sendResponse([
                    'success' => true,
                    'message' => 'Reconocimiento creado correctamente',
                    'id' => $pdo->lastInsertId()
                ]);
            } catch (Exception $e) {
                sendResponse(['error' => 'Error creando reconocimiento'], 500);
            }
            break;
        
        default:
            sendResponse(['error' => 'Método no permitido'], 405);
    }
}

// Manejar onboarding
function handleOnboarding() {
    global $pdo, $method, $request;
    
    if (!validateAuth()) {
        sendResponse(['error' => 'No autorizado'], 401);
    }
    
    switch ($method) {
        case 'GET':
            $userId = $request[1] ?? null;
            
            if (!$userId) {
                sendResponse(['error' => 'ID de usuario requerido'], 400);
            }
            
            try {
                $stmt = $pdo->prepare("
                    SELECT uo.*, os.title, os.description, os.estimated_hours
                    FROM user_onboarding uo
                    JOIN onboarding_steps os ON uo.step_id = os.id
                    WHERE uo.user_id = ?
                    ORDER BY os.order_index
                ");
                $stmt->execute([$userId]);
                
                $onboarding = $stmt->fetchAll(PDO::FETCH_ASSOC);
                sendResponse($onboarding);
            } catch (Exception $e) {
                sendResponse(['error' => 'Error obteniendo onboarding'], 500);
            }
            break;
        
        case 'PUT':
            $userId = $request[1] ?? null;
            $stepId = $request[2] ?? null;
            
            if (!$userId || !$stepId) {
                sendResponse(['error' => 'ID de usuario y paso requeridos'], 400);
            }
            
            try {
                $stmt = $pdo->prepare("
                    UPDATE user_onboarding 
                    SET status = 'completed', progress = 100, completed_at = CURRENT_TIMESTAMP
                    WHERE user_id = ? AND step_id = ?
                ");
                
                $stmt->execute([$userId, $stepId]);
                
                sendResponse([
                    'success' => true,
                    'message' => 'Paso de onboarding completado'
                ]);
            } catch (Exception $e) {
                sendResponse(['error' => 'Error actualizando onboarding'], 500);
            }
            break;
        
        default:
            sendResponse(['error' => 'Método no permitido'], 405);
    }
}

// Manejar estadísticas
function handleStats() {
    global $pdo, $method, $request;
    
    if (!validateAuth()) {
        sendResponse(['error' => 'No autorizado'], 401);
    }
    
    if ($method !== 'GET') {
        sendResponse(['error' => 'Método no permitido'], 405);
    }
    
    $type = $request[1] ?? 'admin';
    $userId = $request[2] ?? null;
    
    try {
        if ($type === 'admin') {
            // Estadísticas para admin
            $stats = [];
            
            // Total empleados
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM users WHERE role = 'user'");
            $stats['totalEmployees'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
            
            // Tareas activas
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM tasks WHERE status != 'completed'");
            $stats['activeTasks'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
            
            // Tareas completadas
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM tasks WHERE status = 'completed'");
            $stats['completedTasks'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
            
            // Usuarios en onboarding
            $stmt = $pdo->query("SELECT COUNT(*) as count FROM users WHERE status = 'onboarding'");
            $stats['onboardingUsers'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
            
            sendResponse($stats);
        } else if ($type === 'user' && $userId) {
            // Estadísticas para usuario específico
            $stats = [];
            
            // Tareas activas del usuario
            $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM tasks WHERE assigned_to = ? AND status != 'completed'");
            $stmt->execute([$userId]);
            $stats['activeTasks'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
            
            // Tareas completadas del usuario
            $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM tasks WHERE assigned_to = ? AND status = 'completed'");
            $stmt->execute([$userId]);
            $stats['completedTasks'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
            
            // Reconocimientos del usuario
            $stmt = $pdo->prepare("SELECT COUNT(*) as count FROM recognitions WHERE user_id = ?");
            $stmt->execute([$userId]);
            $stats['recognitions'] = $stmt->fetch(PDO::FETCH_ASSOC)['count'];
            
            // Puntos totales del usuario
            $stmt = $pdo->prepare("SELECT COALESCE(SUM(points), 0) as total FROM recognitions WHERE user_id = ?");
            $stmt->execute([$userId]);
            $stats['totalPoints'] = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
            
            sendResponse($stats);
        } else {
            sendResponse(['error' => 'Parámetros inválidos'], 400);
        }
    } catch (Exception $e) {
        sendResponse(['error' => 'Error obteniendo estadísticas'], 500);
    }
}
?>
