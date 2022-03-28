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


var recipeInstance = new Recipe(
  {
    name: 'test recipe',
    description: 'description of test recipe',
    imageURL: 'https://pbs.twimg.com/profile_images/1234959911777439745/PEZ9SInP_400x400.jpg',
    timeInMin: 3,
    difficulty: 'Easy',
    ingredients: ["ab", "bc"],
    steps: ["first do this", "then do that"]
  });

recipeInstance.save().then(() => {
  console.log(recipeInstance)
}).catch((error) => {
  console.log('Error!', error)
})

app.get('/newrecipe', (req, res) => {
  res.render('newrecipe.hbs', {
    title: 'new recipe'
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
      res.render('recipes.hbs', {
        title: "All Recipes",
        recipes: recipes
      })
      // res.send(recipes)
    })
    .catch((e) => {
      res.status(500).send()
    })
})

//todo render all recipes

app.get('/recipe/:recipeId', (req, res) => {
  const recipeID = req.params.recipeId;
  Recipe.findById(recipeID)
    .then((recipe) => {
      if (!recipe) {
        return res.status(404).send();
      }
      res.render('recipe.hbs', {
        title: "Recipe of new food",
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

// app.get('/recipe/:recipeId', (req,res) => {
//   const recipeID = req.params.recipeId;
//   Recipe.findById(recipeID)
//   .then((recipe) => {
//     if (!recipe) {
//       return res.status(404).send();
//     }
//     res.send(recipe)
//   })
//   .catch((e) => {
//     res.status(500).send();
//   })
// })

// app.get('/', (req, res) => {
//   console.log("test");
//   res.send('hello world');
// })

app.get('', (req, res) => {
  console.log('rendered');
  res.render('index.hbs', {
    title: 'New'
  })
})

app.listen(port, () => { console.log(`listening on port: ${port}`) })