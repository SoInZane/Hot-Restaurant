// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Global array for holding tables and reservations
var tablesArr = [
    {
        "customerName": "dummy",
        "phoneNumber": "555-2345",
        "customerEmail": "fake@gmail.com",
        "customerID": "1"
        }
];
var waitListArr = [
    {
    "customerName": "dummy2",
    "phoneNumber": "2555-2345",
    "customerEmail": "fake@gmail.com",
    "customerID": "1"
    }

];

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays tables api
app.get("/api/tables", function(req, res) {
    return res.json(tablesArr);
  });

  // Displays tables api
app.get("/api/waitlist", function(req, res) {
    return res.json(waitListArr);
  });

  app.post("/api/tables", function(req, res) {
      var newTable = req.body;

      if (tablesArr.length < 5) {
      tablesArr.push(newTable);
      } else {
          waitListArr.push(newTable);
      }

      res.json(newTable);
  });


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
