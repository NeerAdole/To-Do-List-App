document.getElementById('task-form').addEventListener('submit', addTask);

let tasks = [];

function addTask(e) {
    e.preventDefault();

    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;
    const priority = document.getElementById('task-priority').value;
    const dueDate = document.getElementById('task-due-date').value;

    const task = {
        id: Date.now(),
        title,
        description,
        priority,
        dueDate,
        isCompleted: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();

    document.getElementById('task-form').reset();
}

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.isCompleted ? 'completed' : '';

        li.classList.add(
            task.priority === '2' ? 'high-priority' :
            task.priority === '1' ? 'medium-priority' :
            'low-priority'
        );

        li.innerHTML = `
            <span>${task.title}</span>
            <div>
                <button onclick="toggleComplete(${task.id})">${task.isCompleted ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.isCompleted = !task.isCompleted;
        }
        return task;
    });
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderTasks();
    }
}

window.onload = loadTasks;
