import { useEffect, useState } from 'react';
import PopUp from '../PopUp/Pop';
import './RecordStyle.css'
import PopUpAdd from '../PopAdd/PopAdd';
import axios from 'axios';


const Records = ({recordName, tableName, id}) => {
    const [ btnPop, setBtnPop ] = useState(false);
    const [ btnPopAdd, setBtnPopAdd ] = useState(false);
    const [ recordId, setRecordId ] = useState('') ;
    const [ name, setName ] = useState('');
    const [ records, setRecords ] = useState([]);

    const fetch = async() => {
        if(id !== "" ){
            await axios({
                method: 'POST',
                url: 'http://localhost:5000/V1/patient/fetchUserById',
                data: {
                    "userId": id,
                    "tableName": tableName
                },
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then((res) => {
                setRecords(res.data.message)
            }).catch((err) => {
                console.log(err);
            })
        }else if(id === ""){
            await axios({
                method: 'POST',
                url: 'http://localhost:5000/V1/patient/patientById',
                data: {
                    "tableName": tableName
                },
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then((res) => {
                setRecords(res.data.message)
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    useEffect(() => {
        fetch()
    }, []);

    return(
        <div className='medicalCondition'>
                    <h2 style={{paddingLeft: '20px'}}>{recordName}</h2>
                    <div className='medicalRecords'>
                        {
                            records.map((item, index) => (
                                <div key={index} className="record" onClick={() => {
                                    setBtnPop(true)
                                    setRecordId(item['_id'])
                                    setName(item['record'])
                                }}>
                                    <p style={{ fontSize: '15px', fontWeight: '500', textTransform: 'capitalize', cursor: 'pointer' }}>{item['record']}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className='buttonContainer'>
                        <button className='btn-action' onClick={() => setBtnPopAdd(true)}>Add Record</button>
                        <PopUpAdd trigger={btnPopAdd} setTrigger={setBtnPopAdd} tableName={tableName}/>
                    </div>
                    {
                        records.map((item) => (
                            <PopUp trigger={btnPop} setTrigger={setBtnPop} id={recordId} name={name} table={tableName} patientId={id}/>
                        ))
                    }
                    
                </div>
    );
}

export default Records