Here’s a comprehensive README file for your `todo` CLI tool. This README will cover installation, usage, and all the features of your tool.

---

# Todo CLI Tool

A powerful CLI tool for managing your to-do tasks with advanced features like due dates, priority, categories, recurring tasks, and more.

## Features

- **Add Tasks with Priorities**: Add tasks with customizable priority values.
- **List Tasks**: List all tasks sorted by priority and due date.
- **Mark Tasks as Done/Undone**: Mark tasks as completed or not completed.
- **Remove Tasks**: Delete tasks based on their index.
- **Due Dates for Tasks**: Set and display due dates for tasks.
- **Filter by Status**: Filter tasks by "done" or "not done" status.
- **Edit Tasks**: Edit existing tasks (modify text, priority, or due date).
- **Search for Tasks**: Search tasks by keyword or tag.
- **Group Tasks by Category**: Organize tasks into categories or labels.
- **Recurring Tasks**: Automatically re-add recurring tasks after completion.
- **Color-Coded Priority**: Display tasks with color codes based on priority levels.
- **Reminders**: Notify users of upcoming deadlines.
- **Backup and Restore**: Features to back up and restore the `todos.json` file.
- **Task History**: Keep a log of completed tasks for future reference.

## Installation

1. **Clone the Repository**:

    ```bash
    git clone https://github.com/your-username/todo-cli-tool.git
    cd todo-cli-tool
    ```

2. **Install Dependencies**:

    ```bash
    npm install
    ```

3. **Link the CLI Tool Globally**:

    ```bash
    npm link
    ```

## Usage

### Adding a Task

```bash
todo add "Task description" --priority <priority> --due <dueDate> --category <category> --recurring
```

- **`<priority>`**: The priority level of the task (default is 1).
- **`<dueDate>`**: The due date for the task in `YYYY-MM-DD` format (optional).
- **`<category>`**: The category or label for the task (optional).
- **`--recurring`**: Mark the task as recurring (optional).

### Listing Tasks

```bash
todo list
```

- Lists all tasks sorted by priority and due date.

### Marking a Task as Done

```bash
todo done <index>
```

- Marks the task at the specified index as done.

### Marking a Task as Undone

```bash
todo undone <index>
```

- Marks the task at the specified index as not done.

### Removing a Task

```bash
todo remove <index>
```

- Removes the task at the specified index.

### Editing a Task

```bash
todo edit <index> --task "<newDescription>" --priority <newPriority> --due <newDueDate>
```

- **`<index>`**: The index of the task to edit.
- **`--task`**: New task description (optional).
- **`--priority`**: New priority level (optional).
- **`--due`**: New due date in `YYYY-MM-DD` format (optional).

### Searching for Tasks

```bash
todo search "<keyword>"
```

- Searches tasks by the specified keyword or tag.

### Filtering Tasks by Status

```bash
todo filter --done
todo filter --undone
```

- **`--done`**: Show only completed tasks.
- **`--undone`**: Show only uncompleted tasks.

### Backup and Restore

#### Backup

```bash
todo backup
```

- Creates a backup of the `todos.json` file.

#### Restore

```bash
todo restore
```

- Restores the `todos.json` file from the latest backup.

## Configuration

### Colors

The CLI tool uses color codes to differentiate tasks based on priority levels. Customize the color settings in the `config.json` file.

### Reminders

Set up reminders in the `config.json` file to get notified of upcoming deadlines.


## Contact

For feedback, please reach out to [edushrijak@gmail.com](mailto:your-email@example.com).

---

