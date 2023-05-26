const { Router } = require('express');
const router = Router();
const { addInfo, getPatients, getPatientInfoById, updateRecords, deleteRecord, fetchUserById } = require('../Controllers/patient.controllers');

router.post('/addInfo', addInfo);
router.get('/patients', getPatients);
router.post('/fetchUserById', fetchUserById);
router.post('/patientById', getPatientInfoById);
router.put('/updateRecords', updateRecords);
router.delete('/deleteRecord',deleteRecord);

module.exports = router;