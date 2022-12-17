const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

mongoose.connect('mongodb://127.0.0.1/contactDance', {useNewUrlParser: true});
const port = 8000;


//Define mongoose schema
var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });
var contact = mongoose.model('contact', contactSchema);

//EXPRESS SPECIFIES STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug');
})
app.get('/services',(req,res)=>{
    const params = {}
    res.status(400).render('services.pug')
})
app.get('/aboutUs',(req,res)=>{
    const params = {}
    res.status(400).render('aboutUs.pug');
})
app.get('/classInfo', (req, res)=>{
    const params = { }
    res.status(400).render('classInfo.pug');
})
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(400).render('contact.pug');
})
app.post('/contact', (req, res)=>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("The item has been save to the database")
    }).catch(()=>{
        res.status(400).send("The item was not save to the database")
    });
    // res.status(200).render('contact.pug');
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});  





