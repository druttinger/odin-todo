export default class ToDoList {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  addTask(name, description, dueDate, priority) {
    this.tasks.push(new Task(name, description, dueDate, priority));
  }

  removeTask(task) {
    this.tasks = this.tasks.filter((t) => t !== task);
  }

  getTasks() {
    return this.tasks;
  }
  
  saveTasks(key = 'tasks') {
    localStorage.setItem(key, JSON.stringify(this.tasks));
  }

  loadTasks(key = 'tasks') {
    let taskData = JSON.parse(localStorage.getItem(key));
    let temp;
    console.log(taskData);
    taskData.forEach((each) => {
      console.log(each);
      temp = new Task(each.name, each.description, each.dueDate, each.priority);
      console.log(temp);
      this.addTask(each.name, each.description, each.dueDate, each.priority);
      console.log(this.tasks);
    });
  }

  areStoredTasks() {
    return !!localStorage.getItem('tasks');
  }
}

class Task {
  constructor(name, description, dueDate, priority) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.done = false;
  }

    getName() {
        return this.name;
    }

    getDescription() {
        return this.description;
    }

    getDueDate() {
        return this.dueDate;
    }

    getPriority() {
        return this.priority;
    }

    setName(name) {
        this.name = name;
    }

    setDescription(description) {
        this.description = description;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    setPriority(priority) {
        this.priority = priority;
    }

    markAsDone() {
        this.done = true;
    }
}