$(function () {
    $('#new-task div button:last-child').click(function () {
        let parts = $("new-task div input[type-date]").val().split('-');
        console.log(parts);
        
        let timeObject = new Date();
        let testObject = new Date($('#new-task div input[type=date').val());
        let anotherObject = new Date(parts[0], parts[1] -1, parts[2]);
        timeObject.setDate(parts[2]);
        timeObject.setFullYear(parts[0]);
        timeObject.setMonth(parseInt(parts[1])-1);


        console.log('actual ' + timeObject.toString());
        console.log('test ' + testObject.toString());
        console.log('actual2' + anotherObject.toString());
    });

});

