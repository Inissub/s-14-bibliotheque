const express = require('express');
const router = express.Router();
const { tousStats} = require('../controllers/statistiques.controller');

router.get('/', tousStats);

module.exports = router;