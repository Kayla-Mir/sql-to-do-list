const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// GET




// POST




// PUT
router.post('/', (req, res) => {
    console.log('POST /task');
    const newTask = req.body;
    const sqlText = `
        INSERT INTO "tasks"
            ("task", "notes", "mark_completed")
        VALUES
            ($1, $2, $3)
    `;
    const sqlValues = [
        newTask.task,
        newTask.notes,
        newTask.markCompleted
    ];
    console.log(sqlValues);
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        }).catch((dbErr) => {
            console.error(dbErr);
        });
});



// DELETE




module.exports = router;