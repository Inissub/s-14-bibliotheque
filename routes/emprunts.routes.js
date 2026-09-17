const express = require('express');
const router = express.Router();
const {creerEmprunt,updateEmprunt, tousEmprunts} = require('../controllers/emprunts.controller');

router.get('/', tousEmprunts)
router.post('/', creerEmprunt);
router.patch('/:id', updateEmprunt);
module.exports = router;