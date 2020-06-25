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
	
};

ToDosController.create = function(req, res){
	var username = req.params.username || null,
		newToDo = new ToDo({"petName": req.body.petName, "date": req.body.date});
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
	var id = req.params.id;
	var newDate = {$set: {date: req.body.date}};
	ToDo.updateOne({"_id":id}, newDate, function(err, todo){
		if(err !== null){
			res.status(500).json(err);
		}
		else{
			if(todo.n === 1 && todo.nModified === 1 && todo.ok === 1){
				res.status(200).json(todo);
			}
			else{
				console.log(todo);
				res.status(404).json({"status": 404});
			}
		}
	});
};

ToDosController.destroy = function(req, res){
	var id = req.params.id;
	console.log(id);
	ToDo.deleteOne({"_id":id}, function (err, todo){
		if(err !== null){
			res.status(500).json(err);
		}
		else{
			if(todo.n === 1 && todo.deletedCount === 1 && todo.ok === 1){
				res.status(200).json(todo);
			}
			else{
				res.status(404).json({"status": 404});
			}
		}
	});
};

module.exports = ToDosController;
