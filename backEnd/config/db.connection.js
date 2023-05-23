const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4
})

const db = mongoose.connection
db.on('error',  console.error.bind(console, "connection error: "));
db.once('open', function(){
    console.log('Connected Successfully');
})