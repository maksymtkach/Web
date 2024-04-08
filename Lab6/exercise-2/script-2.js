document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('newTaskInput');
    const taskText = taskInput.value.trim();
    if (taskText) {
        const timestamp = new Date();
        addTask(taskText, false, timestamp);
        taskInput.value = '';
        saveTasks();
    }
});

function addTask(text, completed, timestamp) {
    const taskList = document.getElementById('taskList');
    const li = document.createElement('li');
    li.className = completed ? 'completed' : '';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.className = 'task-checkbox';
    checkbox.onchange = function() {
        li.classList.toggle('completed', checkbox.checked);
        saveTasks();
    };

    const dateTimeSpan = document.createElement('span');
    dateTimeSpan.textContent = formatTimestamp(timestamp);
    dateTimeSpan.className = 'task-date-time';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Видалити';
    deleteBtn.className = 'deleteBtn';
    deleteBtn.onclick = function() {
        taskList.removeChild(li);
        saveTasks();
    };

    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = text;
    taskTextSpan.className = 'task-text';
    taskTextSpan.contentEditable = true;
    taskTextSpan.addEventListener('blur', saveTasks);
    taskTextSpan.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            taskTextSpan.blur();
        }
    });

    li.appendChild(checkbox);
    li.appendChild(taskTextSpan);
    li.appendChild(dateTimeSpan);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

function filterTasks() {
    const filterValue = document.getElementById('taskFilter').value;
    const tasks = document.querySelectorAll('#taskList li');
    tasks.forEach(task => {
        const isCompleted = task.classList.contains('completed');
        const timestamp = task.getAttribute('data-timestamp');
        switch (filterValue) {
            case 'completed':
                task.style.display = isCompleted ? '' : 'none';
                break;
            case 'uncompleted':
                task.style.display = !isCompleted ? '' : 'none';
                break;
            default:
                task.style.display = '';
        }
    });
}

document.getElementById('taskFilter').addEventListener('change', filterTasks);

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#taskList li').forEach(li => {
        const text = li.querySelector('.task-text').textContent;
        const completed = li.querySelector('.task-checkbox').checked;
        const timestamp = li.querySelector('.task-date-time').textContent;
        tasks.push({ text, completed, timestamp });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addTask(task.text, task.completed, new Date(task.timestamp)));
}

function formatTimestamp(timestamp) {
    const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
    return date.toLocaleDateString('uk-UA', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
    });
}

document.addEventListener('DOMContentLoaded', loadTasks);
