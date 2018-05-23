/* global $*/
var url = "/api/todos/";

$(document).ready(function(){
    $.getJSON(url)
    .done(addTodos)
    .fail(fail);
    
    $("#todoInput").keypress(function(event){
        // keypress for enter (return) is 13
        if(event.which === 13){
            createTodo();
        }
    });
    
    $(".list").on("click", "li", function(){
        updateTodo($(this));
    });
    
    // make sure listening for clicks on something that exists at the beginnning
    // add event listener to any .list items as they're dynamically added BUT only on to spans within, as specified as 2nd parameter
    $(".list").on("click", "span", function(e){
        e.stopPropagation();
        deleteTodo($(this).parent());
    });
    
});

function addTodos(todos){
    // add todos to page
    todos.forEach(function(todo){
        addTodo(todo);
    });
}

function addTodo(todo){
    // create a variable for each to do
    var newTodo = $("<li class='task'>" + todo.name + "<span>X</span>" + "</li>");
    // using jQuery, store todo _id as the data variable
    newTodo.data("id", todo._id);
    // as above, store completed
    newTodo.data("completed", todo.completed);
    // NOTE- adding the task class in line or can do addClass like below. Be careful of single and double quotes
    if(todo.completed){
        newTodo.addClass("done");
    }
    //add each todo to the list class
    $(".list").append(newTodo);
}

function createTodo(){
    // send request to create new todo
    // data value entered within #todoInput (form)
    var userInput = $("#todoInput").val();
    $.post(url, {name: userInput})
    .done(function(newTodo){
        // clear form
        $("#todoInput").val("");
        // add to list
        addTodo(newTodo);
    })
    .fail(fail);
}

function deleteTodo(todo){
    // retrieve the todo _id
    var clickedId = todo.data("id");
    // create correct url in order to send DELETE request
    var deleteUrl = url + clickedId;
    // send delete request
    $.ajax({
        method: "DELETE",
        url: deleteUrl
    })
    // once complete, remove the list item from list
    .done(function(data){
        todo.remove();
    })
    .fail(fail);
}

function updateTodo(todo){
    var clickedId = todo.data("id");
    var updateUrl = url + clickedId;
    var isDone = !todo.data("completed");
    var updateData = {completed: isDone};
    $.ajax({
        method: "PUT",
        url: updateUrl,
        data: updateData
    })
    .done(function(updatedTodo){
        todo.toggleClass("done");
        todo.data("completed", isDone);
    })
    .fail(fail);
}

function fail(err) {
    console.log(err);
}