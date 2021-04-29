// Define Task class
class Task {
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
            this.dueDate = new Date();
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
            this.priority = 1;
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
}
// Allow other files to use the Task class.
module.exports = {
    Task: Task
};