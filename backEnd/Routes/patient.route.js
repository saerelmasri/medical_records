const { Router } = require('express');
const router = Router();
const { addInfo, getPatients } = require('../Controllers/patient.controllers');

router.post('/addInfo', addInfo);
router.get('/patients', getPatients);

module.exports = router;