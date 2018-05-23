var mongoose = require("mongoose");

mongoose.Promise = Promise;

//SCHEMA SET UP
var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name cannot be blank."
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

var Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;