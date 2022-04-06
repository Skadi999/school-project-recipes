//Used to generate initial recipes and users
const User = require('../src/model/user')
const Recipe = require('../src/model/recipe')

function generateDefaultUsersIfNotPresent() {
  const user = new User(
    {
      username: "qwerty",
      password: "12345"
    })

  User.findOne({ 'name': user.name }, function (err, foundUser) {
    if (!foundUser) {
      user.save().then(() => {
        console.log(user)
      }).catch((error) => {
        console.log('Error!', error)
      })
    }
  })
}

function generateDefaultRecipesIfNotPresent() {
  const recipe1 = new Recipe(
    {
      name: "Beef Minced Meat with Pasta",
      description: "Easy to make pasta with beef minced meat.",
      imageURL: "https://live.staticflickr.com/65535/49222692673_cd6d61d255_b.jpg",
      timeInMin: 20,
      difficulty: 'Easy',
      ingredients: [
        '300g Pasta',
        '600g Beef',
        '2 tablespoons Tomato Paste',
        '2 tablespoons Oil',
        '1 Onion',
        'Some Salt'
      ],
      steps: [
        'Cook the pasta according to the instructions on its package.',
        'Dice the onions, heat up the oil on a pan and sauté the onion. Then, break the ground beef into pieces and cook it on the pan for 10-12 min.',
        'Add salt and the tomato paste, stir it and cook for 1 min.',
      ],
      author: 'qwerty'
    }
  )
  const recipe2 = new Recipe(
    {
      name: "Pork Cutlets",
      description: "Tasty cutlets that you can eat with mashed potatoes or rice.",
      imageURL: "https://2d-recept.com/wp-content/uploads/2020/11/kotlety-iz-farsha-na-skovorode.jpg",
      timeInMin: 20,
      difficulty: 'Medium',
      ingredients: [
        '1kg Minced Meat',
        '1 Onion',
        '1 Egg',
        'Oil',
        'Salt and pepper',
        '300g Aged White Bread',
      ],
      steps: [
        'Dice the onion',
        'Soak the bread in water, squeeze out the water from it and add it to the meat',
        'Break the egg and spill it into the meat',
        'Add salt and pepper and knead the meat',
        'Add oil to pan, heat it up, form cutlets out of the meat and put it into the pan. Fry for 7-8 min.'
      ],
      author: 'qwerty'
    }
  )
  const recipe3 = new Recipe(
    {
      name: "Chicken Curry",
      description: "A delicious recipe made in only 30 min best served with rice",
      imageURL: "https://live.staticflickr.com/4060/4652719000_540345d301_b.jpg",
      timeInMin: 30,
      difficulty: 'Medium',
      ingredients: [
        'few pieces of Chicken Thighs',
        '1 Onion',
        '1 Bell Pepper',
        'Oil',
        'Salt ',
        '200g Curry',
        '200g Sour Cream',
      ],
      steps: [
        'Clean the thighs of bones and skin, cut into small pieces.',
        'Dice the onion and sauté on the oil until its slightly golden.',
        'Add the meat, fry for 5-7 min.',
        'Dice and add the bell peppers.',
        'Add salt and braise for 5 min.',
        'Add curry to the sour cream and mix it, add the resulting sauce into the pan and braise for 5 min. Add a little water if needed.',
        'After the meal is ready, turn off the stove and let it stay for 10 min.'
      ],
      author: 'qwerty'
    }
  )

  Recipe.findOne({ 'name': recipe1.name }, function (err, foundRecipe) {
    if (!foundRecipe) {
      recipe1.save().then(() => {
        console.log(recipe1)
      }).catch((error) => {
        console.log('Error!', error)
      })
    }
  })
  Recipe.findOne({ 'name': recipe2.name }, function (err, foundRecipe) {
    if (!foundRecipe) {
      recipe2.save().then(() => {
        console.log(recipe2)
      }).catch((error) => {
        console.log('Error!', error)
      })
    }
  })
  Recipe.findOne({ 'name': recipe3.name }, function (err, foundRecipe) {
    if (!foundRecipe) {
      recipe3.save().then(() => {
        console.log(recipe3)
      }).catch((error) => {
        console.log('Error!', error)
      })
    }
  })
}

module.exports = {
  generateDefaultUsers: generateDefaultUsersIfNotPresent,
  generateDefaultRecipes: generateDefaultRecipesIfNotPresent
};