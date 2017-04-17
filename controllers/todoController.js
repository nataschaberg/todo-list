const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Todo = require("../models/todo");
const config = require("../config");
const afinn = require("../AFINN-111");

let urlencodedParser = bodyParser.urlencoded({extended: false});

//connect to DB with uname and pass
mongoose.connect(config.mongoConnect);

module.exports = function(app){

  app.get("/todo", function(req, res) {
    //get data from mongodb and pass to view
    Todo.find({}, function(err, data){
      console.log(data);
      if(err) throw err;
      res.render("todo", {todos: data});
    });
  });

  app.post("/todo", urlencodedParser, function(req, res) {
    let text = req.body.item.toString();
    //here tokenize expression with regex
    let words = text.split(/\W/);
    console.log(words);
    let wordsFound = {
      totalScore: 0,
      countWords: 0,
      avScore: 0,
      words: []
    };
    let wordsNotFound = [];

    let newTodo = Todo({
      item: req.body.item,
    });

    for(var i = 0; i < words.length; i++) {
      var word = words[i].toLowerCase();
      if(afinn.hasOwnProperty(word)) {
        let wScore = afinn[word];
        wordsFound.totalScore += afinn[word];
        wordsFound.countWords++;
        wordsFound.avScore = wordsFound.totalScore / wordsFound.countWords;
        wordsFound.words.push({[word]: wScore});
        newTodo.words.push({word: [word], score: wScore});
      } else {
        wordsNotFound.push(words[i]);
      }
    }
    newTodo.avScore = wordsFound.avScore;
    console.log(wordsFound);
    //get data from view and add to mongodb


    newTodo.save(function(err, data) {
      if(err) throw err;
      console.log("in save function", data);
      res.render("todo", {todos: data});
    });
  });

  app.delete("/todo/:item", function(req, res) {
    //delete req item from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data) {
      if(err) throw err;
      console.log(data, "im in delete");
      res.render("todo", {todos: data});
    });
  });


};
