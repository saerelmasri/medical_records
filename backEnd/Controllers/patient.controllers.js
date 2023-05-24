const jwt = require('jsonwebtoken');
const MedicalInfo = require('../Models/medicalInfo.model')
const User = require('../Models/user.model')
const nodemailer = require('nodemailer');

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


const sendNotificationEmail = async (recipient, subject, content) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'saer1890@gmail.com',
          pass: 'ulicngqhgcmkjkrh',
        },
      });
  
      await transporter.sendMail({
        from: 'Test',
        to: recipient,
        subject: subject,
        text: content,
      });
  
      console.log('Email notification sent successfully');
    } catch (error) {
      console.error('Error sending email notification:', error);
    }
  };
// //Update
const updateUserIdWithDoctorRole = async(req, res) => {
    try{
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const type = decoded.type;


        if(type !== 2){
            return res.status(409).json({
                status: 409,
                message: "You don't have access to this action"
            });
        }

        const {patientId, recordID, column, newData} = req.body;
        const existingRecord = await MedicalInfo.findById(recordID, '-_id -time -patient_id -__v');

        const findEmail = await User.findById(patientId);
        const patientEmail = findEmail.email;
        const updatedRecord = await MedicalInfo.updateOne(
            { _id: recordID , patient_id: patientId},
            { $set: { [column]: newData } }
        );

        if (updatedRecord.nModified === 0) {
            return res.status(404).json({
                status: 404,
                message: 'Record not found or no changes made'
            });
        }
        const updatedRecords = await MedicalInfo.findById(recordID, '-_id -time -patient_id -__v');
        const emailContent = `Dear user, your records have been updated. Please review the changes. 
            \nThe following record was updated, old record: ${existingRecord}.
            \nAnd the new records are: ${updatedRecords}.`;
        const emailSent = await sendNotificationEmail(patientEmail, 'Record Update Notification', emailContent);
        if (!emailSent) {
            return res.status(500).json({
              status: 500,
              message: 'Error sending email notification'
            });
          }
          
          return res.status(201).json({
            status: 201,
            message: decoded,
            change: 'Email notification sent successfully',
            oldRecord: existingRecord,
            newRecord: updatedRecords
          });

    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 500,
            message: 'Error updating record'
        });
    }
}


module.exports = {
    addInfo,
    getPatients,
    getPatientInfoById,
    updateRecordsWthPatientRole,
    updateUserIdWithDoctorRole
}