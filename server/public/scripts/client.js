$(document).ready(onReady);

function onReady() {
    getTasks();
    $('#submitBtn').on('click', submitTask);
    $('#viewTasks').on('click', '.completeBtn', completeTask);
    $('#viewTasks').on('click', '.deleteBtn', deleteTask);
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
        // let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const renderIfComplete = (task.mark_completed === 'Y') ?
            `<td>${task.time_completed}</td>
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
        if (task.mark_completed === 'Y') {
            $('#viewTasks').append(`
                <tr class="completedRow">
                    <td>${task.task}</td>
                    <td>${task.notes}</td>
                    ${renderIfComplete}
                </tr>
            `);
        } else {
            $('#viewTasks').append(`
            <tr class="normalRow">
                <td>${task.task}</td>
                <td>${task.notes}</td>
                ${renderIfComplete}
            </tr>
        `);
        }
    }
}

function completeTask() {
    console.log('the complete button was clicked, HORRAY!');
    let taskId = $(this).data('id');
    $.ajax({
        method: 'PUT',
        url: `/task/${taskId}`
    }).then((res) => {
        getTasks();
    }).catch((err) => {
        console.log('PUT /task error', err);
    });
}

function deleteTask() {
    const taskToDelete = $(this).data('id');
    swal({
        title: "Are you sure?",
        text: "Your task will be deleted!",
        icon: "warning",
        buttons: [true, "Do it!"]
    }).then((toDelete) => {
        if (toDelete) {
            swal("Your task has been deleted!", {
                icon: "success"
            });
            $.ajax({
                method: 'DELETE',
                url: `/task/${taskToDelete}`
            }).then((res) => {
                getTasks();
            }).catch((err) => {
                console.log('DELETE /task error', err);
            });
        } else {
            swal("Your task was not deleted!")
        }
    });
    // if (confirm("Are you sure you want to delete the task?") === true) {
    //     $.ajax({
    //         method: 'DELETE',
    //         url: `/task/${taskToDelete}`
    //     }).then((res) => {
    //         getTasks();
    //     }).catch((err) => {
    //         console.log('DELETE /task error', err);
    //     });
    // } else {
    //     return false;
    // }
}