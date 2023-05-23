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
// const getPatientInfoById = (req, res) => {

// }

// //Update
// const updateById = (req, res) => {

// }

module.exports = {
    addInfo,
    getPatients,
}