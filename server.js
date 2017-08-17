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

app.post("/todo", (req, res) => {
    let newToDo = req.body;
    newToDo.completed = true;
    data.todos.push(newToDo);
    console.log('creating new object with: ', req.body);
    console.log('todos: ', data.todos);
    return res.redirect("/");
});

app.post("/complete", (req, res) => {
    let completeToDo = req.body;
    completeToDo.markoff = true;
    data.markoff.push(completeToDo);
    console.log('what to add to markoff array: ', req.body);
    console.log('markoff: ', data.markoff);
    return res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
