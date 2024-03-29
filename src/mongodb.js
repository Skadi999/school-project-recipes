//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var url = 'mongodb://127.0.0.1/recipes';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));