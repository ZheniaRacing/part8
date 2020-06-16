var express = require("express"),
	http = require("http"),
	mongoose = require("mongoose"),
	app = express();
	
var ToDo = require(__dirname + "/modules/todos.js");
console.log(__dirname + "/modules/todos.js");
var User = require(__dirname + "/modules/users.js");
var UsersController = require(__dirname + "/controllers/UsersController.js");
var ToDosController = require(__dirname + "/controllers/ToDosController.js");

app.use('/', express.static(__dirname + "/client"));
app.use('/user/:username', express.static(__dirname + "/client"));

http.createServer(app).listen(3000);
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost/amazeriffic');

//маршруты для панели администратора
app.get("/users.json", UsersController.index);
app.post("/users", UsersController.create);
app.get("/users/:username", UsersController.show);
app.put("/users/:username", UsersController.update);
app.delete("/users/:username", UsersController.destroy);

app.get("/todos.json", ToDosController.index);
app.get("/user/:username/todos.json", ToDosController.index);
app.post("/user/:username/todos", ToDosController.create);
app.post("/todos", ToDosController.create);
app.put("/user/:username/todos/:id", ToDosController.update);
app.delete("/user/:username/todos/:id", ToDosController.destroy);
