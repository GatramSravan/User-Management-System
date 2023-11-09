require('dotenv').config();

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const connectDB = require('./server/config/db');
const methodOverride = require('method-override');
const app = express();



const port = 9000;


connectDB();


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(express.static('public'));

//Templating Engine

app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');


// app.get('/',(req,res)=>{
//     //res.send('Hellloooo World');
//     const locals = {
//         title : 'NodeJs',
//         description : 'Heelloo'

//     }
//     res.render('index.ejs',locals);
// });

//Routes  YPLiFgxhgeSdearr
app.use('/',require('./server/routes/customer.js'));

app.get('*',(req,res)=>{
    res.status(404).render('404.ejs');
});

app.listen(port,()=>{
    console.log('Running Port 9000');

});
