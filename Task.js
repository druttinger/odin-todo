export default class Task {
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

  isComplete(){
    return this.done
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

  setComplete(isChecked){
    this.done = isChecked;
  }

  markAsDone() {
    this.done = true;
  }

  updateTask(name, description, dueDate, priority) {
    this.setName(name);
    this.setDescription(description);
    this.setDueDate(dueDate);
    this.setPriority(priority);
  }
}
