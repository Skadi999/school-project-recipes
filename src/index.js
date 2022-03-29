const path = require('path')
const express = require('express');
require('./mongodb');
const Recipe = require('./model/recipe')

const app = express();
const port = 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const hbs = require('hbs')
app.set('view engine', 'hbs')

app.use(express.static(path.join(__dirname, '../public')));

const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

// let arr = [5, 4, 3, 1, 8, 9, 7, 35, 66, 11];
// let newArr = convertTo2DArray(arr);
// console.log(newArr);

// Recipe.find({})
// .then((recipes) => {
//   console.log(recipes);
// })

app.get('/newrecipe', (req, res) => {
  res.render('newrecipe.hbs', {
  })
})

app.post('/newrecipe', (req, res) => {
  console.log(req.body);
  console.log(req.body.name);
  res.send(req.body)
  // console.log(JSON.parse(req.body));
  // res.redirect('')

  // const recipe = new Recipe(req.body)

  // recipe.save().then(() => {
  //     res.status(201).send(recipe)
  // }).catch((e) => {
  //     res.status(400).send(e)
  // })
})

app.get('/allrecipes', (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      setShortDescriptionForAllElements(recipes);
      let twoDRecipes = convertTo2DArray(recipes);
      res.render('recipes.hbs', {
        twoDRecipes: twoDRecipes
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
        ingredients: recipe.ingredients
      })
    })
    .catch((e) => {
      res.status(500).send();
    })
})

app.get('', (req, res) => {
  console.log('rendered');
  res.render('index.hbs', {})
})

app.listen(port, () => { console.log(`listening on port: ${port}`) })