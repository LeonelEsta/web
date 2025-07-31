// Mejorar la simulación de base de datos para persistencia real
const mockDatabase = {
  users: [
    {
      id: 1,
      username: "admin",
      password: "password",
      email: "admin@company.com",
      full_name: "Administrador Sistema",
      role: "admin",
      department: "IT",
      position: "System Administrator",
      hire_date: "2023-01-01",
      status: "active",
    },
    {
      id: 2,
      username: "juan.perez",
      password: "password",
      email: "juan.perez@company.com",
      full_name: "Juan Pérez",
      role: "user",
      department: "Marketing",
      position: "Marketing Specialist",
      hire_date: "2024-01-15",
      status: "active",
    },
    {
      id: 3,
      username: "maria.garcia",
      password: "password",
      email: "maria.garcia@company.com",
      full_name: "María García",
      role: "user",
      department: "HR",
      position: "HR Coordinator",
      hire_date: "2024-02-01",
      status: "active",
    },
    {
      id: 4,
      username: "carlos.lopez",
      password: "password",
      email: "carlos.lopez@company.com",
      full_name: "Carlos López",
      role: "user",
      department: "Sales",
      position: "Sales Representative",
      hire_date: "2024-03-01",
      status: "active",
    },
  ],

  taskCategories: [
    { id: 1, name: "Onboarding", description: "Tareas de integración", color: "#10b981" },
    { id: 2, name: "Capacitación", description: "Cursos y entrenamientos", color: "#3b82f6" },
    { id: 3, name: "Proyectos", description: "Tareas de proyectos específicos", color: "#f59e0b" },
    { id: 4, name: "Administrativo", description: "Tareas administrativas", color: "#64748b" },
    { id: 5, name: "Desarrollo Personal", description: "Crecimiento profesional", color: "#8b5cf6" },
  ],

  tasks: [
    {
      id: 1,
      title: "Completar perfil de empleado",
      description: "Llenar toda la información personal y profesional en el sistema",
      category_id: 1,
      assigned_to: 2,
      created_by: 1,
      priority: "high",
      status: "in_progress",
      progress: 75,
      due_date: "2024-01-20",
      created_at: "2024-01-15",
      updated_at: "2024-01-18",
      notes: "Falta completar información de contacto de emergencia",
    },
    {
      id: 2,
      title: "Curso de seguridad informática",
      description: "Completar el curso obligatorio de seguridad informática",
      category_id: 2,
      assigned_to: 2,
      created_by: 1,
      priority: "medium",
      status: "in_progress",
      progress: 50,
      due_date: "2024-01-25",
      created_at: "2024-01-15",
      updated_at: "2024-01-18",
      notes: "Completado módulo 1 y 2 del curso",
    },
    {
      id: 3,
      title: "Revisión de políticas de empresa",
      description: "Leer y confirmar entendimiento de las políticas",
      category_id: 1,
      assigned_to: 3,
      created_by: 1,
      priority: "high",
      status: "completed",
      progress: 100,
      due_date: "2024-02-05",
      created_at: "2024-02-01",
      updated_at: "2024-02-03",
      notes: "Políticas revisadas y confirmadas",
    },
    {
      id: 4,
      title: "Proyecto de marketing Q1",
      description: "Desarrollar estrategia de marketing para el primer trimestre",
      category_id: 3,
      assigned_to: 2,
      created_by: 1,
      priority: "high",
      status: "in_progress",
      progress: 25,
      due_date: "2024-03-31",
      created_at: "2024-01-15",
      updated_at: "2024-01-20",
      notes: "Investigación inicial completada",
    },
    {
      id: 5,
      title: "Actualizar base de datos de clientes",
      description: "Revisar y actualizar información de contactos",
      category_id: 4,
      assigned_to: 4,
      created_by: 1,
      priority: "medium",
      status: "in_progress",
      progress: 60,
      due_date: "2024-02-15",
      created_at: "2024-02-01",
      updated_at: "2024-02-10",
      notes: "Actualizado 60% de los contactos",
    },
  ],

  recognitions: [
    {
      id: 1,
      user_id: 2,
      given_by: 1,
      title: "Excelente integración",
      description: "Juan se adaptó rápidamente al equipo y mostró gran iniciativa",
      type: "achievement",
      points: 100,
      created_at: "2024-01-20",
    },
    {
      id: 2,
      user_id: 3,
      given_by: 1,
      title: "Colaboración excepcional",
      description: "María ayudó significativamente en el proceso de onboarding de nuevos empleados",
      type: "teamwork",
      points: 150,
      created_at: "2024-02-05",
    },
    {
      id: 3,
      user_id: 4,
      given_by: 1,
      title: "Meta de ventas superada",
      description: "Carlos superó su meta mensual de ventas en un 120%",
      type: "milestone",
      points: 200,
      created_at: "2024-02-15",
    },
  ],

  onboardingSteps: [
    {
      id: 1,
      title: "Bienvenida y orientación",
      description: "Sesión de bienvenida con HR",
      order_index: 1,
      estimated_hours: 2,
    },
    {
      id: 2,
      title: "Configuración de cuentas",
      description: "Crear cuentas de email y sistemas",
      order_index: 2,
      estimated_hours: 1,
    },
    {
      id: 3,
      title: "Tour de instalaciones",
      description: "Recorrido por las oficinas",
      order_index: 3,
      estimated_hours: 1,
    },
    {
      id: 4,
      title: "Capacitación en herramientas",
      description: "Entrenamiento en software",
      order_index: 4,
      estimated_hours: 4,
    },
    {
      id: 5,
      title: "Asignación de mentor",
      description: "Presentación con mentor",
      order_index: 5,
      estimated_hours: 1,
    },
    {
      id: 6,
      title: "Revisión de objetivos",
      description: "Definición de objetivos 90 días",
      order_index: 6,
      estimated_hours: 2,
    },
  ],

  userOnboarding: [
    { id: 1, user_id: 2, step_id: 1, status: "completed", progress: 100, completed_at: "2024-01-16" },
    { id: 2, user_id: 2, step_id: 2, status: "completed", progress: 100, completed_at: "2024-01-16" },
    { id: 3, user_id: 2, step_id: 3, status: "completed", progress: 100, completed_at: "2024-01-17" },
    { id: 4, user_id: 2, step_id: 4, status: "in_progress", progress: 75, completed_at: null },
    { id: 5, user_id: 2, step_id: 5, status: "not_started", progress: 0, completed_at: null },
    { id: 6, user_id: 2, step_id: 6, status: "not_started", progress: 0, completed_at: null },
    { id: 7, user_id: 3, step_id: 1, status: "completed", progress: 100, completed_at: "2024-02-02" },
    { id: 8, user_id: 3, step_id: 2, status: "completed", progress: 100, completed_at: "2024-02-02" },
    { id: 9, user_id: 3, step_id: 3, status: "completed", progress: 100, completed_at: "2024-02-03" },
    { id: 10, user_id: 3, step_id: 4, status: "completed", progress: 100, completed_at: "2024-02-05" },
    { id: 11, user_id: 3, step_id: 5, status: "completed", progress: 100, completed_at: "2024-02-06" },
    { id: 12, user_id: 3, step_id: 6, status: "completed", progress: 100, completed_at: "2024-02-07" },
  ],

  // Agregar sistema de actividad para tiempo real
  recentActivity: [],
}

// Sistema de persistencia mejorado
function saveToStorage() {
  localStorage.setItem("mockDatabase", JSON.stringify(mockDatabase))
}

function loadFromStorage() {
  const stored = localStorage.getItem("mockDatabase")
  if (stored) {
    const data = JSON.parse(stored)
    Object.assign(mockDatabase, data)
  }
}

// Cargar datos al iniciar
loadFromStorage()

// Sistema de notificaciones en tiempo real
let realTimeUpdateInterval

function startRealTimeUpdates() {
  // Actualizar cada 5 segundos para simular tiempo real
  realTimeUpdateInterval = setInterval(() => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      if (currentUser.role === "admin") {
        refreshAdminData()
      } else {
        refreshUserData()
      }
    }
  }, 5000)
}

function stopRealTimeUpdates() {
  if (realTimeUpdateInterval) {
    clearInterval(realTimeUpdateInterval)
  }
}

function refreshAdminData() {
  // Solo actualizar si estamos en la página de admin
  if (window.location.pathname.includes("admin-dashboard.html")) {
    const activeSection = document.querySelector(".content-section.active")
    if (activeSection) {
      const sectionId = activeSection.id
      // Placeholder for loadSectionData function
      console.log(`Loading section data for ${sectionId}`)
    }
  }
}

function refreshUserData() {
  // Solo actualizar si estamos en la página de usuario
  if (window.location.pathname.includes("user-dashboard.html")) {
    const activeSection = document.querySelector(".content-section.active")
    if (activeSection) {
      const sectionId = activeSection.id
      // Placeholder for loadUserSectionData function
      console.log(`Loading user section data for ${sectionId}`)
    }
  }
}

// Funciones de autenticación mejoradas
function login(username, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockDatabase.users.find((u) => u.username === username && u.password === password)

      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user))

        // Agregar actividad
        addActivity(`${user.full_name} inició sesión`, "login")

        resolve({ success: true, user: user })
      } else {
        resolve({ success: false, message: "Credenciales incorrectas" })
      }
    }, 1000)
  })
}

function logout() {
  const currentUser = getCurrentUser()
  if (currentUser) {
    addActivity(`${currentUser.full_name} cerró sesión`, "logout")
  }

  stopRealTimeUpdates()
  localStorage.removeItem("currentUser")
  window.location.href = "login.html"
}

function getCurrentUser() {
  const userStr = localStorage.getItem("currentUser")
  return userStr ? JSON.parse(userStr) : null
}

// Sistema de actividad mejorado
function addActivity(description, type = "general", userId = null) {
  const activity = {
    id: Date.now(),
    title:
      type === "login"
        ? "Inicio de sesión"
        : type === "logout"
          ? "Cierre de sesión"
          : type === "task_update"
            ? "Progreso actualizado"
            : type === "task_created"
              ? "Nueva tarea creada"
              : type === "user_created"
                ? "Nuevo usuario agregado"
                : "Actividad",
    description: description,
    type: type,
    user_id: userId,
    created_at: new Date().toISOString(),
  }

  mockDatabase.recentActivity.unshift(activity)

  // Mantener solo las últimas 50 actividades
  if (mockDatabase.recentActivity.length > 50) {
    mockDatabase.recentActivity = mockDatabase.recentActivity.slice(0, 50)
  }

  saveToStorage()
}

// Funciones para Admin mejoradas
function getAdminStats() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const totalEmployees = mockDatabase.users.filter((u) => u.role === "user").length
      const activeTasks = mockDatabase.tasks.filter((t) => t.status !== "completed").length
      const completedTasks = mockDatabase.tasks.filter((t) => t.status === "completed").length
      const onboardingUsers = mockDatabase.users.filter((u) => u.status === "onboarding").length

      resolve({
        totalEmployees,
        activeTasks,
        completedTasks,
        onboardingUsers,
      })
    }, 300)
  })
}

function getRecentActivity() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDatabase.recentActivity.slice(0, 10))
    }, 300)
  })
}

function getDepartmentProgress() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const departments = {}

      // Calcular progreso real por departamento
      mockDatabase.users
        .filter((u) => u.role === "user" && u.department)
        .forEach((user) => {
          if (!departments[user.department]) {
            departments[user.department] = { total: 0, completed: 0 }
          }

          const userTasks = mockDatabase.tasks.filter((t) => t.assigned_to === user.id)
          const completedTasks = userTasks.filter((t) => t.status === "completed")

          departments[user.department].total += userTasks.length
          departments[user.department].completed += completedTasks.length
        })

      const result = Object.keys(departments).map((dept) => ({
        department: dept,
        progress:
          departments[dept].total > 0 ? Math.round((departments[dept].completed / departments[dept].total) * 100) : 0,
      }))

      resolve(result)
    }, 300)
  })
}

function getAllEmployees() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const employees = mockDatabase.users.filter((u) => u.role === "user")
      resolve(employees)
    }, 300)
  })
}

function getAllTasks() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const tasksWithNames = mockDatabase.tasks.map((task) => {
        const assignedUser = mockDatabase.users.find((u) => u.id === task.assigned_to)
        const category = mockDatabase.taskCategories.find((c) => c.id === task.category_id)
        return {
          ...task,
          assigned_name: assignedUser ? assignedUser.full_name : "Sin asignar",
          category_name: category ? category.name : "Sin categoría",
        }
      })
      resolve(tasksWithNames)
    }, 300)
  })
}

// Función mejorada para crear empleados
function createEmployee(employeeData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Validar campos requeridos
      if (!employeeData.username || !employeeData.email || !employeeData.full_name || !employeeData.password) {
        resolve({ success: false, message: "Todos los campos son requeridos" })
        return
      }

      // Verificar si el usuario ya existe
      const existingUser = mockDatabase.users.find(
        (u) => u.username === employeeData.username || u.email === employeeData.email,
      )

      if (existingUser) {
        resolve({ success: false, message: "Usuario o email ya existe" })
        return
      }

      const newEmployee = {
        id: Math.max(...mockDatabase.users.map((u) => u.id)) + 1,
        username: employeeData.username.trim(),
        password: employeeData.password,
        email: employeeData.email.trim(),
        full_name: employeeData.full_name.trim(),
        role: employeeData.role || "user",
        department: employeeData.department || null,
        position: employeeData.position || null,
        hire_date: new Date().toISOString().split("T")[0],
        status: "active",
      }

      mockDatabase.users.push(newEmployee)
      saveToStorage()

      // Agregar actividad
      addActivity(`Nuevo empleado agregado: ${newEmployee.full_name}`, "user_created", newEmployee.id)

      resolve({ success: true, message: "Empleado creado correctamente", user: newEmployee })
    }, 500)
  })
}

// Función mejorada para crear tareas
function createTask(taskData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Validar campos requeridos
      if (!taskData.title || !taskData.assigned_to) {
        resolve({ success: false, message: "Título y usuario asignado son requeridos" })
        return
      }

      const currentUser = getCurrentUser()
      if (!currentUser) {
        resolve({ success: false, message: "Usuario no autenticado" })
        return
      }

      const newTask = {
        id: Math.max(...mockDatabase.tasks.map((t) => t.id)) + 1,
        title: taskData.title.trim(),
        description: taskData.description ? taskData.description.trim() : "",
        category_id: taskData.category_id ? Number.parseInt(taskData.category_id) : null,
        assigned_to: Number.parseInt(taskData.assigned_to),
        created_by: currentUser.id,
        priority: taskData.priority || "medium",
        status: "not_started",
        progress: 0,
        due_date: taskData.due_date || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        notes: "",
      }

      mockDatabase.tasks.push(newTask)
      saveToStorage()

      // Obtener nombre del usuario asignado
      const assignedUser = mockDatabase.users.find((u) => u.id === newTask.assigned_to)

      // Agregar actividad
      addActivity(
        `Nueva tarea asignada a ${assignedUser?.full_name}: ${newTask.title}`,
        "task_created",
        newTask.assigned_to,
      )

      resolve({ success: true, message: "Tarea creada correctamente", task: newTask })
    }, 500)
  })
}

// Funciones para Usuario mejoradas
function getUserStats(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userTasks = mockDatabase.tasks.filter((t) => t.assigned_to === userId)
      const activeTasks = userTasks.filter((t) => t.status !== "completed").length
      const completedTasks = userTasks.filter((t) => t.status === "completed").length
      const userRecognitions = mockDatabase.recognitions.filter((r) => r.user_id === userId)
      const totalPoints = userRecognitions.reduce((sum, r) => sum + r.points, 0)

      resolve({
        activeTasks,
        completedTasks,
        recognitions: userRecognitions.length,
        totalPoints,
      })
    }, 300)
  })
}

function getUserTasks(userId, filter = "all") {
  return new Promise((resolve) => {
    setTimeout(() => {
      let userTasks = mockDatabase.tasks.filter((t) => t.assigned_to === userId)

      if (filter === "pending") {
        userTasks = userTasks.filter((t) => t.status !== "completed")
      } else if (filter !== "all") {
        userTasks = userTasks.filter((t) => t.status === filter)
      }

      const tasksWithCategories = userTasks.map((task) => {
        const category = mockDatabase.taskCategories.find((c) => c.id === task.category_id)
        return {
          ...task,
          category_name: category ? category.name : "Sin categoría",
        }
      })

      resolve(tasksWithCategories)
    }, 300)
  })
}

function getUserActivity(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filtrar actividades del usuario
      const userActivities = mockDatabase.recentActivity
        .filter((activity) => activity.user_id === userId || activity.type === "general")
        .slice(0, 10)

      resolve(userActivities)
    }, 300)
  })
}

function getTaskById(taskId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const task = mockDatabase.tasks.find((t) => t.id === Number.parseInt(taskId))
      resolve(task)
    }, 200)
  })
}

// Función mejorada para actualizar progreso de tareas
function updateTaskProgress(taskId, status, progress, notes) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const taskIndex = mockDatabase.tasks.findIndex((t) => t.id == taskId)

      if (taskIndex !== -1) {
        const oldProgress = mockDatabase.tasks[taskIndex].progress
        const task = mockDatabase.tasks[taskIndex]

        mockDatabase.tasks[taskIndex].status = status
        mockDatabase.tasks[taskIndex].progress = Number.parseInt(progress)
        mockDatabase.tasks[taskIndex].notes = notes
        mockDatabase.tasks[taskIndex].updated_at = new Date().toISOString()

        saveToStorage()

        // Obtener información del usuario y tarea
        const user = mockDatabase.users.find((u) => u.id === task.assigned_to)

        // Agregar actividad solo si hay cambio significativo
        if (Math.abs(oldProgress - Number.parseInt(progress)) >= 10 || status === "completed") {
          addActivity(
            `${user?.full_name} actualizó "${task.title}" - ${progress}% completado`,
            "task_update",
            task.assigned_to,
          )
        }

        resolve({ success: true, message: "Progreso actualizado correctamente" })
      } else {
        resolve({ success: false, message: "Tarea no encontrada" })
      }
    }, 300)
  })
}

function getUserProgressByCategory(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userTasks = mockDatabase.tasks.filter((t) => t.assigned_to === userId)
      const categoryProgress = []

      mockDatabase.taskCategories.forEach((category) => {
        const categoryTasks = userTasks.filter((t) => t.category_id === category.id)
        const completedTasks = categoryTasks.filter((t) => t.status === "completed").length
        const totalTasks = categoryTasks.length
        const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

        if (totalTasks > 0) {
          categoryProgress.push({
            category_name: category.name,
            completed_tasks: completedTasks,
            total_tasks: totalTasks,
            progress_percentage: progressPercentage,
          })
        }
      })

      resolve(categoryProgress)
    }, 300)
  })
}

function getUserAchievements(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const completedTasks = mockDatabase.tasks.filter((t) => t.assigned_to === userId && t.status === "completed")
      const achievements = completedTasks.map((task) => ({
        title: `Tarea completada: ${task.title}`,
        description: task.description,
        completed_at: task.updated_at,
      }))

      resolve(achievements)
    }, 300)
  })
}

function getUserOnboarding(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userOnboardingSteps = mockDatabase.userOnboarding.filter((uo) => uo.user_id === userId)
      const onboardingWithSteps = userOnboardingSteps.map((uo) => {
        const step = mockDatabase.onboardingSteps.find((s) => s.id === uo.step_id)
        return {
          ...uo,
          title: step.title,
          description: step.description,
          estimated_hours: step.estimated_hours,
        }
      })

      resolve(onboardingWithSteps)
    }, 300)
  })
}

function completeOnboardingStep(userId, stepId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stepIndex = mockDatabase.userOnboarding.findIndex((uo) => uo.user_id === userId && uo.step_id === stepId)

      if (stepIndex !== -1) {
        mockDatabase.userOnboarding[stepIndex].status = "completed"
        mockDatabase.userOnboarding[stepIndex].progress = 100
        mockDatabase.userOnboarding[stepIndex].completed_at = new Date().toISOString()

        saveToStorage()

        // Agregar actividad
        const user = mockDatabase.users.find((u) => u.id === userId)
        const step = mockDatabase.onboardingSteps.find((s) => s.id === stepId)
        addActivity(`${user?.full_name} completó paso de onboarding: ${step?.title}`, "onboarding_update", userId)

        resolve({ success: true, message: "Paso completado correctamente" })
      } else {
        resolve({ success: false, message: "Paso no encontrado" })
      }
    }, 300)
  })
}

function getUserRecognitions(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userRecognitions = mockDatabase.recognitions.filter((r) => r.user_id === userId)
      const recognitionsWithGiver = userRecognitions.map((recognition) => {
        const giver = mockDatabase.users.find((u) => u.id === recognition.given_by)
        return {
          ...recognition,
          given_by_name: giver ? giver.full_name : "Sistema",
        }
      })

      resolve(recognitionsWithGiver)
    }, 300)
  })
}

function getUserProfile(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockDatabase.users.find((u) => u.id === userId)
      const userTasks = mockDatabase.tasks.filter((t) => t.assigned_to === userId)
      const completedTasks = userTasks.filter((t) => t.status === "completed").length
      const userRecognitions = mockDatabase.recognitions.filter((r) => r.user_id === userId)
      const totalPoints = userRecognitions.reduce((sum, r) => sum + r.points, 0)

      resolve({
        ...user,
        completed_tasks: completedTasks,
        recognitions_count: userRecognitions.length,
        total_points: totalPoints,
      })
    }, 300)
  })
}

// Funciones para reconocimientos
function getAllRecognitions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const recognitionsWithNames = mockDatabase.recognitions.map((recognition) => {
        const user = mockDatabase.users.find((u) => u.id === recognition.user_id)
        const giver = mockDatabase.users.find((u) => u.id === recognition.given_by)
        return {
          ...recognition,
          user_name: user ? user.full_name : "Usuario desconocido",
          given_by_name: giver ? giver.full_name : "Sistema",
        }
      })
      resolve(recognitionsWithNames)
    }, 300)
  })
}

function createRecognition(recognitionData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const currentUser = getCurrentUser()
      if (!currentUser) {
        resolve({ success: false, message: "Usuario no autenticado" })
        return
      }

      const newRecognition = {
        id: Math.max(...mockDatabase.recognitions.map((r) => r.id)) + 1,
        user_id: recognitionData.user_id,
        given_by: currentUser.id,
        title: recognitionData.title.trim(),
        description: recognitionData.description.trim(),
        type: recognitionData.type,
        points: recognitionData.points,
        created_at: new Date().toISOString(),
      }

      mockDatabase.recognitions.push(newRecognition)
      saveToStorage()

      // Obtener nombre del usuario
      const user = mockDatabase.users.find((u) => u.id === newRecognition.user_id)

      // Agregar actividad
      addActivity(
        `Nuevo reconocimiento para ${user?.full_name}: ${newRecognition.title}`,
        "recognition_created",
        newRecognition.user_id,
      )

      resolve({ success: true, message: "Reconocimiento creado correctamente", recognition: newRecognition })
    }, 500)
  })
}

// Funciones para onboarding
function getOnboardingSteps() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const steps = [...mockDatabase.onboardingSteps].sort((a, b) => a.order_index - b.order_index)
      resolve(steps)
    }, 300)
  })
}

function getOnboardingProgress() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const users = mockDatabase.users.filter((u) => u.role === "user")
      const progress = users.map((user) => {
        const userSteps = mockDatabase.userOnboarding.filter((uo) => uo.user_id === user.id)
        const completedSteps = userSteps.filter((us) => us.status === "completed").length
        const totalSteps = mockDatabase.onboardingSteps.length
        const progressPercentage = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0

        return {
          ...user,
          completed_steps: completedSteps,
          total_steps: totalSteps,
          progress_percentage: progressPercentage,
        }
      })

      resolve(progress)
    }, 300)
  })
}

function createOnboardingStep(stepData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Verificar si ya existe un paso con ese orden
      const existingStep = mockDatabase.onboardingSteps.find((s) => s.order_index === stepData.order_index)
      if (existingStep) {
        resolve({ success: false, message: "Ya existe un paso con ese número de orden" })
        return
      }

      const newStep = {
        id: Math.max(...mockDatabase.onboardingSteps.map((s) => s.id)) + 1,
        title: stepData.title.trim(),
        description: stepData.description.trim(),
        order_index: stepData.order_index,
        estimated_hours: stepData.estimated_hours,
        is_required: true,
        created_at: new Date().toISOString(),
      }

      mockDatabase.onboardingSteps.push(newStep)

      // Agregar este paso a todos los usuarios existentes
      const users = mockDatabase.users.filter((u) => u.role === "user")
      users.forEach((user) => {
        const newUserStep = {
          id: Math.max(...mockDatabase.userOnboarding.map((uo) => uo.id)) + 1,
          user_id: user.id,
          step_id: newStep.id,
          status: "not_started",
          progress: 0,
          notes: "",
          completed_at: null,
          updated_at: new Date().toISOString(),
        }
        mockDatabase.userOnboarding.push(newUserStep)
      })

      saveToStorage()

      // Agregar actividad
      addActivity(`Nuevo paso de onboarding agregado: ${newStep.title}`, "onboarding_step_created")

      resolve({ success: true, message: "Paso de onboarding agregado correctamente", step: newStep })
    }, 500)
  })
}

function deleteOnboardingStep(stepId) {
  if (confirm("¿Estás seguro de que quieres eliminar este paso de onboarding?")) {
    // Eliminar el paso
    const stepIndex = mockDatabase.onboardingSteps.findIndex((s) => s.id === stepId)
    if (stepIndex !== -1) {
      const step = mockDatabase.onboardingSteps[stepIndex]
      mockDatabase.onboardingSteps.splice(stepIndex, 1)

      // Eliminar todas las referencias de usuarios a este paso
      mockDatabase.userOnboarding = mockDatabase.userOnboarding.filter((uo) => uo.step_id !== stepId)

      saveToStorage()

      // Agregar actividad
      addActivity(`Paso de onboarding eliminado: ${step.title}`, "onboarding_step_deleted")

      // Recargar la vista
      loadOnboarding()
      showNotification("Paso de onboarding eliminado correctamente", "success")
    }
  }
}

// Función para actualizar empleados
function updateEmployee(employeeData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const employeeIndex = mockDatabase.users.findIndex((u) => u.id === employeeData.id)

      if (employeeIndex === -1) {
        resolve({ success: false, message: "Empleado no encontrado" })
        return
      }

      // Verificar si el username o email ya existen en otros usuarios
      const existingUser = mockDatabase.users.find(
        (u) => u.id !== employeeData.id && (u.username === employeeData.username || u.email === employeeData.email),
      )

      if (existingUser) {
        resolve({ success: false, message: "Usuario o email ya existe en otro empleado" })
        return
      }

      // Actualizar empleado
      const updatedEmployee = {
        ...mockDatabase.users[employeeIndex],
        username: employeeData.username.trim(),
        email: employeeData.email.trim(),
        full_name: employeeData.full_name.trim(),
        department: employeeData.department,
        position: employeeData.position,
        role: employeeData.role,
        status: employeeData.status,
        updated_at: new Date().toISOString(),
      }

      // Solo actualizar contraseña si se proporcionó una nueva
      if (employeeData.password) {
        updatedEmployee.password = employeeData.password
      }

      mockDatabase.users[employeeIndex] = updatedEmployee
      saveToStorage()

      // Agregar actividad
      addActivity(`Empleado actualizado: ${updatedEmployee.full_name}`, "user_updated", updatedEmployee.id)

      resolve({ success: true, message: "Empleado actualizado correctamente", user: updatedEmployee })
    }, 500)
  })
}

// Funciones auxiliares
function formatDate(dateString) {
  if (!dateString) return "N/A"

  const date = new Date(dateString)
  return date.toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Funciones para cargar datos en selectores
function loadTaskCategories() {
  const select = document.getElementById("taskCategory")
  if (select) {
    select.innerHTML = '<option value="">Seleccionar...</option>'
    mockDatabase.taskCategories.forEach((category) => {
      const option = document.createElement("option")
      option.value = category.id
      option.textContent = category.name
      select.appendChild(option)
    })
  }
}

function loadEmployeesList() {
  const select = document.getElementById("taskAssignee")
  if (select) {
    select.innerHTML = '<option value="">Seleccionar...</option>'
    const employees = mockDatabase.users.filter((u) => u.role === "user")
    employees.forEach((employee) => {
      const option = document.createElement("option")
      option.value = employee.id
      option.textContent = employee.full_name
      select.appendChild(option)
    })
  }
}

// Funciones adicionales para admin
function loadProgress() {
  console.log("Loading progress data...")
}

function loadOnboarding() {
  console.log("Loading onboarding data...")
}

function loadRecognitions() {
  console.log("Loading recognitions data...")
}

function loadReports() {
  console.log("Loading reports data...")
}

// Funciones de modal
function viewEmployeeDetails(employeeId) {
  alert(`Ver detalles del empleado ID: ${employeeId}`)
}

function editEmployee(employeeId) {
  alert(`Editar empleado ID: ${employeeId}`)
}

function viewTaskDetails(taskId) {
  alert(`Ver detalles de la tarea ID: ${taskId}`)
}

function editTask(taskId) {
  alert(`Editar tarea ID: ${taskId}`)
}

function openAddEmployeeModal() {
  document.getElementById("addEmployeeModal").style.display = "block"
}

function openAddTaskModal() {
  loadTaskCategories()
  loadEmployeesList()
  document.getElementById("addTaskModal").style.display = "block"
}

function openAddOnboardingStepModal() {
  // Calcular el siguiente número de orden
  const maxOrder = Math.max(...mockDatabase.onboardingSteps.map((s) => s.order_index), 0)
  document.getElementById("stepOrder").value = maxOrder + 1
  document.getElementById("addOnboardingStepModal").style.display = "block"
}

function openAddRecognitionModal() {
  loadEmployeesForRecognition()
  document.getElementById("addRecognitionModal").style.display = "block"
}

function generateReport() {
  alert("Generando reporte...")
}

// Event listeners mejorados para formularios
document.addEventListener("DOMContentLoaded", () => {
  // Iniciar actualizaciones en tiempo real
  startRealTimeUpdates()

  // Formulario de agregar empleado mejorado
  const addEmployeeForm = document.getElementById("addEmployeeForm")
  if (addEmployeeForm) {
    addEmployeeForm.addEventListener("submit", async function (e) {
      e.preventDefault()

      const formData = new FormData(this)
      const employeeData = {
        username: formData.get("username"),
        password: formData.get("password"),
        email: formData.get("email"),
        full_name: formData.get("full_name"),
        role: formData.get("role"),
        department: formData.get("department"),
        position: formData.get("position"),
      }

      try {
        const result = await createEmployee(employeeData)

        if (result.success) {
          closeModal("addEmployeeModal")
          this.reset()

          // Actualizar vista de empleados si estamos en esa sección
          if (document.getElementById("employees").classList.contains("active")) {
            loadEmployees()
          }

          // Actualizar estadísticas del dashboard
          // Placeholder for loadDashboard function
          console.log("Loading dashboard...")

          showNotification("Empleado agregado correctamente", "success")
        } else {
          showNotification(result.message, "error")
        }
      } catch (error) {
        showNotification("Error al agregar empleado", "error")
      }
    })
  }

  // Formulario de agregar tarea mejorado
  const addTaskForm = document.getElementById("addTaskForm")
  if (addTaskForm) {
    addTaskForm.addEventListener("submit", async function (e) {
      e.preventDefault()

      const formData = new FormData(this)
      const taskData = {
        title: formData.get("title"),
        description: formData.get("description"),
        category_id: formData.get("category_id"),
        assigned_to: formData.get("assigned_to"),
        priority: formData.get("priority"),
        due_date: formData.get("due_date"),
      }

      try {
        const result = await createTask(taskData)

        if (result.success) {
          closeModal("addTaskModal")
          this.reset()

          // Actualizar vista de tareas si estamos en esa sección
          if (document.getElementById("tasks").classList.contains("active")) {
            loadTasks()
          }

          // Actualizar estadísticas del dashboard
          // Placeholder for loadDashboard function
          console.log("Loading dashboard...")

          showNotification("Tarea creada correctamente", "success")
        } else {
          showNotification(result.message, "error")
        }
      } catch (error) {
        showNotification("Error al crear tarea", "error")
      }
    })
  }
})

function closeModal(modalId) {
  const modal = document.getElementById(modalId)
  if (modal) {
    modal.style.display = "none"
  }
}

// Función para mostrar notificaciones
function showNotification(message, type) {
  // Remover notificaciones existentes
  const existingNotifications = document.querySelectorAll(".notification-toast")
  existingNotifications.forEach((n) => n.remove())

  // Crear nueva notificación
  const notification = document.createElement("div")
  notification.className = `message message-${type} notification-toast`
  notification.innerHTML = `<i class="fas fa-${type === "success" ? "check-circle" : "exclamation-circle"}"></i> ${message}`
  notification.style.position = "fixed"
  notification.style.top = "20px"
  notification.style.right = "20px"
  notification.style.zIndex = "9999"
  notification.style.minWidth = "300px"
  notification.style.animation = "slideIn 0.3s ease-out"

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "fadeOut 0.3s ease-out"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove()
      }
    }, 300)
  }, 3000)
}

// Funciones placeholder mejoradas
function loadEmployees() {
  if (typeof getAllEmployees === "function") {
    // La función real se ejecutará en admin-dashboard.html
    console.log("Loading employees...")
  }
}

function loadTasks() {
  if (typeof getAllTasks === "function") {
    // La función real se ejecutará en admin-dashboard.html
    console.log("Loading tasks...")
  }
}

function loadDashboard() {
  // Placeholder for loadDashboard function
  console.log("Loading dashboard...")
}
function loadEmployeesForRecognition() {
  const select = document.getElementById("recognitionAssignee")
  if (select) {
    select.innerHTML = '<option value="">Seleccionar...</option>'
    const employees = mockDatabase.users.filter((u) => u.role === "user")
    employees.forEach((employee) => {
      const option = document.createElement("option")
      option.value = employee.id
      option.textContent = employee.full_name
      select.appendChild(option)
    })
  }
}
