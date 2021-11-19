const express = require('express');
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




// DELETE




module.exports = router;