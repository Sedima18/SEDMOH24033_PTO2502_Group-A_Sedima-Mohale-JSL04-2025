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
const columns = document.querySelectorAll('.column-div');

// ====== Render Tasks to Columns ======
function renderTasks() {
  document.querySelectorAll('.tasks-container').forEach(el => el.innerHTML = '');

  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-div';
    taskDiv.textContent = task.title;
    taskDiv.dataset.id = task.id;
    taskDiv.addEventListener('click', () => openModal(task.id));
    
    const container = document.querySelector(`[data-status="${task.status}"] .tasks-container`);
    container.appendChild(taskDiv);
  });
}

// ====== Open Modal and Populate Fields ======
function openModal(taskId) {
  const task = tasks.find(t => t.id === taskId);
  if (!task) return;

  currentTaskId = taskId;
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
  const updatedTitle = modalTitle.value.trim();
  const updatedDescription = modalDescription.value.trim();
  const updatedStatus = modalStatus.value;

  if (!updatedTitle) return alert('Title cannot be empty.');

  const taskIndex = tasks.findIndex(t => t.id === currentTaskId);
  if (taskIndex === -1) return;

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: updatedTitle,
    description: updatedDescription,
    status: updatedStatus
  };

  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  closeModal();
}

// ====== Event Listeners ======
closeModalBtn.addEventListener('click', closeModal);
saveBtn.addEventListener('click', saveTaskUpdates);

// Close modal on background click
window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

