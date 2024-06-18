const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { taskRouter } = require("../routes/task.routes");
const { userRouter } = require("../routes/user.routes");
const { auth } = require("../middleware/auth");

const app = express();
app.use(express.json());
app.use("/tasks", auth, taskRouter);
app.use("/users", userRouter);

jest.mock("../middleware/auth", () => {
  return {
    auth: (req, res, next) => {
      req.user = { _id: "60f8d7b4c33a7700158459fd" };
      next();
    },
  };
});

beforeAll(async () => {
  process.env.JWT_SECRET = "muz";
  process.env.REFRESH_JWT_SECRET = "khan";

  await mongoose.connect(
    "mongodb+srv://muzammil:khan@cluster0.nwe9ct0.mongodb.net/taskManagement"
  );
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("API Routes", () => {
  let token;
  let userId;
  let taskId;

  describe("User API", () => {
    test("should sign up a new user", async () => {
      const response = await request(app).post("/users/register").send({
        username: "testuser",
        email: "testuser@example.com",
        password: "password123",
      });
      if (response.statusCode === 201) {
        expect(response.statusCode).toBe(201);
        expect(response.body.user).toHaveProperty("_id");
        userId = response.body.user._id;
      } else {
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty(
          "msg",
          "User is already registered, please login"
        );
      }
    });

    test("should log in an existing user", async () => {
      const response = await request(app).post("/users/login").send({
        email: "testuser@example.com",
        password: "password123",
      });
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("token");
      token = response.body.token;
    });

    test("should log out the user", async () => {
      const response = await request(app)
        .get("/users/logout")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty(
        "msg",
        "User logged out successfully"
      );
    });
  });

  describe("Task API", () => {
    test("should create a new task", async () => {
      const response = await request(app)
        .post("/tasks")
        .set("Authorization", `Bearer ${token}`)
        .send({
          title: "Test Task",
          description: "Test Description",
          due_date: "2024-06-30",
        });
      expect(response.statusCode).toBe(201);
      expect(response.body.task).toHaveProperty("_id");
      taskId = response.body.task._id;
    });

    test("should get all tasks", async () => {
      const response = await request(app)
        .get("/tasks")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    test("should get a task by ID", async () => {
      const response = await request(app)
        .get(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("_id", taskId);
    });

    test("should update a task by ID", async () => {
      const response = await request(app)
        .patch(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${token}`)
        .send({ title: "Updated Task" });
      expect(response.statusCode).toBe(200);
      expect(response.body.task).toHaveProperty("title", "Updated Task");
    });

    test("should delete a task by ID", async () => {
      const response = await request(app)
        .delete(`/tasks/${taskId}`)
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("msg", "Task deleted successfully");
    });
  });
});