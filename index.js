const express = require('express');
const cors = require('cors');
const { connection } = require('./config/db');
const { userRouter } = require('./routes/user.routes');
const { taskRouter } = require('./routes/task.routes');
require('dotenv').config();
const { specs, swaggerUi } = require("./SwaggerConfig");


const app = express();

app.use(express.json());
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// API routes
app.use('/users',userRouter);
app.use('/tasks', taskRouter);



app.get('/', (req, res) => {
    res.send({ msg: 'Welcome to Task Management System' });
});


const server = app.listen(process.env.PORT || 3000, async () => {
    try {
        await connection;
        console.log(`Connected to DB`);
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
        console.log(`http://localhost:${process.env.PORT || 3000}`);
    } catch (err) {
        console.error(err);
    }
});

module.exports={
    server
}