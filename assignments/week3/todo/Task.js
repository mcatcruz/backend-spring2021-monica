const md5 = require('md5');

// Define Task class
class Task {
    constructor(text, priority, dueDate) {
        this.setText(text);

        // Assign a dueDate and test if user entry is valid. If not, create a new Date Object.
        let dateResults = this.setDueDate(dueDate);
        if (dateResults === 1) {
            this.dueDate = new Date();
        }

        // Create a Date object for when the Task object was created.
        this.dateCreated = new Date();

        // Generate a md5 hash to identify this Task Object.
        this.id = md5(this.text + this.dateCreated.toString());

        // Test if priority has a value. If not, assign it priority 1...
        if(!priority) {
            this.priority = 1;
        } else {
            // ... otherwise, send to setPriority method.
            results = this.setPriority(priority);

            // If setPriority() fails, set priority to 1.
            if (results === 1) {
                this.priority = 1;
            }
        }
        // Set completed and deleted dates to null when the Task is NEW.
        this.dateCompleted = null;
        this.dateDeleted = null;
    }


    // Getter/Setter for the Task text.
    getText() {
        return this.text;
    }
    setText(text) {
        if (typeof text === 'string') {
            this.text = text;
        } else {
            this.text = 'INVALID VALUE';
        }
    }

    // Getter/Setter for the Task text.
    getDueDate() {
        return this.dueDate;
    }
    setDueDate(dueDate) {
        // Ensure that due date entered is a Regular Expression.
        let datePattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
        // Test the string with our regular expression pattern.
        let validDate = datePattern.test(dueDate);

        // If the date format is valid...
        if (validDate) {
            // ...split the string and convert into a number.
            let dateParts = dueDate.split('-');
            dateParts[0] = parseInt(dateParts[0]);
            dateParts[1] = parseInt(dateParts[1]);
            dateParts[2] = parseInt(dateParts[2]);

            // Subtract 1 from month value bc month in Date Object starts at 0.
            dateParts[1] = dateParts[1] - 1; // dateParts[1]--;

            // Check that number is not out of bounds. 
            if (dateParts[1] > 11) {
                dateParts[1] = 11;
            }
            if (dateParts[2] > 31) {
                dateParts[2] = 31;
            }
            // Create a new Date object based on numbers from front-end.
            this.dueDate = new Date(dateParts[0], dateParts[1], dateParts[2]);
            return 0;
        } else {
            // If tests failed, return 1.
            return 1;
        }
    }
    
    // Getter/Setter for priority
    getPriority() {
        return this.priority;
    }
    setPriority(priority) {
        // Parse the argument into a number. If it fails, return 1.
        priority = parseInt(priority);
        if (Number.isNaN(priority)) {
            return 1;
        } else {
            this.priority = priority;
            return 0;
        }
    }

    // Helper methods
    markCompleted() {
        this.dateCompleted = new Date();
    }

    isCompleted() {
        if (this.dateCompleted === null) {
            return false;
        } else {
            return true;
        }
    }

    markDeleted() {
        this.dateDeleted = new Date();
    }
    isDeleted() {
        if (this.dateDeleted === null) {
            return false;
        } else {
            return true;
        }
    }

    jsonConvert(object) {
        this.text = object.text;
        this.id = object.id;
        this.priority = object.priority;
        this.dueDate = new Date(object.dueDate);
        this.dateCreated = new Date(object.dateCreated);

        if (typeof object.dateCompleted === 'string') {
            this.dateCompleted = new Date(object.dateCompleted);
        } else {
            this.dateCompleted === null;
        }

        if (typeof object.dateDeleted === 'string') {
            this.dateDeleted = new Date(object.dateDeleted);
        } else {
            this.dateDeleted === null;
        }
        return this;
    }
}

// Allow other files to use the Task class.
module.exports = {
    Task: Task
};