var express = require("express"),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    port = parseInt(process.env.PORT, 10) || 4567;


app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + '/dist'));


console.log("Simple static server listening at http://localhost:" + port);
app.listen(port);
