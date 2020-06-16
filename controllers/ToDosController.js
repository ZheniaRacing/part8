var User = require("../modules/users.js");
var ToDo = require("../modules/todos.js");
var ToDosController = {};

ToDosController.index = function(req, res){
	var username = req.params.username || null,
		respondWithToDos;
	respondWithToDos = function(query){
		ToDo.find(query, function(err, ToDos){
			if(err !== null){
				res.json(500, err);
			}
			else{
				res.status(200).json(ToDos);
			}
		});
	};
	if (username !== null){
		console.log("name: "+username);
		User.find({"username": username}, function(err, result){
			if(err !== null){
				res.json(500, err);
			}
			else if(result.length === 0){
				res.status(404).json({"result_lenght" : 0});
			}
			else{
				console.log(result);
				respondWithToDos({"owner": result[0]._id});	
			}
		});
	}
	else{
		respondWithToDos({"owner": null});
	}
};

ToDosController.show = function(req, res){
	/*var newToDo = new ToDo({"description":req.body.description, "tags":req.body.tags});
	newToDo.save(function(err, result){
		if(err !== null){
			console.log(err);
			res.send("ERROR");
		}
		else{
			ToDo.find({}, function(err, result){
				if(err !== null){
					res.send("ERROR");
				}
				res.json(result);
			});
		}
	});*/
};

ToDosController.create = function(req, res){
	var username = req.params.username || null,
		newToDo = new ToDo({"description": req.body.description, "tags": req.body.tags});
	User.find({"username": username}, function(err, result){
		if(err){
			res.send(500);
		}	
		else{
			if(result.length === 0){
				newToDo.owner = null;
			}
			else{
				newToDo.owner = result[0]._id;
			}
			newToDo.save(function(err, result){
				if(err !== null){
					res.json(500, err);
				}
				else{
					res.status(200).json(result);
				}
			});
		}
	});
	
};

ToDosController.update = function(req, res){
	console.log("Обновить");
	res.send(200);
};

ToDosController.destroy = function(req, res){
	console.log("КРУШИТЬ РАЗРУШАТЬ!");
	res.send(200);
};

module.exports = ToDosController;
