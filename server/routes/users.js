var express = require('express');
var router = express.Router();
const usersControllers = require("../controllers/usersControllers")

/* GET users listing. */

//ruta base http://localhost:3000/users
router.get('/', usersControllers.getAllUsers);
router.post('/createuser', usersControllers.createUser);

module.exports = router;
