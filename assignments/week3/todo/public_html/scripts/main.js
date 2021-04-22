// THIS IS THE FRONTEND CODE

// Store local host URL in a variable
let base_Url = 'http://localhost:3000'; 

$(function () {
    // 1. Refresh the To-Do List app when the page loads.
    refreshTaskList();

    // 2. When the button with id of 'add-task' is clicked, an object is created. This object is populated with data from corresponding input boxes.
    $('#add-task').click(function () {
        let taskObject = {
            text: $('#task-text').val(),
            priority: $('#new-task div input[type=radio]:checked').val(),
            dueDate: $('#due-date').val()
        };
        // 3. The object is sent to the back-end using a post request. The To-Do List app is refreshed so that the newly added task can be seen in the Task List.
        $.post(base_Url + '/add-task', taskObject, function(data) {
            refreshTaskList();
        });
    });
});

function refreshTaskList() {
    $('div#tasks').empty();
    $.post(base_Url + '/get-tasks', {}, function(data) {
        console.log(data);
        let tasks = data.incomplete;

        tasks.forEach(function (task) {
            let datePattern = /^[0-9]{4}-[0-9]{2}-[0-9]{2}/;
            let html = `
                <div class='task' data-id=${task.id}>
                    <button class='complete'><i class="fas fa-check"></i></button>
                    <p>${task.text}</p><p>${task.dueDate}</p>
                    <button class='delete'><i class="fas fa-trash"></i></button>
                    <button class='edit'><i class="fas fa-pen"></i></button>
                    <div class='edit-panel'>
                        <label for='task-text'>Task</label>
                        <input type='text' value='${task.text}'>
                        <br>
                        <label for='high'>Must Do</label>
                        <input type='radio' name='priority${task.id}' value='1' id='high' ${(task.priority === 1) ? `checked='checked'` : ``}>
                        <label for='medium'>Should Do</label>
                        <input type='radio' name='priority${task.id}' value='2' id='medium' ${(task.priority === 2) ? `checked='checked'` : ``} >
                        <label for='low'>Could Do</label>
                        <input type='radio' name='priority${task.id}' value='3' id='low' ${(task.priority === 3) ? `checked='checked'` : ``}>
                        <br>
                        <label for='due-date'>Due Date</label>
                        <input type='date' id='due-date' value='${task.dueDate.match(datePattern)[0]}'>
                    </div>
                </div>
                `;
            $('div#tasks').append(html);
        });

        $('button.complete').click(function () {
            let button = $(this);
            let completeObject = {
                id: button.parent().attr('data-id')
            };
            $.post(base_Url + '/complete-task', completeObject, function (data) {
                button.parent().remove();
                console.log('Mischief managed!');
            });
        });

        $('button.delete').click(function () {
            let button = $(this);
            let deleteObject = {
                id: button.parent().attr('data-id')
            }
            $.post('/delete-task', deleteObject, function(data) {
                button.parent().remove();
                console.log('Mischief managed!');
            });
        });

        // HTML Drawer. Write this without using jQuery Toggle. Use 2 functions instead.
        $('button.edit').click(function () {
            let editPanel = $(this).next();
            let button = $(this);
            editPanel.toggle('slow', function() {
                // This callback fxn will run regardless of what button is clicked. Must check for button's class.
                if (button.children().hasClass('fa-pen')) {
                    // when drawer expands, edit button becomes a save button.
                    button.fadeOut(300, function () {
                        button.html('<i class="far fa-save"></i>');
                    });
                    button.fadeIn(300);
                } else {
                    button.fadeOut(300, function () {
                        button.html('<i class="fas fa-pen"></i>')
                        let form = button.next();
                        let object = {
                            text: form.children('input[type=text]').val(),
                            id: form.parent().attr('data-id'),
                            dueDate: form.children('input[type=date]').val(),
                            // Ensure that parseInt doesn't fail.
                            priority: form.children('input[type=radio]:checked').val()
                        }
                        console.log(object);
                        $.post(base_Url + '/update-task', object, function (data) {
                            button.fadeIn(300);
                            let text = form.children('input[type=text]').val();
                            form.parent().children('p:nth-child(2)').text(text);
                        });
                    });
                }
            });
        });
    });
}


