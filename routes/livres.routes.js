const express = require('express');
const router = express.Router();
const {tousLivres, creerLivre,   updateLivre} = require('../controllers/livres.controller')

router.get('/', tousLivres);
router.post('/', creerLivre);
router.put('/:id',  updateLivre);

module.exports = router;