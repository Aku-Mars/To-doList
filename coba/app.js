const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let db; // Variabel untuk menyimpan koneksi ke MongoDB

// Koneksi ke MongoDB
MongoClient.connect("mongodb+srv://Mars:Mars123@database.xvhmibk.mongodb.net/?retryWrites=true&w=majority", { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
    db = client.db("database"); // Gunakan database "todolist"
});

app.listen(3000, function () {
    console.log("Server started on port 3000");
});

app.get("/", function (req, res) {
    // Ambil daftar tugas dari MongoDB
    db.collection("tasks").find().toArray((err, tasks) => {
        if (err) return console.error(err);
        res.render("index.ejs", { tasks: tasks });
    });
});

app.post("/", function (req, res) {
    // Menambahkan tugas baru ke MongoDB
    const task = { task: req.body.task, date: req.body.dueDate, completed: false };
    db.collection("tasks").insertOne(task, (err, result) => {
        if (err) return console.error(err);
        console.log("Task added to MongoDB");
        res.redirect("/");
    });
});

app.post("/complete", function (req, res) {
    // Menandai tugas sebagai selesai di MongoDB
    const taskId = req.body.taskId;
    db.collection("tasks").updateOne({ _id: taskId }, { $set: { completed: true } }, (err, result) => {
        if (err) return console.error(err);
        console.log("Task marked as completed in MongoDB");
        res.redirect("/");
    });
});

app.post("/delete", function (req, res) {
    // Menghapus tugas dari MongoDB
    const taskId = req.body.taskId;
    db.collection("tasks").deleteOne({ _id: taskId }, (err, result) => {
        if (err) return console.error(err);
        console.log("Task deleted from MongoDB");
        res.redirect("/");
    });
});
