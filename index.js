var	express     = require("express"),
	app 	   	= express(),
	mongoose	= require("mongoose"),
	bodyParser  = require("body-parser"),
	port 	   	= process.env.PORT || 5000;

// Requiring Routes
var todoRoutes   = require("./routes/todos");

//Database connect
const url = process.env.DATABASEURL;
mongoose.connect(url);

// bodyParser setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
   res.sendFile("index.html");
});

app.use("/api/todos", todoRoutes);

app.listen(port, function(){
	console.log("todo_api app is running on port " + port);
});