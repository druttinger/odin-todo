import ToDoList from "./toDoList.js";

export default class ToDoDisplay {
  constructor() {
    this.toDoList = new ToDoList();
    if (this.toDoList.areStoredTasks()){
      this.toDoList.loadTasks();
    }
    this.tomorrowDate = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10);
    console.log(this.tomorrowDate)
    this.currentTask = null;
    this.configureButton();
    this.configureModal();
    this.render();
  }


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
        this.titleInput.value = '';
        this.descriptionInput.value = '';
        this.dueDateInput.value = this.tomorrowDate;
        this.priorityInput.checked = false; 
        this.currentTask = this.toDoList.addTask("", "", "", "");
        modal.showModal()
    });

    let removeButton = document.getElementById("remove-todo");
    removeButton.addEventListener("click", () => {
        this.toDoList.clearDoneTasks();
        this.render();
    });

    let loadButton = document.getElementById("load-project");
    loadButton.addEventListener("click", () => {
        let project = prompt("Enter project to load\n\n" + 
                             "Existing proect names:\n" +
                              Object.keys(localStorage));
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
        let project = prompt("Enter name to save project as\n\n" + 
                             "Existing proect names:\n" +
                              Object.keys(localStorage));
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
    
    // called when modal is submitted
    this.submitButton.onclick = (event) => {
        event.preventDefault();
        this.updateTask(this.titleInput.value, 
                     this.descriptionInput.value, 
                     this.dueDateInput.value,
                     this.priorityInput.value);
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
      const todo = document.createElement("div");
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
                      const deleteButton = document.createElement("button");
                      deleteButton.textContent = "X";
                      deleteButton.addEventListener("click", (event) => {
                        event.stopPropagation();
                        this.removeTask(task);
                        this.render();
                      });

                      const completeCheckbox = document.createElement("input");
                      completeCheckbox.type = "checkbox";
                      completeCheckbox.checked = task.isComplete();
                      completeCheckbox.addEventListener("click", (event) => {
                        event.stopPropagation();
                        task.setComplete(event.target.checked);
                        this.render();
                      });

                      todo.appendChild(deleteButton);
                      todo.appendChild(completeCheckbox);
      todo.addEventListener("click", (event) => {
          this.titleInput.value = task.getName();
          this.descriptionInput.value = task.getDescription();
          this.dueDateInput.value = task.getDueDate();
          this.priorityInput.value = task.getPriority();
          this.currentTask = task;
          this.modal.showModal();
      });
      fragment.appendChild(todo);
    });
    list.appendChild(fragment);
  }


}

let display = new ToDoDisplay();
