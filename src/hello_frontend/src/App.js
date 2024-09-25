import { html, render } from 'lit-html';
import { hello_backend } from 'declarations/hello_backend';

let tasks = [];
let isAdding = false;   // State to track if adding a task
let removingTaskIndex = null; // State to track if removing a task

// Function to add a task
async function addTask() {
  const taskInput = document.getElementById('task-input');
  const descriptionInput = document.getElementById('task-description');

  const task = taskInput.value.trim();
  const description = descriptionInput.value.trim();

  if (task) {
    isAdding = true;  // Set adding state to true
    renderApp();  // Re-render UI with loader on the button
    await hello_backend.addTask(task, description);  // Call the backend to add the task
    taskInput.value = '';  // Clear input after adding task
    descriptionInput.value = '';
    isAdding = false;  // Reset adding state
    loadTasks();  // Reload tasks
  }
}

// Function to remove a task
async function removeTask(index) {
  removingTaskIndex = index;  // Track the index of the task being removed
  renderApp();  // Re-render UI with loader on the button
  await hello_backend.removeTask(index);  // Call the backend to remove the task
  removingTaskIndex = null;  // Reset the removing index
  loadTasks();  // Reload tasks
}

// Function to load tasks from the backend
async function loadTasks() {
  tasks = await hello_backend.getTasks();  // Fetch tasks from the backend
  renderApp();  // Re-render the UI
}

// Function to render the UI
function renderApp() {
  const template = html`
    <main>
      <h1>To-Do List</h1>
      
      <input id="task-input" type="text" placeholder="Enter a task" />
      <input id="task-description" type="text" placeholder="Enter task description" />
      
      <button @click=${addTask} ?disabled=${isAdding}>
        ${isAdding ? html`<span class="spinner"></span> Adding...` : 'Add Task'}
      </button>

      <ul>
        ${tasks.map((task, index) => html`
          <li>
            <b>${task.title}</b> <br/>
            ${task.content}
            <button @click=${() => removeTask(index)} ?disabled=${removingTaskIndex === index}>
              ${removingTaskIndex === index ? html`<span class="spinner"></span> Removing...` : 'Done'}
            </button>
          </li>
        `)}
      </ul>
    </main>
  `;
  render(template, document.getElementById('root'));
}

// Initial load
loadTasks();
