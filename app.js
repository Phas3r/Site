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

app.get('/', function (req, res) {
        res.render('index.ejs');
   });

app.post('/add', function(req, res){
    var statement = 'insert into sites (Name, Url, Description) values(?, ?, ?)';
    db.run(statement, req.query.site_name, req.query.site_link, req.query.site_desc, function () {
        res.send('added');
    });
});

app.delete('/delete', function (req, res) {
    var statement = 'delete from sites where id = ?';
    db.run(statement, req.query.id, function(){
        res.send('deleted');
    });
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});