var express = require('express');
var router = express.Router();
const usersControllers = require("../controllers/usersControllers")
const multerSingle = require("../middleware/multerSingle")

/* GET users listing. */

//ruta base http://localhost:3000/users
router.get('/', usersControllers.getAllUsers);
router.post('/createuser', usersControllers.createUser);
router.post('/login', usersControllers.login);
router.get('/oneuser/:id', usersControllers.oneUser)
router.put('/edituser', multerSingle("users") ,usersControllers.editUser)

module.exports = router;
