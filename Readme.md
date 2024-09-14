# To-Do CLI Application

This is a simple command-line interface (CLI) application to manage to-do tasks. It allows you to add, list, remove, mark as done, and mark as not done your to-do items.

## Features

- Add a new to-do item with an optional priority.
- List all to-do items sorted by priority.
- Remove a to-do item by its index.
- Mark a to-do item as done.
- Mark a to-do item as not done.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/todo-cli.git
    cd todo-cli
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

### Add a Task

To add a new to-do item, use the `add` command followed by the task description. You can also specify the priority of the task (default is 1).

```sh
node index.js add "Buy groceries" --priority 3