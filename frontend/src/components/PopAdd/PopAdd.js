import axios from 'axios';
import './PopAdd.css'
import Toastify from 'toastify-js';
import { useEffect, useState } from 'react';

const PopUpAdd = ({trigger, setTrigger, tableName}) => {
    const [ newRecord, setNewRecord ] = useState('');
    const [ JWT, setJWT ] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setJWT(token)
    }, [])


    const addRecord = () => {
        if(newRecord === ""){
            alertFail('New record is empty');
        }else{
            axios({
                method: 'POST',
                url: 'http://localhost:5000/V1/patient/addInfo',
                data: {
                    "tableName": tableName,
                    "record": newRecord
                },
                headers: {
                    Authorization: JWT
                }
            }).then((res) => {
                alertSuccess(res.data.message);
                setTimeout(() => {
                    setTrigger(false);
                    window.location.reload();
                }, 2000);
            }).catch((err) => {
                console.log(err);
                alertFail('Something went wrong')
            });
        }
        
    }
    return(trigger) ? (
        <div className="canvas">
            <div className='inner-pop'>
                <h1>Add New Record</h1>
                <h4 className='close' onClick={() => setTrigger(false)}>Close</h4>
                <div className='editForm'>
                    <label>New Record</label>
                    <br/>
                    <input className='newRecord' placeholder='New Record' type='text' value={newRecord} onChange={(e) => setNewRecord(e.target.value)}/>
                </div>
                <button className='btn' onClick={addRecord}>Add Record</button>
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

export default PopUpAdd
