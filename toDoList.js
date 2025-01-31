export default class ToDoList {
  constructor() {
    this.tasks = [];
  }

  // addTask(task) {
  //   this.tasks.push(task);
  // }

  addTask(name, description, dueDate) {
    this.tasks.push(new Task(name, description, dueDate));
  }

  removeTask(task) {
    this.tasks = this.tasks.filter((t) => t !== task);
  }

  getTasks() {
    return this.tasks;
  }
}

class Task {
  constructor(name, description, dueDate) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
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

    setName(name) {
        this.name = name;
    }

    setDescription(description) {
        this.description = description;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    markAsDone() {
        this.done = true;
    }
}