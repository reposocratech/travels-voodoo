const express = require('express');
const travelsController = require('../controllers/travelsController');
const multerMulti = require('../middleware/multerMulti')


const router = express.Router();

//ruta base http://localhost:3000/travels/
router.post('/createtravel', multerMulti("travels"), travelsController.createTravel)
router.get('/getpicsonetravel/:travel_id', travelsController.getPicsOneTravel)
router.put('/edittravel', travelsController.editTravel)
router.put('/deltravel/:travel_id', travelsController.delTravel)
router.put('/addPics/:travel_id', multerMulti("travels"), travelsController.addPics)
router.put('/delpic/:picture_id', travelsController.delPic)
module.exports = router;