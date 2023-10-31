const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000; // Port server, bisa Anda sesuaikan

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Hubungkan ke database MongoDB (gantilah URL sesuai dengan database Anda)
mongoose.connect('mongodb+srv://Mars:Mars123@database.xvhmibk.mongodb.net/?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

const taskSchema = new mongoose.Schema({
    task: String,
    date: Date,
});

const Task = mongoose.model('Task', taskSchema);

// Menambahkan tugas baru
app.post('/tasks', (req, res) => {
    const { task, date } = req.body;
    const newTask = new Task({ task, date });

    newTask.save()
        .then(savedTask => {
            res.json(savedTask);
        })
        .catch(err => {
            res.status(400).json({ error: 'Failed to add task' });
        });
});

// Mendapatkan semua tugas
app.get('/tasks', (req, res) => {
    Task.find()
        .then(tasks => {
            res.json(tasks);
        })
        .catch(err => {
            res.status(400).json({ error: 'Failed to get tasks' });
        });
});

// Menghapus tugas
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;

    Task.findByIdAndRemove(taskId)
        .then(() => {
            res.json({ message: 'Task deleted' });
        })
        .catch(err => {
            res.status(400).json({ error: 'Failed to delete task' });
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
