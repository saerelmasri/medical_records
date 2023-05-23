const jwt = require('jsonwebtoken');
const MedicalInfo = require('../Models/medicalInfo.model')
const User = require('../Models/user.model')

//Post
const addInfo = async(req, res) => {
    const token = req.header('Authorization')
    try{
        if(!token){
            return res.status(401).json({
                status: 401,
                message: 'Unauthorized'
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        const userId = decoded.id

        const {medicalCondition, allergic, medications } = req.body;

        const medicalInfo = new MedicalInfo();
        medicalInfo.patient_id = userId
        medicalInfo.medical_conditions = medicalCondition;
        medicalInfo.allergic = allergic;
        medicalInfo.medications = medications;
        await medicalInfo.save()

        return res.status(201).json({
            status: 201,
            message: 'Info added successfully'
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            status: 500,
            message: 'An error occurred while adding the information.'
        })
    }
}

// //Get
const getPatients = async(req, res) => {
    try{
        const allPatients = await User.find({ userType: 1 }, 'id full_name');
        return res.status(201).json({
            status: 201,
            message: 'Success',
            patients: allPatients
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 500,
            message: 'Error fetching patients from database'
        });
    }
}

// //Get by ID
const getPatientInfoById = async(req, res) => {
    try{
        const token = req.header('Authorization');
        const decoded = await jwt.verify(token, process.env.JWT_KEY);
        const userId = decoded.id;

        const { column } = req.body;
        const patientRecord = await MedicalInfo.find({patient_id: userId}, column)

        return res.status(201).json({
            status: 201,
            message:'Success',
            patient: decoded.name,
            records: patientRecord
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 500,
            message: 'Error fetching information for this user'
        })
    }
}

//Update
const updateRecordsWthPatientRole = async(req, res) => {
    try{
        const token = req.header('Authorization');
        const decoded = await jwt.verify(token, process.env.JWT_KEY);
        const userId = decoded.id

        //const { recordID, column, newData } = req.body;
        const { recordID, column, newData } = req.body;
        const updatedRecord = await MedicalInfo.updateOne(
            { _id: recordID },
            { $set: { [column]: newData } }
        );
        if (updatedRecord.nModified === 0) {
            return res.status(404).json({
                status: 404,
                message: 'Record not found or no changes made'
            });
        }
    
        return res.status(201).json({
            status: 201,
            message: 'Record updated successfully'
        })
        
    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 500,
            message: 'Error updating record'
        });
    }
}

// //Update
// const updateUserIdWithDoctorRole = (req, res) => {

// }


module.exports = {
    addInfo,
    getPatients,
    getPatientInfoById,
    updateRecordsWthPatientRole
}