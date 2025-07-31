-- Base de datos para Panel de Gestión de Talento y Operaciones
CREATE DATABASE IF NOT EXISTS talent_management;
USE talent_management;

-- Tabla de usuarios
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    department VARCHAR(50),
    position VARCHAR(50),
    hire_date DATE,
    status ENUM('active', 'inactive', 'onboarding') DEFAULT 'active',
    avatar_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de categorías de tareas
CREATE TABLE task_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#3b82f6',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de tareas
CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category_id INT,
    assigned_to INT,
    created_by INT,
    priority ENUM('low', 'medium', 'high') DEFAULT 'medium',
    status ENUM('not_started', 'in_progress', 'completed') DEFAULT 'not_started',
    progress INT DEFAULT 0,
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES task_categories(id),
    FOREIGN KEY (assigned_to) REFERENCES users(id),
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Tabla de progreso de tareas
CREATE TABLE task_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    task_id INT,
    user_id INT,
    progress_percentage INT DEFAULT 0,
    notes TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla de reconocimientos
CREATE TABLE recognitions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    given_by INT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    type ENUM('achievement', 'milestone', 'excellence', 'teamwork') DEFAULT 'achievement',
    points INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (given_by) REFERENCES users(id)
);

-- Tabla de proceso de onboarding
CREATE TABLE onboarding_steps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    order_index INT DEFAULT 0,
    is_required BOOLEAN DEFAULT TRUE,
    estimated_hours INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de progreso de onboarding por usuario
CREATE TABLE user_onboarding (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    step_id INT,
    status ENUM('not_started', 'in_progress', 'completed') DEFAULT 'not_started',
    progress INT DEFAULT 0,
    notes TEXT,
    completed_at TIMESTAMP NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (step_id) REFERENCES onboarding_steps(id)
);

-- Insertar datos de ejemplo
INSERT INTO users (username, password, email, full_name, role, department, position, hire_date) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@company.com', 'Administrador Sistema', 'admin', 'IT', 'System Administrator', '2023-01-01'),
('juan.perez', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'juan.perez@company.com', 'Juan Pérez', 'user', 'Marketing', 'Marketing Specialist', '2024-01-15'),
('maria.garcia', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'maria.garcia@company.com', 'María García', 'user', 'HR', 'HR Coordinator', '2024-02-01'),
('carlos.lopez', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'carlos.lopez@company.com', 'Carlos López', 'user', 'Sales', 'Sales Representative', '2024-03-01');

INSERT INTO task_categories (name, description, color) VALUES
('Onboarding', 'Tareas de integración para nuevos empleados', '#10b981'),
('Capacitación', 'Cursos y entrenamientos', '#3b82f6'),
('Proyectos', 'Tareas de proyectos específicos', '#f59e0b'),
('Administrativo', 'Tareas administrativas y documentación', '#64748b'),
('Desarrollo Personal', 'Actividades de crecimiento profesional', '#8b5cf6');

INSERT INTO tasks (title, description, category_id, assigned_to, created_by, priority, due_date) VALUES
('Completar perfil de empleado', 'Llenar toda la información personal y profesional en el sistema', 1, 2, 1, 'high', '2024-01-20'),
('Curso de seguridad informática', 'Completar el curso obligatorio de seguridad informática', 2, 2, 1, 'medium', '2024-01-25'),
('Revisión de políticas de empresa', 'Leer y confirmar entendimiento de las políticas', 1, 3, 1, 'high', '2024-02-05'),
('Proyecto de marketing Q1', 'Desarrollar estrategia de marketing para el primer trimestre', 3, 2, 1, 'high', '2024-03-31'),
('Actualizar base de datos de clientes', 'Revisar y actualizar información de contactos', 4, 4, 1, 'medium', '2024-02-15');

INSERT INTO onboarding_steps (title, description, order_index, estimated_hours) VALUES
('Bienvenida y orientación', 'Sesión de bienvenida con HR y presentación de la empresa', 1, 2),
('Configuración de cuentas', 'Crear cuentas de email, sistemas internos y accesos', 2, 1),
('Tour de instalaciones', 'Recorrido por las oficinas y presentación del equipo', 3, 1),
('Capacitación en herramientas', 'Entrenamiento en software y herramientas de trabajo', 4, 4),
('Asignación de mentor', 'Presentación con mentor asignado y primera reunión', 5, 1),
('Revisión de objetivos', 'Definición de objetivos y metas para los primeros 90 días', 6, 2);

INSERT INTO recognitions (user_id, given_by, title, description, type, points) VALUES
(2, 1, 'Excelente integración', 'Juan se adaptó rápidamente al equipo y mostró gran iniciativa', 'achievement', 100),
(3, 1, 'Colaboración excepcional', 'María ayudó significativamente en el proceso de onboarding de nuevos empleados', 'teamwork', 150),
(4, 1, 'Meta de ventas superada', 'Carlos superó su meta mensual de ventas en un 120%', 'milestone', 200);

-- Insertar progreso inicial para las tareas
INSERT INTO task_progress (task_id, user_id, progress_percentage, notes) VALUES
(1, 2, 75, 'Falta completar información de contacto de emergencia'),
(2, 2, 50, 'Completado módulo 1 y 2 del curso'),
(3, 3, 100, 'Políticas revisadas y confirmadas'),
(4, 2, 25, 'Investigación inicial completada'),
(5, 4, 60, 'Actualizado 60% de los contactos');

-- Insertar progreso de onboarding
INSERT INTO user_onboarding (user_id, step_id, status, progress) VALUES
(2, 1, 'completed', 100),
(2, 2, 'completed', 100),
(2, 3, 'completed', 100),
(2, 4, 'in_progress', 75),
(2, 5, 'not_started', 0),
(2, 6, 'not_started', 0),
(3, 1, 'completed', 100),
(3, 2, 'completed', 100),
(3, 3, 'completed', 100),
(3, 4, 'completed', 100),
(3, 5, 'completed', 100),
(3, 6, 'completed', 100);
