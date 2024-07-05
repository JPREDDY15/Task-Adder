document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(addTaskToList);

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            addTaskToList(task);
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            taskInput.value = '';
        }
    });

    function addTaskToList(task) {
        const li = document.createElement('li');
        li.textContent = task.text;
        li.dataset.id = task.id;
        if (task.completed) {
            li.classList.add('completed');
        }
        li.addEventListener('click', () => {
            task.completed = !task.completed;
            li.classList.toggle('completed');
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            const index = tasks.findIndex(t => t.id === task.id);
            tasks.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            li.remove();
        });
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    }
});
