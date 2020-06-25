var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var ToDoSchema = mongoose.Schema({
	petName: String,
	date: String,
	owner: {type: ObjectId, ref: "User"}
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = ToDo;
