const express = require("express");
const data = require("./data");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.render("todo", { todos: data.todos, markoff: data.markoff });
});

app.post("/complete/:task", (req, res) => {
    let task = req.params.task;
    let index = data.todos.findIndex(function (item) { return item.task === task });
    let targetTodo = data.todos[index];
    targetTodo.completed = !targetTodo.completed;
    data.markoff.push(targetTodo);
    data.todos.splice(index, 1);
    console.log('todos: ', data.todos, data.markoff);
    return res.redirect("/");
});

app.post("/todo", (req, res) => {
    let newTodo = req.body;
    newTodo.completed = false;
    data.todos.push(newTodo);
    return res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
