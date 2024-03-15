//require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./models/passport-config");

const dashboardRoute = require('./routes/Dashboard');
const profileRoute = require('./routes/Profile');
const historyRoute = require('./routes/History');
const notificationRoute = require('./routes/Notification');

//Import user model
const User = require('./models/UsersDB');

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(session({
  secret: "this is a secret",
  resave: false,
  saveUninitialized: false
}));

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//connect to database
async function connectDatabase(){
  const url = process.env.DB_URL;
  
 mongoose.connect(url);
  
   mongoose.connection.on("connected", ()=>{
    console.log("connected to database");
    })
    mongoose.connection.on("error", (err)=>{
    console.log(err);
    })
}
connectDatabase()

//define routes
app.get("/", (req, res)=>{
  res.render("login");
})
app.get("/signup", (req, res)=>{
  res.render("signup")
})

//sign up route
app.post('/signup', (req, res) => {
  console.log(req.body)
  User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
    if(err) {
      console.log(err);
      res.send(err);
    } else {
      passport.authenticate('local')(req, res, () => {
        res.redirect("/dashboard");
      })
    }
  })
})
//login route
app.post("/login", passport.authenticate("local",{
    successRedirect: "/dashboard",
    failureRedirect: "/"
}), function(req, res){
   console.log("success");
});

app.use('/dashboard', isLoggedIn, dashboardRoute)
app.use('/history', isLoggedIn, historyRoute);
app.use('/notification', isLoggedIn, notificationRoute);
app.use('/profile', isLoggedIn, profileRoute);

// check isLoggedIn middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/");
}

// Logout route
app.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

const port = 3002;
app.listen(port, ()=>{
  console.log(`server is runing on port ${port}`)
});