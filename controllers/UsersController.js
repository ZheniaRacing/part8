var User = require("../modules/users.js");
//Создаём тестового пользователя
/*var exampleUser = new User({"username":"usertest"});
exampleUser.save(function(err, result){
	if(err){
		console.log(err);
	}
	else{
		console.log("Пользователь сохранён");
	}
});*/

var UsersController = {};

UsersController.index = function(req, res){
	console.log("Индекс");
	res.send(200);
};

UsersController.show = function(req, res){
	
};

UsersController.create = function(req, res){
	console.log("Создать");
	res.send(200);
};

UsersController.update = function(req, res){
	console.log("Обновить");
	res.send(200);
};

UsersController.destroy = function(req, res){
	console.log("КРУШИТЬ РАЗРУШАТЬ!");
	res.send(200);
};

module.exports = UsersController;
