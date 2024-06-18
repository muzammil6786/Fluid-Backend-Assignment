const express = require("express");
require("dotenv").config();
const { connection } = require("./config/db");
const {taskRouter} = require("./routes/task.routes");
const {userRouter} = require("./routes/user.routes");


const app = express();
app.use(express.json());
app.use("/tasks", taskRouter);
app.use("/users", userRouter);

app.listen(process.env.port, async (req, res) => {
  try {
    await connection;
    console.log(`Server is running at ${process.env.port}`);
    console.log(`Connected to DB`);
  } catch (err) {
    console.log(err);
  }
});
