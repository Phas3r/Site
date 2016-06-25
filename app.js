var express = require('express');
var sqlite = require('sqlite3');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('static'));
var db = new sqlite.Database('db.sqlite');


app.get('/', function (req, res) {
    db.all('select * from sites', function (err, result) {
        res.render('index.ejs', {items: result});
    })
        
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});