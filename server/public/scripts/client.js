$(document).ready(onReady);

function onReady() {
    console.log('ready');
    $('#submitBtn').on('click', submitTask);
    getTasks();
}

const clearInputs = () => {
    $('#taskIn').val('');
    $('#notesIn').val('');
}

function submitTask() {
    const newTask = {
        task: $('#taskIn').val(),
        notes: $('#notesIn').val(),
        markCompleted: 'N',
        timeCompleted: ''
    };
    console.log('in submitTask', newTask);
    $.ajax({
        method: 'POST',
        url: '/task',
        data: newTask
    }).then((res) => {
        console.log('POST /task', res);
        getTasks();
        clearInputs();
    }).catch((err) => {
        console.log('POST /task error', err);
    });
}

function getTasks() {
    console.log('in renderTasks');
    $.ajax({
        method: 'GET',
        url: '/task'
    }).then((res) => {
        console.log('in GET /task response', res);
        renderTasks(res);
    }).catch((err) => {
        console.error('GET /task', err);
    });
}

function renderTasks(tasks) {
    $('#viewTasks').empty();
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        const renderIfComplete = (task.mark_completed === 'Y') ? 
        `<td></td>
        <td>
            <button class="deleteBtn" data-id="${task.id}">Delete</button>
        </td>`
        :
        `<td>
        <button class="completeBtn" data-id="${task.id}" data-complete="${task.mark_completed}">Complete</button>
        </td>
        <td>
            <button class="deleteBtn" data-id="${task.id}">Delete</button>
        </td>`;
    $('#viewTasks').append(`
        <tr>
            <td>${task.task}</td>
            <td>${task.notes}</td>
            ${renderIfComplete}
        </tr>
    `);
    }
}

// timeCompleted: new Date();