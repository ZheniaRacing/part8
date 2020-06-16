var mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
var ToDoSchema = mongoose.Schema({
	description: String,
	tags: [String],
	owner: {type: ObjectId, ref: "User"}
});

var ToDo = mongoose.model("ToDo", ToDoSchema);

module.exports = ToDo;
