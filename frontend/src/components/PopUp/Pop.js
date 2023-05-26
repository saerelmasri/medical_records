import { useState } from 'react';
import './Pop.css'
import axios from 'axios';
import Toastify from 'toastify-js';

const PopUp = ({trigger, setTrigger, id, name, table, patientId}) => {
    const [ newRecord, setNewRecord ] = useState('');

    const editRecord = async() => {
        await axios({
            method: 'PUT',
            url: 'http://localhost:5000/V1/patient/updateRecords',
            data: {
                "patientId": patientId,
                "recordID": id,
                "tableName": table,
                "newData": newRecord
            },
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            alertSuccess('Record updated successfully')
            setInterval(() => {
                setTrigger(false);
                window.location.reload();
            }, 2000)
        }).catch(err => {
            alertFail('Something went wrong')
        })
    }

    const deleteRecord = async() => {
        await axios({
            method: 'DELETE',
            url: 'http://localhost:5000/V1/patient/deleteRecord',
            data: {
                "recordId": id,
                "tableName": table
            },
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            alertSuccess('Deleted Successfully')
            setInterval(() => {
                setTrigger(false);
                window.location.reload();
            }, 2000)
        }).catch((err) => {
            alertFail('Something went wrong')
        })
    }
    
    return(trigger) ? (
        <div className="canvas">
            <div className='inner-pop'>
                <h1>{name}</h1>
                <h4 className='close' onClick={() => setTrigger(false)}>Close</h4>
                <div className='editForm'>
                    <label>Old Record</label>
                    <div className='oldRecord'>
                        <h3>{name}</h3>
                    </div>
                    <label>New Record</label>
                    <br/>
                    <input className='newRecord' placeholder='New Record' type='text' value={newRecord} onChange={(e) => setNewRecord(e.target.value)}/>
                </div>
                <button className='btn' onClick={editRecord}>Edit Record</button>
                <button className='btn' onClick={deleteRecord}>Remove Record</button>

            </div>
            
        </div>
    ) : "";
}

const alertFail = (message) => {
    Toastify({
        text: message,
        duration: 3000,
        close: false,
        style: {
          background: "red",
          color: 'white',
          textAlign: 'center'
        },
        onClick: function(){}
      }).showToast();
}
const alertSuccess = (message) => {
    console.log(message);
    Toastify({
      text: message,
      duration: 5000,
      close: false,
      style: {
        background: "green",
        color: 'white',
        textAlign: 'center'
      }, // Adjust as per your needs
    }).showToast();
};


export default PopUp
