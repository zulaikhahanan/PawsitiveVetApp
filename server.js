//Variables Declaration
const express = require('express');
const path = require ('path');
const app = express();
const port = process.env.PORT || 8080
const mongoose = require('mongoose');
var session = require('express-session');
var http = require('http');
var bodyParser = require('body-parser');

/*app.listen(port, () => {
  console.log('Server is up on port ' + port)
})*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(process.env.PORT || 8080, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


  mongoose.connect('mongodb+srv://aikhx:iGP6XbABTTOoKrB0@project.grgeq0f.mongodb.net/pv?retryWrites=true&w=majority', {

        useNewUrlParser: true,
        useUnifiedTopology: true
      }, (err) => {
        if (!err) {
          console.log('MongoDB Connection Succeeded.');
        } else {
          console.log('Error in DB Connection : ' + err);
        }
      }); 

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: true,
}));


// Using ejs engine template
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').renderFile);

//Access to CSS,HTML from the Folder named 'public'
app.use(express.static(path.join(__dirname, 'public')));


//Routes
const index = require('./routes/index');
const loginPetOwner = require('./routes/loginUser');
const registerPetOwner = require('./routes/registerUser');
const registerAdmin = require('./routes/registerAdmin');
const loginAdmin = require('./routes/loginAdmin');
const admins = require('./routes/admin');
const petowners = require('./routes/petowner');
const appointments = require('./routes/appointment');
const vets = require('./routes/vet');
const pets = require('./routes/pet');
const inquiries = require('./routes/inquiry');
const userApp = require('./routes/userAppointment');
const userPet = require('./routes/userPet');

//App use
app.use("/registerAdmin", registerAdmin);
app.use("/registerPetOwner", registerPetOwner);
app.use("/loginUser", loginPetOwner);
app.use("/loginAdmin", loginAdmin);
app.use("/", index);
app.use("/admins", admins);
app.use("/petowners", petowners);
app.use("/appointments", appointments);
app.use("/vets",vets);
app.use("/pets",pets);
app.use("/inquiries",inquiries);
app.use("/userApp",userApp);
app.use("/userPet",userPet);


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
 

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
