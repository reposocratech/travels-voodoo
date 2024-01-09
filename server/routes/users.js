var express = require('express');
var router = express.Router();
const usersControllers = require("../controllers/usersControllers")

/* GET users listing. */

//ruta base http://localhost:3000/users
router.get('/', usersControllers.getAllUsers);
router.post('/createuser', usersControllers.createUser);
router.post('/login', usersControllers.login);
router.get('/oneuser/:id', usersControllers.oneUser)

module.exports = router;
