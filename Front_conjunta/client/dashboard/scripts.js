// Fetch projects for select dropdowns and display all details
async function fetchProjects() {
    const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                query {
                    getAllProjects {
                        id
                        name
                        description
                        status
                    }
                }
            `
        })
    });

    const result = await response.json();
    const projects = result.data.getAllProjects;
    const projectList = document.getElementById('projectList');
    const taskProjectSelect = document.getElementById('taskProjectId');
    projectList.innerHTML = '';
    taskProjectSelect.innerHTML = '<option value="">Select Project</option>';

    projects.forEach(project => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>
                <strong>ID:</strong> ${project.id} - <strong>Name:</strong> ${project.name} - 
                <strong>Description:</strong> ${project.description} - <strong>Status:</strong> ${project.status}
            </span>
            <span class="action-btns">
                <i class="bi bi-pencil-fill text-primary icon-hover" onclick="updateProject(${project.id})"></i>
                <i class="bi bi-trash-fill text-danger icon-hover" onclick="deleteProject(${project.id})"></i>
            </span>
        `;
        projectList.appendChild(li);

        const option = document.createElement('option');
        option.value = project.id;
        option.textContent = project.name;
        taskProjectSelect.appendChild(option);
    });
}

// Create a new Project
async function createProject() {
    const name = document.getElementById('projectName').value;
    const description = document.getElementById('projectDescription').value;
    const status = document.getElementById('projectStatus').value;

    const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                mutation {
                    createProject(name: "${name}", description: "${description}", status: "${status}") {
                        id
                        name
                        description
                        status
                    }
                }
            `
        })
    });

    await response.json();
    fetchProjects();  // Reload the projects list
}

// Delete a Project
async function deleteProject(id) {
    const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                mutation {
                    deleteProject(id: ${id})
                }
            `
        })
    });

    await response.json();
    fetchProjects();  // Reload the projects list
}

// Fetch employees for select dropdowns and display all details
async function fetchEmployees() {
    const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                query {
                    getAllEmployees {
                        id
                        name
                        email
                        phone
                    }
                }
            `
        })
    });

    const result = await response.json();
    const employees = result.data.getAllEmployees;
    const employeeList = document.getElementById('employeeList');
    const assignmentEmployeeSelect = document.getElementById('assignmentEmployeeId');
    employeeList.innerHTML = '';
    assignmentEmployeeSelect.innerHTML = '<option value="">Select Employee</option>';

    employees.forEach(employee => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>
                <strong>ID:</strong> ${employee.id} - <strong>Name:</strong> ${employee.name} - 
                <strong>Email:</strong> ${employee.email} - <strong>Phone:</strong> ${employee.phone}
            </span>
            <span class="action-btns">
                <i class="bi bi-pencil-fill text-primary icon-hover" onclick="updateEmployee(${employee.id})"></i>
                <i class="bi bi-trash-fill text-danger icon-hover" onclick="deleteEmployee(${employee.id})"></i>
            </span>
        `;
        employeeList.appendChild(li);

        const option = document.createElement('option');
        option.value = employee.id;
        option.textContent = employee.name;
        assignmentEmployeeSelect.appendChild(option);
    });
}

// Create a new Employee
async function createEmployee() {
    const name = document.getElementById('employeeName').value;
    const email = document.getElementById('employeeEmail').value;
    const phone = document.getElementById('employeePhone').value;

    const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                mutation {
                    createEmployee(name: "${name}", email: "${email}", phone: "${phone}") {
                        id
                        name
                        email
                        phone
                    }
                }
            `
        })
    });

    await response.json();
    fetchEmployees();  // Reload the employees list
}

// Delete an Employee
async function deleteEmployee(id) {
    const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            query: `
                mutation {
                    deleteEmployee(id: ${id})
                }
            `
        })
    });

    await response.json();
    fetchEmployees();  // Reload the employees list
}

// Create a new Task
async function createTask() {
    const projectId = document.getElementById('taskProjectId').value;
    const name = document.getElementById('taskName').value;
    const description = document.getElementById('taskDescription').value;
    const status = document.getElementById('taskStatus').value;

    const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            project: {
                id: projectId
            },
            name: name,
            description: description,
            status: status
        })
    });

    await response.json();
    fetchTasks();  // Reload the tasks list
}

// Fetch tasks and display all details
async function fetchTasks() {
    const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    const assignmentTaskSelect = document.getElementById('assignmentTaskId');  // Selección para las asignaciones
    taskList.innerHTML = '';
    assignmentTaskSelect.innerHTML = '<option value="">Select Task</option>';  // Inicializa la lista de tareas en el select

    tasks.forEach(task => {
        const li = document.createElement('li');
        const projectId = task.project ? task.project.id : 'null';
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>
                <strong>ID:</strong> ${task.id} - <strong>Name:</strong> ${task.name} - 
                <strong>Description:</strong> ${task.description} - <strong>Status:</strong> ${task.status} - 
                <strong>Project ID:</strong> ${projectId}
            </span>
            <span class="action-btns">
                <i class="bi bi-pencil-fill text-primary icon-hover" onclick="updateTask(${task.id})"></i>
                <i class="bi bi-trash-fill text-danger icon-hover" onclick="deleteTask(${task.id})"></i>
            </span>
        `;
        taskList.appendChild(li);

        // Añadir tareas al select de asignaciones
        const option = document.createElement('option');
        option.value = task.id;
        option.textContent = `${task.name} (${task.id})`;
        assignmentTaskSelect.appendChild(option);
    });
}

// Delete a Task
async function deleteTask(id) {
    const response = await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    await response.text();
    fetchTasks();  // Reload the tasks list
}

// Fetch assignments and display all details
async function fetchAssignments() {
    const response = await fetch('http://localhost:8080/api/assignments', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const assignments = await response.json();
    const assignmentList = document.getElementById('assignmentList');
    assignmentList.innerHTML = '';
    assignments.forEach(assignment => {
        const taskId = assignment.task ? assignment.task.id : 'null';
        const employeeId = assignment.employee ? assignment.employee.id : 'null';
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>
                <strong>ID:</strong> ${assignment.id} - <strong>Task ID:</strong> ${taskId} - 
                <strong>Employee ID:</strong> ${employeeId} - <strong>Time:</strong> ${assignment.time}
            </span>
            <span class="action-btns">
                <i class="bi bi-pencil-fill text-primary icon-hover" onclick="updateAssignment(${assignment.id})"></i>
                <i class="bi bi-trash-fill text-danger icon-hover" onclick="deleteAssignment(${assignment.id})"></i>
            </span>
        `;
        assignmentList.appendChild(li);
    });
}

// Delete an Assignment
async function deleteAssignment(id) {
    const response = await fetch(`http://localhost:8080/api/assignments/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    await response.text();
    fetchAssignments();  // Reload the assignments list
}

// Create a new Assignment
async function createAssignment() {
    const taskId = document.getElementById('assignmentTaskId').value;
    const employeeId = document.getElementById('assignmentEmployeeId').value;
    const time = document.getElementById('assignmentTime').value;

    const response = await fetch('http://localhost:8080/api/assignments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            task: {
                id: taskId
            },
            employee: {
                id: employeeId
            },
            time: time
        })
    });

    await response.json();
    fetchAssignments();  // Reload the assignments list
}

// Update a Project
async function updateProject(id) {
    const name = prompt("Enter new project name:");
    const description = prompt("Enter new project description:");
    const status = prompt("Enter new project status:");

    if (name && description && status) {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        updateProject(id: ${id}, name: "${name}", description: "${description}", status: "${status}") {
                            id
                            name
                            description
                            status
                        }
                    }
                `
            })
        });

        await response.json();
        fetchProjects();  // Reload the projects list
    }
}

// Update an Employee
async function updateEmployee(id) {
    const name = prompt("Enter new employee name:");
    const email = prompt("Enter new employee email:");
    const phone = prompt("Enter new employee phone:");

    if (name && email && phone) {
        const response = await fetch('http://localhost:8080/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        updateEmployee(id: ${id}, name: "${name}", email: "${email}", phone: "${phone}") {
                            id
                            name
                            email
                            phone
                        }
                    }
                `
            })
        });

        await response.json();
        fetchEmployees();  // Reload the employees list
    }
}

// Update a Task
async function updateTask(id) {
    const name = prompt("Enter new task name:");
    const description = prompt("Enter new task description:");
    const status = prompt("Enter new task status:");
    const projectId = prompt("Enter new project ID:");

    if (name && description && status && projectId) {
        const response = await fetch(`http://localhost:8080/api/tasks`, {
            method: 'POST', // Reutilizando el endpoint de creación
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id, // Incluyendo el id para actualizar en lugar de crear
                name: name,
                description: description,
                status: status,
                project: {
                    id: projectId
                }
            })
        });

        await response.json();
        fetchTasks();  // Reload the tasks list
    }
}

// Update an Assignment
async function updateAssignment(id) {
    const taskId = prompt("Enter new task ID:");
    const employeeId = prompt("Enter new employee ID:");
    const time = prompt("Enter new time:");

    if (taskId && employeeId && time) {
        const response = await fetch(`http://localhost:8080/api/assignments`, {
            method: 'POST', // Reutilizando el endpoint de creación
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id, // Incluyendo el id para actualizar en lugar de crear
                task: { id: taskId },
                employee: { id: employeeId },
                time: time
            })
        });

        await response.json();
        fetchAssignments();  // Reload the assignments list
    }
}


// Initialize data on page load
window.onload = function () {
    fetchProjects();
    fetchEmployees();
    fetchTasks();
    fetchAssignments();
}
