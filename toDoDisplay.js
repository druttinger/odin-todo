import ToDoList from "./toDoList.js";

export default class ToDoDisplay {
  constructor() {
    this.toDoList = new ToDoList();
    this.toDoList.addTask("Test", "test", "1/1/2099");
    this.configureButton();
    this.configureModal();

   

    this.render();
  }

  addTask(name, description, dueDate) {
    // const task = new Task(name, description, dueDate);
    this.toDoList.addTask(name, description, dueDate);
  }

  removeTask(task) {
    this.toDoList.removeTask(task);
  }

  getTasks() {
    return this.toDoList.getTasks();
  }

  configureButton() {
    let addButton = document.getElementById("add-todo");
    addButton.addEventListener("click", () => {
        console.log("Add button clicked");
        modal.showModal()
    });

    let removeButton = document.getElementById("remove-todo");
    removeButton.addEventListener("click", () => {
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const dueDate = document.getElementById("due-date").value;
        const task = new Task(name, description, dueDate);
        this.removeTask(task);
        this.render();
    });

    let switchButton = document.getElementById("switch-project");
    switchButton.addEventListener("click", () => {
        const project = document.getElementById("project").value;
        display.toDoList = new ToDoList();
        display.render();
    });
  }

  configureModal() {
    // set up modal
    this.modal = document.getElementById('modal');
    // Create the form
    this.form = document.getElementById('form');
    // Title input
    this.titleInput = document.getElementById('title');
    // Author input
    this.descriptionInput = document.getElementById('description');
    // Pages input
    this.dueDateInput = document.getElementById('due-date');
    // Read checkbox
    this.priorityInput = document.getElementById('priority');
    // Submit button
    this.submitButton = document.getElementById('submit');
    // Cancel button
    this.cancelButton = document.getElementById('cancel');
    
    this.submitButton.onclick = (event) => {
        event.preventDefault();
        this.toDoList.addTask(this.titleInput.value, this.descriptionInput.value, this.dueDateInput.value);
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.dueDateInput.value = '';
        this.priorityInput.checked = false; 
        this.render();
        this.modal.close();
        
    };
  }

  render() {
    const tasks = this.getTasks();
    const list = document.getElementById("todos");
    list.innerHTML = "";
    const fragment = document.createDocumentFragment();
    tasks.forEach((task) => {
    const li = document.createElement("li");
    li.innerHTML = `${task.getName()} - ${task.getDescription()} - ${task.getDueDate()}`;
    fragment.appendChild(li);
    });
    list.appendChild(fragment);
  }


}

let display = new ToDoDisplay();
