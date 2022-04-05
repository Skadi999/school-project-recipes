const express = require('express');
const User = require('../model/user')
const router = new express.Router()
const bcrypt = require('bcryptjs')


//Changes a user's password.
router.put('/editaccount', (req, res) => {
  User.findOne({ 'username': req.session.user.username }, function (err, foundUser) {
    if (!foundUser) {
      res.status(404).send('User not found.')
      return;
    }
    if (req.body.password !== req.body.confirmPW) {
      res.status(400).send('Passwords do not match.')
      return;
    }
    foundUser.password = req.body.password;
    foundUser.save()
      .then(() => {
        res.status(204)
        res.redirect('/myaccount')
      })
      .catch((e) => {
        console.log(`Error on POST /editaccount: ${e}`);
        res.status(500)
        res.redirect('/')
      })
  })
})

//Renders the edit account page
router.get('/editaccount', (req, res) => {
  if (!req.session.user) {
    res.status(401).send('You must be logged in to view your account.')
    return;
  }
  User.findOne({ 'username': req.session.user.username }, function (err, foundUser) {
    if (!foundUser) {
      res.status(404).send('User not found')
      return;
    }
    res.render('editaccount.hbs', {
      id: foundUser._id,
      username: foundUser.username,
    })
  })
})

//Renders the user's profile page
router.get('/myaccount', (req, res) => {
  if (!req.session.user) {
    res.status(401).send('You must be logged in to view your account.')
  } else {
    res.render('myaccount.hbs', {})
  }
})

//Renders the registration page
router.get('/register', (req, res) => {
  if (req.session.user) {
    res.status(400).send('If you wish to create a new account, you must first log out.')
  }
  else {
    res.render('register.hbs', {
    })
  }
})

//Creates a new user account
router.post('/register', (req, res) => {
  //Searches for the user with the reqbody username in the DB, returns 400 if finds
  //Then checks if PW and confirm PW match, if don't -> return 400
  //If both conditions are ok, creates user.
  User.findOne({ 'username': req.body.username }, function (err, foundUser) {
    if (foundUser) {
      res.status(400).send('Username taken.')
    }
    else if (req.body.password !== req.body.confirmPassword) {
      res.status(400).send('Passwords do not match.')
    } else {
      const user = new User(req.body)
      user.save()
        .then(() => {
          req.session.user = { username: req.body.username }
          res.status(201).send(user)
        })
        .catch((e) => {
          console.log(`Error on POST /register: ${e}`);
          res.status(500)
          res.redirect('/')
        })
    }
  })
})

//Renders the login page
router.get('/login', (req, res) => {
  if (req.session.user) {
    res.status(400).send('You are already logged in.')
  } else {
    res.render('login.hbs', {})
  }
})

//Signs in. Uses bcrypt to hash passwords.
router.post('/login', async (req, res) => {
  const body = req.body;
  const user = await User.findOne({ 'username': req.body.username });
  if (user) {
    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (isPasswordValid) {
      req.session.user = { username: user.username }
      res.redirect('/')
    } else {
      res.status(401).send('Incorrect Credentials')
    }
  }
})

//Logs out.
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router