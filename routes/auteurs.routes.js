const express = require('express');
const router = express.Router();
const {tousAuteurs, newAuteur, updateAuteur, deleteAuteur} = require('../controllers/auteurs.controller');


router.get('/', tousAuteurs);
router.post('/', newAuteur);
router.put('/:id', updateAuteur);
router.delete('/:id', deleteAuteur);


module.exports = router;