import axios from "axios";
import { useState, useEffect } from "react";
import PatientDashboard from "../PatientSide/Patient";
import Doctor from '../DoctorSide/DoctorSide';
const Dashboard = () => {
    const [ JWT, setJWT ] = useState('');
    const [ role, setRole ] = useState('');
    const [ name, setName ] = useState('');
    

    useEffect(() => {
        const token = localStorage.getItem('token')
        setJWT(token)
        const userRole = () => {
            axios({
                method: 'GET',
                url: 'http://localhost:5000/V1/auth/typeDecode',
                headers: {
                    Authorization: JWT
                }
            }).then((res)=> {
                setRole(res.data.message.role)
                setName(res.data.message.email);
            }).catch((err) => {
                console.log(err);
            })
        }
        userRole()
    }, [JWT]);

    return(
        <div>
            {role === 1 ? <PatientDashboard name={name}/> : <Doctor name={name}/>}
        </div>
    );
}

export default Dashboard