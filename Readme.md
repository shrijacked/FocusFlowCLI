# Todo Application

This repository contains a **Todo Web App** and a **Todo CLI Tool** for managing tasks. The Web App uses JWT Authentication, while the CLI Tool provides advanced task management features like categorization, due dates, priorities, and recurring tasks.

---

## Web App Overview

The Todo Web App is built with **Node.js**, **Express**, **MongoDB**, and **JWT** for secure user authentication. It offers a RESTful API for managing tasks with additional features.

### Web App Features
- **User Registration and Login**
- **JWT Authentication**
- **CRUD Operations** for tasks
- **Task Prioritization** and **Categorization**
- **Task Recurrence**

### Technologies Used
- **Node.js**
- **Express**
- **MongoDB** & **Mongoose**
- **JWT (JSON Web Token)**
- **Zod** (schema validation)
- **dotenv** (environment variables)

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas)
- **npm** (Node Package Manager)

### Installation (Web App)
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/todo-app.git
   cd todo-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file and add:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_jwt_secret
     ```
4. Start the server:
   ```bash
   npm start
   ```

### API Endpoints
#### User Routes
- **Register**: `/api/users/register` (POST)
- **Login**: `/api/users/login` (POST)

#### Task Routes (JWT Authentication required)
- **Add Task**: `/api/tasks` (POST)
- **Get All Tasks**: `/api/tasks` (GET)
- **Get Task by ID**: `/api/tasks/:id` (GET)
- **Update Task**: `/api/tasks/:id` (PUT)
- **Delete Task**: `/api/tasks/:id` (DELETE)

Test API endpoints with tools like **Postman** or **curl**. Include the JWT token in the Authorization header for protected routes.

---

## CLI Tool Overview

The CLI Tool provides a command-line interface for task management with a range of powerful features.

### CLI Tool Features
- **Add Tasks with Priority**
- **List Tasks** (sorted by priority and due date)
- **Mark Tasks as Done/Undone**
- **Remove Tasks**
- **Due Dates** for tasks
- **Status Filtering** (done/not done)
- **Edit Tasks**
- **Search for Tasks**
- **Group Tasks by Category**
- **Recurring Tasks**
- **Color-Coded Priority**
- **Reminders** for deadlines
- **Backup and Restore**
- **Task History**

### Installation (CLI Tool)
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/todo-cli-tool.git
   cd todo-cli-tool
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Link the CLI Tool globally:
   ```bash
   npm link
   ```

### CLI Usage
- **Add a Task**:
  ```bash
  todo add "Task description" --priority <priority> --due <dueDate> --category <category> --recurring
  ```
  - `<priority>`: Priority level (default is 1)
  - `<dueDate>`: YYYY-MM-DD format (optional)
  - `<category>`: Task category (optional)
  - `--recurring`: Recurring task (optional)

- **List Tasks**:
  ```bash
  todo list
  ```
  
- **Mark as Done/Undone**:
  ```bash
  todo done <index>
  todo undone <index>
  ```

- **Remove a Task**:
  ```bash
  todo remove <index>
  ```

- **Edit a Task**:
  ```bash
  todo edit <index> --task "<newDescription>" --priority <newPriority> --due <newDueDate>
  ```

- **Search Tasks**:
  ```bash
  todo search "<keyword>"
  ```

- **Filter by Status**:
  ```bash
  todo filter --done
  todo filter --undone
  ```

- **Backup & Restore**:
  ```bash
  todo backup
  todo restore
  ```

### Configuration
- **Colors**: Customize priority color codes in `config.json`.
- **Reminders**: Configure reminder settings in `config.json`.

---

## Contact
For feedback, reach out to [edushrijak@gmail.com](mailto:edushrijak@gmail.com).
