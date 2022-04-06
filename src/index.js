//todo install bodyparser - maybe not needed
//todo replace res.send with redirects and TEST
//merge "return;" with res.send???
const path = require('path')
const session = require('express-session')
const express = require('express');
require('./mongodb');
const userRouter = require('./routers/user')
const recipeRouter = require('./routers/recipe')
const methodOverride = require('method-override');
const Defaults = require('./defaults')

const app = express();
const port = 3000;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'));

app.use(session({
  key: 'user_sid',
  secret: 'a2c34ojot34uc249c1i,c0945yp45kpbfldg',
  resave: false,
  saveUninitialized: false,
  cookie: {
  }
}));

const hbs = require('hbs');
app.set('view engine', 'hbs')

hbs.registerHelper("plusOne", function (value, options) {
  return parseInt(value) + 1;
});

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
Defaults.generateDefaultUsers();
Defaults.generateDefaultRecipes();

app.use(userRouter)
app.use(recipeRouter)

//Render homepage
app.get('', (req, res) => {
  res.render('index.hbs', {})
})

app.listen(port, () => { console.log(`listening on port: ${port}`) })