# Task Management System API

Welcome to the Task Management System API! This API allows you to manage tasks and user accounts efficiently. Below, you'll find instructions on how to set up and run the API locally, as well as how to test it using Swagger UI.

## Table of Contents

1. [Live Deployed Server](#live-deployed-server)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Configuration](#configuration)
5. [Running the API](#running-the-api)
6. [API Documentation](#api-documentation)
7. [Testing the API](#testing-the-api)
8. [Example Requests](#example-requests)
    - [User Endpoints](#user-endpoints)
    - [Task Endpoints](#task-endpoints)
9. [Project Structure](#project-structure)
10. [Additional Notes](#additional-notes)

## Live Deployed Server

The API is deployed and available live on Render at the following URL:  

You can use this link to access and interact with the API directly without needing to run it locally.

## Prerequisites

Before you can set up the API locally, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or Yarn (npm is used in these instructions)
- MongoDB (locally or using a service like MongoDB Atlas)

## Installation

1. Clone the repository: git clone https://github.com/muzammil6786/Fluid-Backend-Assignment.git
2. Install dependencies: npm install

#Configuration
Create a .env file in the root directory and configure the following environment variables
PORT=8080
MONGODB_URI= mongodb+srv://muzammil:<password>@cluster0.nwe9ct0.mongodb.net/taskManagement
JWT_SECRET=your_jwt_secret
REFRESH_JWT_SECRET=your_refresh_jwt_secret

##Running the API

Start the API server:
npm start
The API will be running at http://localhost:8080.

##API Documentation

The API uses Swagger for documentation. Once the server is running, you can access the Swagger UI to explore the API endpoints at:

http://localhost:8080/api-docs

##Testing the API

You can test the API endpoints using tools like Postman or through the Swagger UI. The Swagger UI provides a web-based interface where you can interact with the API endpoints directly.

##Running Tests Locally
To run the automated tests for the API, use the following command:
npm test

This command will execute the tests defined in your project and report any issues. Make sure to have your development environment properly set up before running tests.

##Example Requests

User Endpoints
User register:

Endpoint: POST /users/register
Body:{
  "username": "john_doe",
  "email": "john.doe@example.com",
  "password": "mypassword"
}
User Login:

Endpoint: POST /users/login
Body:{
  "email": "john.doe@example.com",
  "password": "mypassword"
}
User Logout:

Endpoint: GET /users/logout
Headers: Authorization: Bearer <your_token_here>

##Task Endpoints
Create a Task:

Endpoint: POST /tasks
Headers: Authorization: Bearer <your_token_here>
Body:{
  "title": "New Task",
  "description": "Details of the task",
  "due_date": "2024-06-30"
}

Get All Tasks:

Endpoint: GET /tasks
Headers: Authorization: Bearer <your_token_here>
Get Task by ID:

Endpoint: GET /tasks/{id}
Headers: Authorization: Bearer <your_token_here>
Parameters: id - The ID of the task you want to retrieve.
Update Task by ID:

Endpoint: PATCH /tasks/{id}
Headers: Authorization: Bearer <your_token_here>
Parameters: id - The ID of the task you want to update.
Body:{
  "title": "Updated Task Title",
  "description": "Updated details of the task",
  "due_date": "2024-07-01",
  "priority": "high",
  "status": "in progress"
}

Delete Task by ID:

Endpoint: DELETE /tasks/{id}
Headers: Authorization: Bearer <your_token_here>
Parameters: id - The ID of the task you want to delete.

##Project Structure
task-management-system/
│
├── config/
│   └── db.js                 # Database connection setup
│
├── middleware/
│   └── auth.js               # Authentication middleware
│
├── model/
│   ├── taskModel.js         # Task model
│   ├── userModel.js         # User model
│   └── blacklistModel.js    # Blacklist model for JWT tokens
│
├── routes/
│   ├── user.route.js         # User routes
│   └── task.route.js         # Task routes
│
├── tests/
│   └── user_task.test.js   # User and Task management test cases
│
├── swaggerConfig.js          # Swagger configuration
│
├── .env                      # Environment variables (not included in the repo)
├── package.json              # NPM dependencies and scripts
└── index.js                  # Main server file

##Additional Notes

Error Handling: The API includes basic error handling, but further improvements can be made to standardize and enhance error responses.
Security: Ensure to keep your JWT_SECRET and REFRESH_JWT_SECRET secure and do not expose them publicly.
Environment Variables: Do not commit the .env file to version control. Use a .env.example file for reference without sensitive data.
MongoDB Setup: If you are using MongoDB Atlas, ensure your IP is whitelisted, or use a VPN/local instance for development.




