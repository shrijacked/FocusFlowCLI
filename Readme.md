Sure! Here’s the complete `README.md` file you can copy-paste:

```markdown
# To-Do CLI Manager

This is a command-line interface (CLI) tool built with Node.js to help you manage your to-do tasks. You can add, list, remove, and mark tasks as done or undone. Tasks can be prioritized, and they're saved in a local JSON file (`todos.json`).

## Features
- **Add** new tasks with a priority level.
- **List** all tasks sorted by priority.
- **Remove** tasks by index.
- **Mark tasks as done** or undone.
- Data is saved to a local `todos.json` file.

## Installation

### Prerequisites
- You must have Node.js installed on your machine.
- You need `npm` or `yarn` to install dependencies.

### Steps
1. Clone this repository or download the project files.
   ```bash
   git clone https://github.com/your-repo/todo-cli-manager.git
   cd todo-cli-manager
   ```

2. Install dependencies.
   ```bash
   npm install
   ```

3. Run the tool.
   ```bash
   node todo.js <command>
   ```

## Usage

### 1. Add a task
To add a new task, use the `add` command, followed by the task description. You can optionally set a priority (default is 1).

```bash
node todo.js add "Buy groceries" --priority 3
```

**Options:**
- `--priority, -p`: Set the priority level of the task. Higher priority tasks are listed first.

### 2. List all tasks
To view all tasks, sorted by priority, use the `list` command:

```bash
node todo.js list
```

### 3. Mark a task as done
To mark a task as done, use the `done` command with the task index (as listed):

```bash
node todo.js done 1
```

### 4. Mark a task as not done
To mark a task as not done, use the `undone` command with the task index:

```bash
node todo.js undone 1
```

### 5. Remove a task
To remove a task, use the `remove` command followed by the task index:

```bash
node todo.js remove 1
```

## Example Workflow

1. Add a task:
   ```bash
   node todo.js add "Study for exam" --priority 2
   ```

2. Add another task:
   ```bash
   node todo.js add "Complete project report" --priority 1
   ```

3. List tasks:
   ```bash
   node todo.js list
   ```
   Output:
   ```
   1. Study for exam [ ] (Priority: 2)
   2. Complete project report [ ] (Priority: 1)
   ```

4. Mark the first task as done:
   ```bash
   node todo.js done 1
   ```

5. List tasks again:
   ```bash
   node todo.js list
   ```
   Output:
   ```
   1. Study for exam [x] (Priority: 2)
   2. Complete project report [ ] (Priority: 1)
   ```

6. Remove a task:
   ```bash
   node todo.js remove 2
   ```

## Notes
- The tasks are stored in the `todos.json` file. If the file does not exist, it will be created automatically when you add a task.
- If you make a mistake with a task's status (done/undone), you can easily switch its state using the `done` or `undone` commands.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
```

Just copy and paste this content into your `README.md` file, and you're all set!