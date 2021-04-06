// Gets the FS package from node.
const fs = require('fs');

// Create Task class.
class Task {
    constructor(text, priority, dueDate) {
        this.text = text;
        this.dueDate = dueDate;
        this.dateCreated = new Date();
        this.priority = priority;
        this.dateCompleted = null;
    }
}

// Loads existing tasks in tasks.json
let fileContents = fs.readFileSync('tasks.json', 'utf-8');
// Converts json file to a JS object.
let previousTasks = JSON.parse(fileContents);
// Inside the JS object, there is a key called tasksList
let taskArray = previousTasks.tasksList;
// This will be temporarily empty because there are no completed tasks at this time. When populated, this will be reassigned to previousTasks.tasksListComplete
// Note that taskArrayCompleted is not listed when "list" action is performed.
let taskArrayCompleted = previousTasks.tasksListComplete;

// Get arguments from user (CLI).
let action = process.argv[2];
// For the add feature
let text = process.argv[3];
let priority = process.argv[4];

// Checks what argument the user provided.
if (action === 'add') {
    // Add newly created Task to taskArray so that it appears in tasksList object.
    taskArray.push(new Task(text, priority));
    console.log('Task added!');
} else if (action === 'list') {
    let currentList = taskArray;
    // Checks if user wants a list of completed tasks
    if (text === 'completed' || text === 'complete') {
        currentList = taskArrayCompleted;
    }
    for (let i = 0; i < currentList.length; i++) {
        if (currentList[i].dateCompleted === null) {
            var completed = "No";
        } else {
            var completed = 'Yes';
        }
    
        let taskList = `
            ${i+1}) Priority: ${currentList[i].priority}
                    Task: ${currentList[i].text}
                    Due Date: ${currentList[i].dueDate}
                    Completed: ${completed}`;
        console.log(taskList);
    }
} else if (action === 'complete') {
    // 1. Find which task user is referring to (by task number for now).
        const taskNumber = parseInt(text) - 1;
        if (Number.isNaN(taskNumber)) {
            console.log("Please enter a valid number.");
            return;
        }
    // 2. Delete this task from tasksList.
    // 3. Add this task to tasksListComplete.
        // Makes a copy of the task (this will still be in the JSON file).
        let task = taskArray[taskNumber];
        // Adds when the task was completed.
        task.dateCompleted = new Date();
        // Deletes the task from tasksList
        taskArray.splice(taskNumber, 1);
        // Adds the task to tasksListComplete
        taskArrayCompleted.push(task);

    // 4. In future: need a unique identifier for each task to be able to track it.
} else if (action === 'delete') {    
    if (text === 'complete' || text === 'completed') {
        if (Number.isNaN(parseInt(priority))) {
            console.log('Not a valid number.');
            return;
        } 
        // This ensures we have the correct index number and delete the correct task.   
        let indexNumber = parseInt(priority) - 1;
        taskArrayCompleted.splice(indexNumber, 1);
        console.log('Mischief managed.');
    } else {
        if (Number.isNaN(parseInt(text))) {
            console.log('Not a valid number.');
        return;
        }
    }
    // This ensures we have the correct index number and delete the correct task.
    let indexNumber = parseInt(text) - 1;
    taskArray.splice(indexNumber, 1);
    console.log('Mischief managed.');
} else {
    console.log('Welcome to Todo-CLI! To use this script, please type an action.');
    console.log(`
    Examples:
        node . add "What I want to do" "How important it is"
        node . list 
        node . list completed
        node . complete "task number"
        node . delete "task number"
        node . edit (coming soon!)
        node . edit dueDate completed 1 "2/2/21"
        node . edit text 3 "get milk"
    `);
}

// Create an object to save to tasks.json (replaces existing tasks.json copies)
let objectToSave = {
    tasksList: taskArray,
    tasksListComplete: taskArrayCompleted
}
objectToSave = JSON.stringify(objectToSave);
fs.writeFileSync('tasks.json', objectToSave, 'utf-8');








