// ====== Global Variables ======
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let currentTaskId = null;

// ====== DOM Elements ======
const modal = document.getElementById('task-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalStatus = document.getElementById('modal-status');
const saveBtn = document.getElementById('save-task');
const closeModalBtn = document.getElementById('close-modal');

// ====== Render Tasks to Columns ======
function renderTasks() {
  // Clear all columns
  document.querySelectorAll('.tasks-container').forEach(container => {
    container.innerHTML = '';
});

  // Render each task
  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-div';
    taskDiv.textContent = task.title;
    taskDiv.dataset.id = task.id;

    taskDiv.addEventListener('click', () => openModal(task.id));

    const column = document.querySelector(`[data-status="${task.status}"] .tasks-container`);
    column.appendChild(taskDiv);
  });

  updateHeaderCounts();
}

// ====== Update Column Headers ======
function updateHeaderCounts() {
  document.getElementById('toDoText').textContent = `TODO (${tasks.filter(t => t.status === 'todo').length})`;
  document.getElementById('doingText').textContent = `DOING (${tasks.filter(t => t.status === 'doing').length})`;
  document.getElementById('doneText').textContent = `DONE (${tasks.filter(t => t.status === 'done').length})`;
}

// ====== Open Modal and Populate ======
function openModal(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  currentTaskId = task.id;
  modalTitle.value = task.title;
  modalDescription.value = task.description || '';
  modalStatus.value = task.status;

  modal.style.display = 'block';
}

// ====== Close Modal ======
function closeModal() {
  modal.style.display = 'none';
  currentTaskId = null;
}

// ====== Save Task Updates ======
function saveTaskUpdates() {
  const title = modalTitle.value.trim();
  const description = modalDescription.value.trim();
  const status = modalStatus.value;

  if (!title) {
    alert('Title cannot be empty');
    return;
  }

  const taskIndex = tasks.findIndex(t => t.id === currentTaskId);
  if (taskIndex === -1) return;

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title,
    description,
    status
  };

  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  closeModal();
}

// ====== Event Listeners ======
closeModalBtn.addEventListener('click', closeModal);
saveBtn.addEventListener('click', saveTaskUpdates);

window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// ====== Bootstrap Sample Data ======
function bootstrapInitialData() {
  if (tasks.length === 0) {
    tasks = [
      { id: "1", title: "Launch Epic Career 🚀", description: "Apply for dev roles", status: "todo" },
      { id: "2", title: "Conquer React⚛️", description: "", status: "todo" },
      { id: "3", title: "Understand Databases⚙️", description: "", status: "todo" },
      { id: "4", title: "Crush Frameworks🖼️", description: "", status: "todo" },
      { id: "5", title: "Master JavaScript 💛", description: "ES6, DOM, events", status: "doing" },
      { id: "6", title: "Never Give Up 🏆", description: "Daily effort counts", status: "doing" },
      { id: "7", title: "Explore ES6 Features 🚀", description: "", status: "done" },
      { id: "8", title: "Have fun 🥳", description: "Celebrate wins", status: "done" }
    ];
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// ====== Initialize ======
bootstrapInitialData();
renderTasks();
