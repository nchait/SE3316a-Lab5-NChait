// server.js

// BASE SETUP
// =============================================================================
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/users_test'); // connect to our database
var Message     = require('./app/message');
// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var counter = 0;
var validate = require("validate.js");
var http = require('http');
var fs = require('fs');
var fetch = require('fetch');
var path = require("path")
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port




// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();              // get an instance of the express Router
app.set('view engine','ejs');
// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
app.use(express.static(path.join(__dirname + '/static')));
router.get('/', function(req, res) {
    res.json({message: 'Welcome'});
});

// more routes for our API will happen here

// on routes that end in /message
// ----------------------------------------------------
router.route('/message')

    // create a message (accessed at POST http://localhost:8080/api/message)
    .post(function(req, res) {
    
        console.log(req.body);
        var message = new Message();      // create a new instance of the message model
        message.timeStamp = Date.now();  // set the message timestamp (comes from the request)
        message.courseID = req.body.courseID; //change it to the button later                                 !!!
        message.messageBody = req.body.messageBody; //change it to the text field under the button later       !!!
        counter+=1;
        message.count = counter;     
        // save the message and check for errors
        message.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Message Posted' });
        });

    })
    
    .get(function(req, res) {
        Message.find(function(err, message) {
            if (err)
                res.send(err);

            res.json(message);
        });
    });

// on routes that end in /message/:messagecount
// ----------------------------------------------------
router.route('/message/:messagecount')

    // get the message with that count (accessed at GET http://localhost:8080/api/message/:messagecount)
    .get(function(req, res) {
        Message.findById(req.params.messagecount, function(err, message) {
            if (err)
                res.send(err);
            res.json(message);
        });
    })
    
        // delete the message with this count (accessed at DELETE http://localhost:8080/api/message/:messagecount)
    .delete(function(req, res) {
        Message.remove({
            count: req.params.messagecount
        }, function(err, message) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
