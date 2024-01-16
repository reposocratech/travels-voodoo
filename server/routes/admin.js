const express = require('express');
const adminController = require('../controllers/adminController');

const router = express.Router();

//1.- trae los datos de todos los usuarios
//------------------------------------------
router.get("/getAllUsers", adminController.getAllUsers);

//2.- deshabilita un usuario
//--------------------------------------------
router.put("/disableUser/:id", adminController.disableUser);

//3.- habilita un usuario
//--------------------------------------------
router.put("/enableUser/:id", adminController.enableUser);

//4.- trae todas las fotos
//---------------------------
router.get("/getAllPics", adminController.getAllPics);


//5.- deshabilita un fotos
//--------------------------------------------
router.put("/disablePic/:id", adminController.disablePic);


//6.- habilita un fotos
//--------------------------------------------
router.put("/enablePic/:id", adminController.enablePic);


module.exports = router;