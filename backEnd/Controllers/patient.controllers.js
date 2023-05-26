const jwt = require('jsonwebtoken');
const User = require('../Models/user.model')
const MedicalCondition = require('../Models/medicalCondition.model')
const Allergic = require('../Models/allergic.model')
const Medications = require('../Models/medications.model')
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

        const { tableName, record } = req.body;

        if(tableName === 'MedicalCondition'){
            const medical_condition = new MedicalCondition();
            medical_condition.patient_id = userId;
            medical_condition.record = record;
            await medical_condition.save();
        }else if(tableName === 'Allergic'){
            const allergicCondition = new Allergic();
            allergicCondition.patient_id = userId;
            allergicCondition.record = record;
            await allergicCondition.save();
        }else if(tableName === 'Medications'){
            const medicationCondition = new Medications();
            medicationCondition.patient_id = userId;
            medicationCondition.record = record;
            await medicationCondition.save();
        }

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
        if(!token){
            return res.status(401).json({
                status: 401,
                message: 'Unauthorized'
            })
        }
        const decoded = await jwt.verify(token, process.env.JWT_KEY);
        const userId = decoded.id;

        var records = "";
        const { tableName } = req.body;

        if(tableName === 'MedicalCondition'){
            records = await MedicalCondition.find({patient_id: userId})
        }else if(tableName === 'Allergic'){
            records = await Allergic.find({patient_id: userId})
        }else if(tableName === 'Medications'){
            records = await Medications.find({patient_id: userId})
        }

        return res.status(201).json({
            status: 201,
            message: records
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            status: 500,
            message: 'Error fetching information for this user'
        })
    }
}

const fetchUserById = async (req, res) => {
    try {
      const {userId, tableName} = req.body;
      let records;
  
      if (tableName === 'MedicalCondition') {
        records = await MedicalCondition.find({ patient_id: userId }).exec();
      } else if (tableName === 'Allergic') {
        records = await Allergic.find({ patient_id: userId }).exec();
      } else if (tableName === 'Medications') {
        records = await Medications.find({ patient_id: userId }).exec();
      }
  
      return res.status(201).json({
        status: 201,
        message: records
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 500,
        message: 'Error',
      });
    }
};

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
//Update
const updateRecords = async (req, res) => {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return res.status(401).json({
          status: 401,
          message: 'Unauthorized'
        });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_KEY);
      const userType = decoded.type;
      const userId = decoded.id;
  
      const { patientId, recordID, tableName, newData } = req.body;
      let existingRecord;
      let updatedRecord;
  
      if (userType === 1) {
        // Patient role
        if (tableName === 'MedicalCondition') {
          await MedicalCondition.findOneAndUpdate({ _id: recordID, patient_id: userId }, { $set: { record: newData } });
          updatedRecord = await MedicalCondition.findOne({ _id: recordID }).exec();
        } else if (tableName === 'Allergic') {
          await Allergic.findOneAndUpdate({ _id: recordID, patient_id: userId }, { $set: { record: newData } });
          updatedRecord = await Allergic.findOne({ _id: recordID }).exec();
        } else if (tableName === 'Medications') {
          await Medications.findOneAndUpdate({ _id: recordID, patient_id: userId }, { $set: { record: newData } });
          updatedRecord = await Medications.findOne({ _id: recordID }).exec();
        }
  
        if (!updatedRecord) {
          return res.status(404).json({
            status: 404,
            message: 'Record not found or no changes made'
          });
        }
  
        return res.status(201).json({
          status: 201,
          message: updatedRecord
        });
      } else if (userType === 2) {
        // Doctor role
        if (tableName === 'MedicalCondition') {
          existingRecord = await MedicalCondition.findById(recordID, '-_id -time -patient_id -__v');
          await MedicalCondition.findOneAndUpdate({ _id: recordID, patient_id: patientId }, { $set: { record: newData } });
          updatedRecord = await MedicalCondition.findOne({ _id: recordID }, "-_id -patient_id -__v").exec();
        } else if (tableName === 'Allergic') {
          existingRecord = await Allergic.findById(recordID, '-_id -time -patient_id -__v');
          await Allergic.findOneAndUpdate({ _id: recordID, patient_id: patientId }, { $set: { record: newData } });
          updatedRecord = await Allergic.findOne({ _id: recordID }, "-_id -patient_id -__v").exec();
        } else if (tableName === 'Medications') {
          existingRecord = await Medications.findById(recordID, '-_id -time -patient_id -__v');
          await Medications.findOneAndUpdate({ _id: recordID, patient_id: patientId }, { $set: { record: newData } });
          updatedRecord = await Medications.findOne({ _id: recordID }, "-_id -patient_id -__v").exec();
        }
  
        const findEmail = await User.findById(patientId);
        const patientEmail = findEmail.email;
  
        const emailContent = `Dear user, your records have been updated. Please review the changes. 
          \nThe following record was updated, old record: ${existingRecord}.
          \nAnd the new records are: ${updatedRecord}.`;
  
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
          newRecord: updatedRecord
        });
      } else {
        return res.status(409).json({
          status: 409,
          message: "You don't have access to this action"
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 500,
        message: 'Error updating record'
      });
    }
  };
  

const deleteRecord = async (req, res) => {
    try {
      const token = req.header('Authorization');
      if (!token) {
        return res.status(409).json({
          status: 409,
          message: 'Unauthorized',
        });
      }
  
      const { recordId, tableName } = req.body;
  
      if (!recordId || !tableName) {
        return res.status(400).json({
          status: 400,
          message: 'Missing recordId or tableName',
        });
      }
  
      let deletionResult;
  
      if (tableName === 'MedicalCondition') {
        deletionResult = await MedicalCondition.findByIdAndRemove(recordId);
      } else if (tableName === 'Allergic') {
        deletionResult = await Allergic.findByIdAndRemove(recordId);
      } else if (tableName === 'Medications') {
        deletionResult = await Medications.findByIdAndRemove(recordId);
      }
  
      if (!deletionResult) {
        return res.status(404).json({
          status: 404,
          message: 'Record not found',
        });
      }
  
      return res.status(200).json({
        status: 200,
        message: 'Deleted',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: 500,
        message: 'Error deleting the record',
      });
    }
};


module.exports = {
    addInfo,
    getPatients,
    getPatientInfoById,
    updateRecords,
    deleteRecord,
    fetchUserById
}