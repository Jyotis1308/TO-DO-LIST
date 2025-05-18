const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from local storage on page load
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks on the page
function renderTasks() {
  taskList.innerHTML = ''; // Clear existing tasks

  tasks.forEach((task, index) => {
    const li = document.createElement('li');

    // Create checkbox for task completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleCompleted(index));

    // Create span for task text
    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    if (task.completed) taskText.classList.add('completed');
    taskText.textContent = task.text;

    // Clicking text also toggles completion for convenience
    taskText.addEventListener('click', () => toggleCompleted(index));

    // Create input for editing (hidden initially)
    const taskEditInput = document.createElement('input');
    taskEditInput.type = 'text';
    taskEditInput.className = 'task-input';
    taskEditInput.value = task.text;
    taskEditInput.style.display = 'none';

    // Edit button
    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      if (taskEditInput.style.display === 'none') {
        taskEditInput.style.display = 'inline-block';
        taskText.style.display = 'none';
        taskEditInput.focus();
        editButton.textContent = 'Save';
      } else {
        const newText = taskEditInput.value.trim();
        if (newText === '') {
          alert('Task cannot be empty!');
          taskEditInput.focus();
          return;
        }
        tasks[index].text = newText;
        saveTasks();
        renderTasks();
      }
    });

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteTask(index);
    });

    // Append elements to list item
    li.appendChild(checkbox);
    li.appendChild(taskText);
    li.appendChild(taskEditInput);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  });
}

// Add a new task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }
  tasks.push({ text: taskText, completed: false });
  taskInput.value = '';
  saveTasks();
  renderTasks();
});

// Toggle task completed state
function toggleCompleted(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Initial rendering on page load
renderTasks();
