const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;


// to create an app
var app = express();

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear' , () => {
     return (new Date).getFullYear()
});

hbs.registerHelper('screamIt' , (text) => {
     return text.toUpperCase();
});

app.set('view engine' , 'hbs');

//register a middleware
app.use(  (req , res , next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} : ${req.url}`;
    fs.appendFile('server.log' , log + '\n' , (err) => {
        if(err){
            console.log('Unable to append to the file');
        }
    });
    next();
});

/*app.use(  (req , res , next) => {
     res.render('test.hbs');
});*/

app.use(express.static(__dirname + '/public'));

// route incase of get request
app.get('/' , (req,res) => {
     res.render('home.hbs' , {
        pageTitle: 'Home Page' ,
        /*currentYear: (new Date).getFullYear(),*/
        userName: 'Shoaib'
    });
  //  res.send('<h1>Hello Express</h1>');
 /*   res.send({
          name: 'Shoaib',
          likes: [
              'Biking',
              'Flirting',
              'Singing',
              'Shooting',
              'Messing'
          ]
      })*/
});

app.get('/about' , (req , res) => {
     res.render('about.hbs', {
         pageTitle: 'About Us Page',
         /*currentYear: (new Date).getFullYear()*/
     });
    // res.send('About US Page Works'); 
});

app.get('/projects' , (req , res) => {
     res.render('projects.hbs', {
         pageTitle: 'Portfolio Page',
         userName: 'Fahad'
     });
});

app.get('/bad' , (req , res) => {
     res.send({
         errorMessage: 'Very Bad Request'
     }); 
});

app.listen(port , () => {
    console.log(`Listening on ${port}`);
});