import { useEffect, useState } from 'react';
import './PatientList.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const List = () => {
    const navigation = useNavigate();
    const [ patients, setPatients ] = useState([]);

    const fetchPatients = async() => {
        await axios({
            method: 'GET',
            url: 'http://localhost:5000/V1/patient/patients',
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then((res) => {
            setPatients(res.data.patients)
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        fetchPatients()
    }, [])

    const handleViewPatient = (id, fullName) => {
        navigation(`/viewPatient/${id}`, { state: { id, fullName } });
      };
    return(
        <div className='patientsContainer'>
            {
                patients.map((item, index) => {
                    return(
                        <div className='patient'>
                            <div className='info'>
                                <h2>{index}</h2>
                                <h2>{item['full_name']}</h2>
                            </div>
                            <button className='btnPatient' onClick={() => handleViewPatient(item['_id'], item['full_name'])}>View Patient</button>
                        </div>
                    )
                })
            }
            

        </div>
    );
}

export default List