var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 8889,

  user: "root",

  password: "root",
  database: "bamazon_db"
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("Welcome to Bamazon!");
  console.log("======================");
});

function readProducts() {
  connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
    if (err) throw err;
      for(var i = 0; i < res.length; i++) {
      console.log("Item ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " +  res[i].price);
      console.log("----------------------");
    }
  });

inquirer.prompt([

  {
    name: "id",
    type: "input",
    message: "What is the id of the item you would like to buy?"
  },

  {
    name: "quantity",
    type: "input",
    message: "How many would you like to buy?"
  }

]).then(function(order) {
            
    var quantity = order.quantity;
    var itemId = order.id;
    
    connection.query('SELECT * FROM products WHERE item_id=' + itemId, function(err, orderedItem) {
    if (err) throw err;
    
    if (orderedItem[0].stock_quantity - quantity >= 0) {
    console.log("The total cost of your order is " + (order.quantity * orderedItem[0].price) +  " dollars. A pleasure doing business with you.");
                            
    connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [orderedItem[0].stock_quantity - quantity, itemId],
      function(err, res) {
        if (err) throw err;
                                   
        readProducts();
    });  
  }
      else {
        console.log("I'm sorry, Bamazon does not have the quantity you desire at the moment.");
        readProducts();
      }
    });
  });
};


readProducts();





