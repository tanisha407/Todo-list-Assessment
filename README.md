# 📝 To-Do List App - Project

This is a simple To-Do List app that allows you to add, delete, update, filter, search, and paginate tasks. The app has a backend API built with Node.js and Express, and a front-end built using HTML, CSS, and JavaScript. It uses a MySQL database to store tasks.

---

## 🌟 Features

- **Add Task**: Add a new task with a title and description.
- **Mark as Completed**: Mark tasks as completed.
- **Delete Task**: Remove tasks from the list.
- **Filter Tasks**: Filter tasks by `All`, `Pending`, or `Completed`.
- **Search Tasks**: Search for tasks by title or description.
- **Pagination**: Navigate through tasks with pagination.
- **Stats**: View counts of pending and completed tasks.

---

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript
- **Database**: MySQL
- **Environment**: `.env` for managing environment variables



## 🗂️ Project Structure

todo-api/
├── config/
│ └── db.js # Database connection configuration
├── controllers/
│ └── todosController.js # Controller to handle API logic for todos
├── routes/
│ └── todos.js # API routes for todos (CRUD operations)
├── frontend/
│ ├── index.html # HTML file that renders the To-Do app
│ ├── app.js # JavaScript file that contains the app logic (front-end)
│ └── style.css # CSS file to style the app
├── database.sql # SQL script to create the database schema
├── index.js # Main entry point for the backend server
├── package.json # Backend dependencies and scripts
├── .env # Environment variables for the backend (e.g., DB config)
├── .env.example # Example environment variables file
└── README.md # This README file