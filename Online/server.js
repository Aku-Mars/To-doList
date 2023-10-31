const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Hubungkan ke database MongoDB (gantilah URL sesuai dengan database Anda)
mongoose.connect('mongodb+srv://Mars:Mars123@database.xvhmibk.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
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

app.use(express.json());

app.get('/', (req, res) => {
    res.send
