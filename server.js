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

app.get("/", (req, res) => {
    models.Todos.findAll().then(function (foundTodos) {
        return res.render("todo", { todos: foundTodos });
    });
});

app.post("/deleteallcompleted", (req, res) => {
    models.Todos.destroy({
        where: {
            completed: true
        }
    }).then(function () {
        return res.redirect("/");
    });
});
app.post("/edit/:id", (req, res) => {
    let reqId = req.params.id;
    console.log(req.body.task);
    models.Todos.update({
        task: req.body.task.join("")//did not expect to be an array, refer to post /todo
    }, {
            where: {
                id: reqId
            }
        }).then(function () {
            return res.redirect("/");
        });
});

app.post("/delete/:id", (req, res) => {
    let reqId = req.params.id;
    models.Todos.destroy({
        where: {
            id: reqId
        }
    }).then(function () {
        return res.redirect("/");
    });
});

app.post("/complete/:id", (req, res) => {
    let reqId = req.params.id;
    models.Todos.update({
        completed: true
    }, {
            where: {
                id: reqId
            }
        }).then(function () {
            return res.redirect("/");
        });
});


app.post("/todo", (req, res) => {
    const todo = models.Todos.build({
        task: req.body.task,
        completed: false
    });
    todo.save()
        .then(function () {
            return res.redirect("/");
        });
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
