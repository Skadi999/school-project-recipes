const express = require('express');
const Recipe = require('../model/recipe')
const router = new express.Router()

//Delete a recipe by its id.
router.delete('/deleterecipe/:recipeId', (req, res) => {
  const recipeID = req.params.recipeId;
  Recipe.findOneAndDelete({ _id: recipeID })
    .then(function () {
      res.status(204)
      res.redirect('/myrecipes')
    })
    .catch(function (e) {
      console.log(`Error on DELETE /deleterecipe: ${e}`);
      res.status(500)
      res.redirect('/')
    });
})

//Edits a recipe by its id.
router.put('/editrecipe/:recipeId', (req, res) => {
  const recipeID = req.params.recipeId;
  Recipe.findById(recipeID)
    .then((recipe) => {
      recipe.name = req.body.name
      recipe.description = req.body.description
      recipe.imageURL = req.body.imageURL
      recipe.timeInMin = req.body.timeInMin
      recipe.difficulty = req.body.difficulty
      recipe.ingredients = req.body.ingredients
      recipe.steps = req.body.steps
      recipe.save()
        .then(() => {
          res.status(201)
          res.redirect('/myrecipes')
        }).catch((e) => {
          console.log(`Error on POST /editrecipe: ${e}`);
          res.status(500)
          res.redirect('/')
        })
    })
})

//Renders the recipe editing page
router.get('/editrecipe/:recipeId', (req, res) => {
  const recipeID = req.params.recipeId;
  Recipe.findById(recipeID)
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).send('Recipe not found');
      }
      //for ingredients and steps, create array with #each and fill value of input with {{this}}
      res.render('editrecipe.hbs', {
        id: recipe._id,
        name: recipe.name,
        description: recipe.description,
        imageURL: recipe.imageURL,
        timeInMin: recipe.timeInMin,
        difficulty: recipe.difficulty,
        ingredients: recipe.ingredients,
        steps: recipe.steps
      })
    })
    .catch((e) => {
      console.log(`Error on GET /editrecipe: ${e}`);
      res.status(500)
      res.redirect('/')
    })
})

//Renders recipes created by the logged in user
router.get('/myrecipes', (req, res) => {
  Recipe.find({ 'author': req.session.user.username })
    .then((recipes) => {
      setShortDescriptionForAllElements(recipes);
      let twoDRecipes = convertTo2DArray(recipes);
      res.render('myrecipes.hbs', {
        twoDRecipes: twoDRecipes,
      })
    })
    .catch((e) => {
      console.log(`Error on GET /myrecipes: ${e}`);
      res.status(500)
      res.redirect('/')
    })
})

//Renders a page where a user may create a new recipe
router.get('/newrecipe', (req, res) => {
  if (!req.session.user) {
    res.status(401).send('You must be logged in to create a new recipe.')
  } else {
    res.render('newrecipe.hbs', {})
  }
})

//Creates a new recipe
router.post('/newrecipe', (req, res) => {
  if (!req.session.user) {
    res.status(401).send('You must be logged in to create a new recipe.')
    return;
  }
  let recipeJson = req.body;
  recipeJson.author = req.session.user.username;
  const recipe = new Recipe(recipeJson)

  recipe.save().then(() => {
    res.redirect('/allrecipes')
  }).catch((e) => {
    console.log(`Error on POST /newrecipe: ${e}`);
    res.status(500)
    res.redirect('/')
  })
})

//Renders a page that contains every single recipe.
router.get('/allrecipes', (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      setShortDescriptionForAllElements(recipes);
      let twoDRecipes = convertTo2DArray(recipes);
      res.render('recipes.hbs', {
        twoDRecipes: twoDRecipes,
      })
    })
    .catch((e) => {
      console.log(`Error on GET /allrecipes: ${e}`);
      res.status(500)
      res.redirect('/')
    })
})

//Renders a single recipe.
router.get('/recipe/:recipeId', (req, res) => {
  const recipeID = req.params.recipeId;
  Recipe.findById(recipeID)
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).send('Recipe not found.');
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
      console.log(`Error on GET /recipe: ${e}`);
      res.status(500)
      res.redirect('/')
    })
})

//Converts a 1-dimensional array to a 2-dimensional one
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

//Converts text of more than 50 characters long to a 50 char long text with '...' at the end.
function getShortDescription(description) {
  if (description.length > 50) {
    return description.slice(0, 50) + '...';
  } else {
    return description;
  }
}

module.exports = router