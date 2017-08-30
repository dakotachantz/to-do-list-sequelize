const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const path = require("path");
const models = require("./models");
const port = process.env.PORT || 8888;
const app = express();

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static(path.join(__dirname, "./public")));
app.use(bodyParser.urlencoded({ extended: false }));


// models.Todos.findOne()
//     .then(function (todo) {
//         console.log(todo.task);
//     })


app.get("/", (req, res) => {
    let todos;
    models.Todos.findAll().then(function (foundTodos) {
        // console.log("found stuff: ", foundTodos);
        todos = foundTodos;
        // console.log("todos list: ", todos);
        return res.render("todo", { todos: todos });
    });
});

app.post("/complete/:task", (req, res) => {
    let task = req.params.task;
    let index = data.todos.findIndex(function (item) { return item.task === task });
    let targetTodo = data.todos[index];
    targetTodo.completed = !targetTodo.completed;
    data.markoff.push(targetTodo);
    data.todos.splice(index, 1);
    return res.redirect("/");
});

app.post("/todo", (req, res) => {

    const todo = models.Todos.build({
        task: req.body.task,
        completed: false
    });

    todo.save()
        .then(function (newToDo) {
            res.send(newToDo);
        });

    // let newTodo = req.body;
    // newTodo.completed = false;
    // data.todos.push(newTodo);
    return res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
