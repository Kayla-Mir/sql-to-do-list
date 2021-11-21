const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const taskRouter = require('./routes/taskRouter')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('server/public'));

// sends all requests from /task route to the taskRouter.js file
app.use('/task', taskRouter);

app.listen(PORT, () => {
    console.log('listening on port', PORT);
});