// src/routes.js

const CoffeeController = require('./controllers/CoffeeController')
const UserController = require('./controllers/UserController')
const UserAuthenController = require('./controllers/UserAuthenController')
const isAuthenController = require('./controllers/isAuthenController')

module.exports = (app) => {

  // ===============================
  // Auth Routes
  // ===============================
  app.post('/login', UserAuthenController.login)
  app.post('/register', UserAuthenController.register)

  // ===============================
  // Users Routes (ต้อง login ก่อน)
  // ===============================
  app.get('/users', isAuthenController, UserController.index)
  app.get('/user/:userId', isAuthenController, UserController.show)
  app.post('/user', isAuthenController, UserController.create)
  app.put('/user/:userId', isAuthenController, UserController.put)
  app.delete('/user/:userId', isAuthenController, UserController.remove)

  // ===============================
  // Coffee Routes
  // ===============================
  app.get('/coffees', CoffeeController.index)
  app.post('/coffee', isAuthenController, CoffeeController.create)
  app.put('/coffee/:coffeeId', isAuthenController, CoffeeController.put)
  app.delete('/coffee/:coffeeId', isAuthenController, CoffeeController.remove)
  app.get('/coffee/:coffeeId', CoffeeController.show)
}
