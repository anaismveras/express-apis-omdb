require('dotenv').config(); //letting us use the .env file, should be in the .gitignore
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const axios = require('axios')
const methodOverride = require('method-override')
const app = express();

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);
// middleware needed method-override--allows to override methods with a query parameter
app.use(methodOverride('_method'))

// Adds some logging to each request
app.use(require('morgan')('dev'));

// Routes === controllers
app.get('/', function(req, res) {
  // console.log(axios)
  // res.send('Hello, backend!');
  // res.render serves up our ejs
  res.render('index.ejs')
});


// moved this to our router(controllers)
// // results route aka controller
// app.get('/results', (req, res)=> {
//   // used this console.log to check the reuqest object
//   console.log('this is req', req.query)
//   let movieTitle = req.query.movieTitle
//   console.log('this should be the movie title', movieTitle)
//   // now can use the movieTitle to build the request url, make the call with axios
//   axios.get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${process.env.OMDB_API_KEY}`)
//     .then(apiRes => {
//       console.log('this is api res.data', apiRes.data)
//       let title = apiRes.data.Title
//       let year = apiRes.data.Year
//       let plot = apiRes.data.Plot
//       let imdbID = apiRes.data.imdbID
//       let poster = apiRes.data.Poster

//       // res.render restults to results.ejs with our selected data as an object
//       res.render('results', {title, year, plot, imdbID, poster})

//     })
//     .catch(err => {
//       console.log(err)
//     })
// })

// revised in package.json from "start": "node server.js" to "start": "nodemon server.js"----line below for checking to see if nodmeon works after changing
// console.log('nodemon works?')

// call the router
app.use('/movies', require('./controllers/omdbRoutes'))
app.use('/faves', require('./controllers/faveRoutes'))

// sets the entry point to run our app/server
app.listen(process.env.PORT || 3000, ()=> {
  console.log(`Listening to the sweet sounds ${process.env.PORT} Time to make some request`)
})

// // The app.listen function returns a server handle
// var server = app.listen(process.env.PORT || 3000);

// // We can export this server to other servers like this
// // module.exports = server;
