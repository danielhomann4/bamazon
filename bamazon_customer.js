var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazondb"
});

connection.connect();
// (function(err) {
//     if (err) throw err;
//     console.log("connected as id " + connection.threadId);
//     connection.end();
//   });

connection.query("SELECT * FROM products", function(err, res) {
  if (err) throw err;
  console.log(res);
  inquirer.prompt([
    {
      name: "products",
      message: "What would you like to purchase?",
      type: "rawlist",
      choices: function() {
        var choiceArray = [];
        for (var i = 0; i < res.length; i++) {
          choiceArray.push(res[i].product_name);
        }
        return choiceArray;
      }
    },
    {
        name: "quantity",
        message: "How many would you like to buy?",
        type: "input"
    }
  ])
    .then(function (answers){
        var choice;
        for(var i = 0; i < res.length; i++){
            if (res[i].product_name === answers.products){
                choice = res[i];
            }
        }
    if (choice.stock_quantity > parseInt(answers.quantity)){
        console.log("It is yours now!")
    }
    else{
        console.log("We are all out...sorry...")
    }
    })
});