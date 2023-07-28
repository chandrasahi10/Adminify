const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
const foodController = require('../controllers/foodController');
const skinController = require('../controllers/skinController');
const electronicsController = require('../controllers/electronicsController');

router.get('/', homeController.view);
router.post('/', homeController.find);

router.get('/adduser', homeController.form);
router.post('/adduser', homeController.create);

router.get('/edituser/:Id', homeController.edit);
router.post('/edituser/:Id', homeController.update);

router.get('/:Id', homeController.delete);

router.get('/food', foodController.view);
router.post('/food', foodController.find);

router.get('/adduser', foodController.form);
router.post('/adduser', foodController.create);

router.get('/edituser/:Id', foodController.edit);
router.post('/edituser/:Id', foodController.update);

router.get('/:Id', foodController.delete);

router.get('/skin', skinController.view);
router.post('/skin', skinController.find);

router.get('/adduser', skinController.form);
router.post('/adduser', skinController.create);

router.get('/edituser/:Id', skinController.edit);
router.post('/edituser/:Id', skinController.update);

router.get('/:Id', skinController.delete);

router.get('/elec', electronicsController.view);
router.post('/elec', electronicsController.find);

router.get('/adduser', electronicsController.form);
router.post('/adduser', electronicsController.create);

router.get('/edituser/:Id', electronicsController.edit);
router.post('/edituser/:Id', electronicsController.update);

router.get('/:Id', electronicsController.delete);


module.exports = router;