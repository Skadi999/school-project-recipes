//todo delete and edit operations
//todo fix navbar links
const path = require('path')
const session = require('express-session')
const express = require('express');
require('./mongodb');
const Recipe = require('./model/recipe')
const User = require('./model/user')

const app = express();
const port = 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
  key: 'user_sid',
  secret: 'a2c34ojot34uc249c1i,c0945yp45kpbfldg',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30000
  }
}));

const hbs = require('hbs');
const { use } = require('express/lib/application');
const { request } = require('http');
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, '../public')));

const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

//exposes user obj in the template for every request
app.use((req, res, next) => {
  res.locals.user = req.session.user
  return next();
})

app.get('/newrecipe', (req, res) => {
  if (!req.session.user) {
    res.status(403).send('You must be logged in to create a new recipe.')
  } else {
    res.render('newrecipe.hbs', {
    })
  }

})

app.post('/newrecipe', (req, res) => {
  const recipe = new Recipe(req.body)

  recipe.save().then(() => {
    res.status(201).send(recipe)
  }).catch((e) => {
    res.status(400).send(e)
  })
})

app.get('/register', (req, res) => {
  if (req.session.user) {
    res.status(403).send('If you wish to create a new account, you must first log out.')
  }
  else {
    res.render('register.hbs', {
    })
  }
})

app.post('/register', (req, res) => {
  //Searches for the user with the reqbody username in the DB, returns 500 if finds
  //Then checks if PW and confirm PW match, if don't -> return 400
  //If both conditions are ok, creates user.
  User.findOne({ 'username': req.body.username }, function (err, foundUser) {
    if (foundUser) {
      res.status(500).send('Username taken.')
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
          res.status(400).send(e)
        })
    }
  })
})

app.get('/login', (req, res) => {
  if (req.session.user) {
    res.status(403).send('You are already logged in.')
  } else {
    res.render('login.hbs', {})
  }
})

app.post('/login', (req, res) => {
  User.findOne({ 'username': req.body.username, 'password': req.body.password }, function (err, foundUser) {
    if (foundUser) {
      req.session.user = { username: foundUser.username }
      // res.status(200).send('You are now logged in.');
      res.redirect('/')
    } else {
      res.status(401).send('Incorrect Credentials')
    }
  })
})

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/allrecipes');
});

//todo use if statement in hbs to change nav links
app.get('/allrecipes', (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      setShortDescriptionForAllElements(recipes);
      let twoDRecipes = convertTo2DArray(recipes);
      res.render('recipes.hbs', {
        twoDRecipes: twoDRecipes,
        user: req.session.user
      })
    })
    .catch((e) => {
      res.status(500).send()
    })
})

function convertTo2DArray(arr) {
  let rows = Math.ceil(arr.length / 3)
  let index = 0;
  let twoDArr = [];
  let rowArr = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < 3; col++) {
      if (arr[index] === undefined) break;
      rowArr.push(arr[index++]);
    }
    twoDArr.push(rowArr);
    rowArr = [];
  }
  return twoDArr;
}

//Converts text of more than 50 characters long to a 50 char long text with '...' at the end.
function setShortDescriptionForAllElements(arr) {
  arr.forEach(item => {
    item.description = getShortDescription(item.description)
  })
}

function getShortDescription(description) {
  if (description.length > 50) {
    return description.slice(0, 50) + '...';
  } else {
    return description;
  }
}

app.get('/recipe/:recipeId', (req, res) => {
  const recipeID = req.params.recipeId;
  Recipe.findById(recipeID)
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).send();
      }
      res.render('recipe.hbs', {
        name: recipe.name,
        description: recipe.description,
        image: recipe.imageURL,
        time: recipe.timeInMin,
        difficulty: recipe.difficulty,
        ingredients: recipe.ingredients,
        steps: recipe.steps
      })
    })
    .catch((e) => {
      res.status(500).send();
    })
})

app.get('', (req, res) => {
  res.render('index.hbs', {})
})

app.listen(port, () => { console.log(`listening on port: ${port}`) })