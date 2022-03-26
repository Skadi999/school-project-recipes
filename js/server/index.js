const express = require('express');
require('./mongodb');
const Recipe = require('./model/recipe')

const app = express();
const port = 3000;
app.use(express.json())


var recipeInstance = new Recipe(
  {
    name: 'test recipe',
    description: 'description of test recipe',
    imageURL: 'asfas',
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

app.post('/recipes', (req, res) => {
  console.log(req.body);

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
      res.send(recipes)
    })
    .catch((e) => {
      res.status(500).send()
    })
})

app.get('/recipe/:recipeId', (req,res) => {
  const recipeID = req.params.recipeId;
  Recipe.findById(recipeID)
  .then((recipe) => {
    if (!recipe) {
      return res.status(404).send();
    }
    res.send(recipe)
  })
  .catch((e) => {
    res.status(500).send();
  })
})

app.get('/', (req, res) => {
  console.log("test");
  res.send('hello world');
})

app.listen(port, () => { console.log(`listening on port: ${port}`) })