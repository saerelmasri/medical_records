const { Router } = require('express');
const router = Router();
const { addInfo, getPatients, getPatientInfoById, updateRecordsWthPatientRole, updateUserIdWithDoctorRole } = require('../Controllers/patient.controllers');

router.post('/addInfo', addInfo);
router.get('/patients', getPatients);
router.get('/patientById', getPatientInfoById);
router.put('/updateRecords', updateRecordsWthPatientRole);
router.put('/updateRecordsAsDoctor', updateUserIdWithDoctorRole);

module.exports = router;