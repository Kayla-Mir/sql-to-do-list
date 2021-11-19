$(document).ready(onReady);

function onReady() {
    console.log('ready');
    $('#submitBtn').on('click', submitTask);
}

const clearInputs = () => {
    $('#taskIn').val('');
    $('#notesIn').val('');
}

function submitTask() {
    const newTask = {
        task: $('#taskIn').val(),
        notes: $('#notesIn').val(),
        markCompleted: 'N'
    };
    console.log('in submitTask', newTask);
    $.ajax({
        method: 'POST',
        url: '/task',
        data: newTask
    }).then((res) => {
        console.log('POST /task', res);
        renderTasks();
        clearInputs();
    }).catch((err) => {
        console.log('POST /task error', err);
    });
}

function renderTasks() {
    console.log('in renderTasks');
}