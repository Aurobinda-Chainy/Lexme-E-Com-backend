const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleWares/authMiddleware');


router.post("/cart",auth, userController.cart);

module.exports = router;

