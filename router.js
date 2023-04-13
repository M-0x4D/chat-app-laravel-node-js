const express = require('express');
meals = require('./Controllers/MealsController')
const app = express();
const router = express.Router();


router.get('/' , (req, res) => {
    res.render('');
    });


router.get('/test' , meals.testFunc);