const express = require('express');
const travelsController = require('../controllers/travelsController');
const multerMulti = require('../middleware/multerMulti')


const router = express.Router();

//ruta base http://localhost:3000/travels/
router.post('/createtravel', multerMulti("travels"), travelsController.createTravel)

module.exports = router;