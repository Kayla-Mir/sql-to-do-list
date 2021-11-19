const express = require('express');
const { PayloadTooLarge } = require('http-errors');
const router = express.Router();
const pool = require('../modules/pool');

// GET
router.get('/', (req, res) => {
    const sqlText = `
    SELECT * FROM "tasks"
    ORDER BY "id" ASC;
    `;
    pool.query(sqlText)
        .then((dbRes) => {
            const taskFromDb = dbRes.rows;
            res.send(taskFromDb);
        }).catch((dbErr) => {
            console.error(dbErr);
        });
});

// POST
router.post('/', (req, res) => {
    console.log('POST /task');
    const newTask = req.body;
    const sqlText = `
        INSERT INTO "tasks"
            ("task", "notes", "mark_completed", "time_completed")
        VALUES
            ($1, $2, $3, $4)
    `;
    const sqlValues = [
        newTask.task,
        newTask.notes,
        newTask.markCompleted,
        newTask.timeCompleted
    ];
    console.log(sqlValues);
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        }).catch((dbErr) => {
            console.error(dbErr);
        });
});

// PUT
router.put('/:id', (req, res) => {
    console.log('req.params:', req.params);
    const taskToUpdate = req.params.id;
    const options = {dateStyle: "short", timeStyle: "short"};
    const taskTimeComplete = new Date().toLocaleString('en-US', options);
    const sqlText = `
        UPDATE "tasks"
        SET "mark_completed" = $1, "time_completed" = $2
        WHERE "id" = $3;
    `;
    const sqlValues = [
        'Y',
        taskTimeComplete,
        taskToUpdate
    ];
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        }).catch((dbErr) => {
            console.error(dbErr);
            res.sendStatus(500);
        });
});

// DELETE




module.exports = router;