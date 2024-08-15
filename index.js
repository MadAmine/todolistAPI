const express = require('express')
const fs = require('fs')
const env = require('dotenv')
env.config()
const app = express()

app.use(express.json());

const tasksFilePath = './tasks.json';

//  function to read the tasks file
const readTasksFromFile = () => {
  const tasks = fs.readFileSync(tasksFilePath);
  return JSON.parse(tasks);
};

//  function to write tasks to the file
const writeTasksToFile = (tasks) => {
  fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2));
};

// Get all tasks
app.get('/tasks', (req, res) => {
  const tasks = readTasksFromFile();
  res.json(tasks);
});

// Get a specific task by ied

app.get('/tasks/:id', (req, res) => {
  const tasks = readTasksFromFile();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) {
d  }
  res.json(task);
});




// Create a new task
app.post('/tasks', (req, res) => {
    const tasks = readTasksFromFile();
    const newTask = {
      id: tasks.length + 1,
      title: req.body.title,
      completed: req.body.completed || false,
    };
    tasks.push(newTask);
    writeTasksToFile(tasks);
    res.status(201).json(newTask);
});

  // Update an existing task by idd
app.patch('/tasks/:id', (req, res) => {
    const tasks = readTasksFromFile();
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) {
    return res.status(404).send('Task not found');
    }
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    writeTasksToFile(tasks);
    res.json(tasks[taskIndex]);
});

  // Delete a task by idd
app.delete('/tasks/:id', (req, res) => {
    const tasks = readTasksFromFile();
    const filteredTasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    if (tasks.length === filteredTasks.length) {
    return res.status(404).send('Task not found');
    }
    writeTasksToFile(filteredTasks);
    res.status(204).send();
  });
  
  
  // Start the server f
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://${process.env.LOCAL}:${process.env.PORT}`);
  });