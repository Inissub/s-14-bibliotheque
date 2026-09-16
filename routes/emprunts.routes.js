const express = require('express');
const router = express.Router();
const {creerEmprunt,updateEmprunt} = require('../controllers/emprunts.controller');

router.post('/', creerEmprunt);
router.patch('/:id', updateEmprunt);
module.exports = router;