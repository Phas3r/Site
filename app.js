var express = require('express');
var sqlite = require('sqlite3');
var app = express();
var cookieSecret = 'hehkek'
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
app.set('view engine', 'ejs');
app.use(express.static('static'));
var db = new sqlite.Database('db.sqlite');
var passport = require('passport');
var ls = require('passport-local').Strategy;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cookieParser());
app.use(require('express-session')({ secret: cookieSecret, resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new ls(
    {
        usernameField: 'login',
        passwordField: 'password'
    },
    function(login, password, done) {
    db.get('SELECT id, name FROM Users WHERE name = ? AND password = ?', login, password, function(err, row) {
        if (!row) return done(null, false);        
        return done(null, row);
    });
}));

passport.serializeUser(function(user, done) {
    return done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    db.get('SELECT id, name FROM Users WHERE id = ?', id, function(err, row) {
        if (!row) return done(null, false);
        return done(null, row);
    });
});

app.get('/login', function(req, res){
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    res.render('login.ejs');
});

app.post('/login', passport.authenticate('local',
    {session: true, successRedirect: '/', failureRedirect: '/login' }
));

app.all('/*', function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/login');
    }
    next();  
});

app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});




app.get('/', function (req, res) {
    db.all('select * from sites', function (err, result) {
        res.render('index.ejs', {items: result});
    })
        
});


app.post('/add', function(req, res){
    var statement = 'insert into sites (Name, Url, Description) values(?, ?, ?)';
    db.run(statement, req.query.site_name, req.query.site_link, req.query.site_desc, function () {
        res.send('added');
    });
});

app.post('/signup', function(req, res){
    var statement = 'insert into Users (name, password) values(?, ?)';
    db.run(statement, req.query.user_name, req.query.user_password, function () {
    });
});

app.delete('/delete', function (req, res) {
    var statement = 'delete from sites where id = ?';
    db.run(statement, req.query.id, function(){
        res.send('deleted');
    });
});


app.get('/grid', function (req, res) {
        res.render('grid.ejs');
   });


var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});







