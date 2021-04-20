// THIS IS THE FRONTEND CODE

let base_Url = 'http://localhost:3000'; 
$(function () {
    refrestTaskList();
    $('#add-task').click(function () {
        let taskObject = {
            text: $('#task-text').val(),
            priority: $('#new-task div input[type=radio]:checked').val(),
            dueDate: $('#due-date').val()
        };
        console.log(taskObject);
        $.post(base_Url + '/add-task', taskObject, function(data) {
            refrestTaskList();
        });
    });
});

function refrestTaskList() {
    $('div#tasks').empty();
    $.post(base_Url + '/get-tasks', {}, function(data) {
        let tasks = data.incomplete;

        tasks.forEach(function (task) {
            let html = `
            <div class='task' data-id=${task.id}>
                <button><i class="fas fa-check"></i></button>
                <p>${task.text}</p><p>${task.dueDate}</p>
                <button class='delete><i class="fas fa-trash"></i></button>
                <button><i class="fas fa-pen"></i></button>
            </div>
            `;
            $('div#tasks').append(html);
        });

        $('button.delete').click(function () {
            let button = $(this);
            let deleteObject = {
                id: button.parent().attr('data-id')
            }
            $.post('/delete-task', deleteObject, function(data) {
                console.log('Mischief managed!');
                button.parent().remove();
            });
        });

        $('button.edit').click(function () {
            let htmlDrawer = `
            <div class='edit-panel'>
                <label for='task-text'>Task</label>
                <input type='text' id='task-text'>
                <br>
                <label for='high'>Must Do</label>
                <input type='radio' name='priority' id='high'>
                <label for='medium'>Should Do</label>
                <input type='radio' name='priority' id='medium'>
                <label for='low'>Could Do</label>
                <input type='radio' name='priority' id='low'>
                <br>
                <label for='due-date'>Due Date</label>
                <input type='date' id='due-date'>
            </div>
            `;
                $(this).parent().append(htmlDrawer);
        });
    });
}


