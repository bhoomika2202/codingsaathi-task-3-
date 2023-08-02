// Store tasks in an array of objects
let tasks = [];

// Function to add a new task
function addTask() {
  const titleInput = document.getElementById('titleInput');
  const descriptionInput = document.getElementById('descriptionInput');
  const title = titleInput.value.trim();
  const description = descriptionInput.value.trim();

  if (title !== '' && description !== '') {
    const newTask = {
      id: Date.now(),
      title: title,
      description: description,
      completed: false,
      dateAdded: new Date()
    };

    tasks.push(newTask);
    titleInput.value = '';
    descriptionInput.value = '';

    updateLists();
  }
}

// Function to toggle task completion
function toggleComplete(taskId) {
  const task = tasks.find(task => task.id === taskId);

  if (task) {
    task.completed = !task.completed;
    updateLists();
  }
}

// Function to delete a task
function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  updateLists();
}

// Function to update the lists
function updateLists() {
  const pendingTasksList = document.getElementById('pendingTasks');
  const completedTasksList = document.getElementById('completedTasks');

  // Clear the lists
  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  // Loop through tasks and populate the lists
  tasks.forEach(task => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${task.title}</strong>: ${task.description}
      <button onclick="toggleComplete(${task.id})">Mark ${task.completed ? 'Incomplete' : 'Complete'}</button>
      <button onclick="deleteTask(${task.id})">Delete</button>`;

    if (task.completed) {
      listItem.classList.add('completed');
      completedTasksList.appendChild(listItem);
    } else {
      pendingTasksList.appendChild(listItem);
    }
  });
}

// Initialize the lists
updateLists();
