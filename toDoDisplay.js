import ToDoList from "./toDoList.js";
// import Task from "./Task.js";


export default class ToDoDisplay {
  constructor() {
    this.toDoList = new ToDoList();
    if (this.toDoList.areStoredTasks()){
      this.toDoList.loadTasks();
    }
    this.currentTask = null;
    this.configureButton();
    this.configureModal();
    this.render();
  }

  // let this.currentTask = null;

  updateTask(name, description, dueDate, priorityInput) {
    if (this.currentTask === null) {
      this.toDoList.addTask(name, description, dueDate, priorityInput);
    }
    this.currentTask.updateTask(name, description, dueDate, priorityInput);
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
        console.log("This should work, right?");
        this.currentTask = this.toDoList.addTask("", "", "", "");
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

    let loadButton = document.getElementById("load-project");
    loadButton.addEventListener("click", () => {
        let project = prompt("Enter project name");
        if (this.toDoList.areStoredTasks(project)){
          this.toDoList.loadTasks(project);
        } else {
          if (confirm("Project not found. Create new project?")){
            this.toDoList.clearTasks();
          }
        }
        display.render();
    });

    let saveButton = document.getElementById("save-project");
    saveButton.addEventListener("click", () => {
        let project = prompt("Enter project name");
        this.toDoList.saveTasks(project);
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
    this.cancelButton.onclick = (event) => {
      event.preventDefault();
      this.modal.close();
    }
    
    this.submitButton.onclick = (event) => {
        event.preventDefault();
        this.updateTask(this.titleInput.value, 
                     this.descriptionInput.value, 
                     this.dueDateInput.value,
                     this.priorityInput.value);
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
      const todo = document.createElement("todo");
      todo.classList.add("todo");
      switch(task.getPriority()) {
          case "low":
          todo.style.backgroundColor = "lightgreen";
          break;
          case "medium":
          todo.style.backgroundColor = "lightyellow";
          break;
          case "high":
          todo.style.backgroundColor = "pink";
          break;
      }
      todo.innerHTML = `<div>${task.getName()}</div>
                      <div>${task.getDescription()}</div>
                      <div>${task.getDueDate()}</div>
                      <div>${task.getPriority()}</div>`;
      todo.addEventListener("click", () => {
        // this.titleInput.value = task.getName();
        // this.descriptionInput.value = task.getDescription();
        // this.dueDateInput.value = task.getDueDate();
        // this.priorityInput.value = task.getPriority();
        this.currentTask = task;
        this.modal.showModal();
      });
      fragment.appendChild(todo);
    });
    list.appendChild(fragment);
  }


}

let display = new ToDoDisplay();
