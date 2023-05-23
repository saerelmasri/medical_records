const express = require('express')
const app = express()
app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
require('dotenv').config();
const cors = require('cors');
app.use(cors());

const V1Router = express.Router()
const authRoute = require('./Routes/auth.route')
V1Router.use('/auth', authRoute)

app.use('/V1', V1Router)


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }

    next();
});

app.listen((process.env.PORT), (err)=>{
    console.log('Listening in port', process.env.PORT);
    require('./config/db.connection');
});