var express = require('express');
var sqlite = require('sqlite3');
var app = express();

app.set('view engine', 'ejs');
app.use(express.static('static'));
var db = new sqlite.Database('db.sqlite');


app.get('/', function (req, res) {
    db.all('select * from sites', function(err, result){
        res.render('index.ejs', {items: result});
    })
        
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});