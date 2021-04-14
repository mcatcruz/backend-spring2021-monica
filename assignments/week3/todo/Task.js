class Task {
    constructor(text, priority, dueDate) {
        this.setText(text);

        let dateResults = this.setDueDate(dueDate);
        if (dateResults === 1) {
            this.dueDate = new Date();
        }

        this.dateCreated = new Date();
        if(!priority) {
            this.priority = 1;
        } else {
            results = this.setPriority(priority);
            if (results === 1) {
                this.priority = 1;
            }
        }
        this.priority = priority;
        this.dateCompleted = null;
        this.dateDeleted = null;
    }

    getText() {
        return this.text;
    }
    setText(text) {
        this.text = text.toString();
    }

    getDueDate() {
        return this.dueDate;
    }
    setDueDate(dueDate) {
        let datePattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
        let validDate = datePattern.test(dueDate);

        if (validDate) {
            let dateParts = dueDate.split('-');
            dateParts[0] = parseInt(dateParts[0]);
            dateParts[1] = parseInt(dateParts[1]);
            dateParts[2] = parseInt(dateParts[2]);

            if (dateParts[1] > 12) {
                dateParts[1] = 12;
            }
            if (dateParts[2] > 31) {
                dateParts[2] = 31;
            }
            this.dueDate = new Date(dateParts[0], dateParts[1], dateParts[2]);
            return 0;
        } else {
            return 1;
        }
    }
    
    getPriority() {
        return this.priority;
    }
    setPriority(priority) {
        priority = parseInt(priority);
        if (Number.isNaN(priority)) {
            return 1;
        } else {
            this.priority = priority;
            return 0;
        }
    }

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

module.exports({
    Task: Task
});