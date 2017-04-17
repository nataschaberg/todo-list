const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

const todoController = require("./controllers/todoController");

const app = express();

//set up the template engine
// app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//serve static files
app.use(express.static("./public"));

//fire controllers
todoController(app);



//listen to port
app.listen(8080);
console.log("you are listening to port 8080");
