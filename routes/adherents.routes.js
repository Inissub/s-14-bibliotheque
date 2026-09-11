const express = require('express');
const router = express.Router();
const {tousAdherents, newAdherent, updateAdhrent, deleteAdherent} = require('../controllers/adherents.controller');

router.get('/', tousAdherents);
router.post('/', newAdherent);
router.put('/:id', updateAdhrent);
router.delete('/:id', deleteAdherent);
module.exports = router;