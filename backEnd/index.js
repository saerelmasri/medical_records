const express = require('express')
const app = express()
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();
const cors = require('cors');
app.use(cors());

app.listen((process.env.PORT), (err)=>{
    console.log('Listening in port', process.env.PORT);
    require('./config/db.connection');
});