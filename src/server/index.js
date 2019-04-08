// - - - - - - - - - - - - - - - - - - - - - -
// - - - - Login, One-Many, and CRUD - - - - -
// - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;

// - - - - - - - - - - - - - - - - - - - - - -
const Area = require('./models/Area');
const Property = require('./models/Property');
const withAuth = require('./middleware');
const User = require('./models/User');
const Comment = require('./models/Comment');
const app = express();
const dbname = 'REACT-CA2';
const secret = 'secret';

let db;
// - - - - - - - - - - - - - - - - - - - - - -

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());


// - - - - - DB CONNECTION  - - - - - - - -
// const mongo_uri = process.env.MONGODB_URL || `mongodb://localhost:27017/${dbname}`;
const mongo_uri = 'mongodb+srv://edel:1234@react-ca2-5eh1m.mongodb.net/REACTCA2?retryWrites=true';

mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});


app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('dist'));
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.get('/api/home', function(req, res) {
  res.send('Welcome!');
});

app.get('/api/secret', withAuth, function(req, res) {
  res.send('The password is potato');
});

// - - - - - - REGISTER - - - - - - -
app.post('/api/register', function(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send('Error registering, please try again');
    } else {
      res.status(200).send('Welcome!');
    }
  });
});
// - - - - - - - - - - - - - - - - - - - - - -


// - - - - - AUTHENTICATE  - - - - - - -
app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
            });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true }).sendStatus(200);
        }
      });
    }
  });
});

// - - - - - - USING MIDDLEWARE TO CHECK WEB TOKEN  - - - - - - -
app.get('/api/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.get('/api/logout', withAuth, function(req, res) {
  res.cookie('token', '', { httpOnly: true }).sendStatus(200);;
});

// - - - - - - - - - - - - - - - - - - - - - -
// - - - - ONE - MANY CODE - - - - - - - - - -
// - - - - FOR AREA - PROP - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

app.get('/api/areas', function(req, res) {
  Area.find({}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

app.get('/api/properties', function(req, res) {
  Property.find({}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

app.get('/api/areas/:id', function(req, res) {
  Area.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

app.get('/api/property/:id', function(req, res) {
  Property.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

app.get('/api/areas/:id/properties', function(req, res) {
  Area.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;

    Property.find({area_id: data._id}, function(err, properties) {
      if (err) throw err;

      res.send(properties);
    });
  });
});

app.get('/api/properties/:id/comments', function(req, res) {
  Property.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;

    Comment.find({property_id: data._id}, function(err, comments) {
      if (err) throw err;

      res.send({data, comments});

    });
  });
});


// - - - - - - - - - - - - - - - - - - - - - -
// - - - -  CRUD Code  - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - -

// retrieve all Comment objects from DB
app.get('/api/comments', (req, res) => {
  Comment.find({}, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

// retrieve comment with specific ID from DB
app.get('/api/comments/:id', (req, res) => {
  Comment.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

// delete Comment with specific ID from DB
app.delete('/api/comments', (req, res) => {
  Comment.deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});



// create new Comment based on info supplied in request body
app.post('/api/comments/:id', (req, res) => {

  console.log(req.body);
  // create a new comment object using the Mongoose model and the data sent in the POST
  const comment = new Comment({
    comment: req.body.comment,
    property_id: req.params.id
  });

  // save this object to the DB
  comment.save((err, result) => {
    if (err) throw err;

    console.log('created in database');
    res.redirect('/');
  });
});

// update comment based on info supplied in request body
app.put('/api/comments', (req, res) => {
  // get the ID of the comment to be updated
  const id  = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;
  // find a comment matching this ID and update their details
  Comment.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});


app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
