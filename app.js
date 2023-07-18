const express = require('express');
require('dotenv').config()

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const adminRoutes = require('./routes/admin');
const User = require('./models/user');

const cors = require('cors');
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors());
app.use((req, res, next) => {
  User.findById('64b67c7b848e04096b1ab545')
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => console.log(err));
})

app.use(adminRoutes);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PWD}@cluster0.nu2y6hy.mongodb.net/?retryWrites=true&w=majority`)
.then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'Sagar',
        email: 'sagar@gmail.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
  });
  app.listen(3000);
})
.catch(err => {
  console.log(err);
})



