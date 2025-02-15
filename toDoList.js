import Task from "./Task.js";

export default class ToDoList {
  constructor() {
    this.tasks = [];
  }

  addTask(name, description, dueDate, priority) {
    const newTask = new Task(name, description, dueDate, priority);
    this.tasks.push(newTask);
    return newTask;
  }

  removeTask(task) {
    this.tasks = this.tasks.filter((t) => t !== task);
  }

  clearTasks() {
    this.tasks = [];
  }

  clearDoneTasks() {
    console.log("Is this working?");
    this.tasks = this.tasks.filter((t) => !t.isComplete());
  }

  getTasks() {
    return this.tasks;
  }
  
  saveTasks(key = 'tasks') {
    localStorage.setItem(key, JSON.stringify(this.tasks));
  }

  loadTasks(key = 'tasks') {
    let taskData = JSON.parse(localStorage.getItem(key));
    this.clearTasks();
    taskData.forEach((each) => {
      this.addTask(each.name, each.description, each.dueDate, each.priority);
    });
  }

  areStoredTasks(key = 'tasks') {
    return !!localStorage.getItem(key);
  }
}

