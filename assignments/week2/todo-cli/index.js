class Task {
    constructor(text, priority, dueDate) {
        this.text = text;
        this.dueDate = dueDate;
        this.dateCreated = new Date();
        this.priority = priority;
        this.dateCompleted = null;
    }
}

let taskArray = [];

const action = process.argv[2];
const text = process.argv[3];
const priority = process.argv[4];
const char = 'utf-8';

if (action === 'add') {
    taskArray.push(new Task(text, priority));
    console.log('Task added!');
}

fs.writeFileSync('tasks.txt',taskArray.toString(), char);

console.log(taskArray);