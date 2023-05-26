import { useState } from 'react';
import './LandingStyle.css'
import Toastify from 'toastify-js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Landing = () => {
    const navigate = useNavigate();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');


    const handleSubmit = () => {
        if(email === "" || password === ""){
            alertFail('All fields are required')
        }else{
            axios({
                method: 'POST',
                url: `http://localhost:5000/V1/auth/login`,
                data: {
                    "email": email,
                    "password": password
                },
            }).then((res) => {
                localStorage.setItem('token', res.data.message);
                navigate('/dashboard')
            }).catch((err) => {
                alertFail('Something went wrong :(')
            })
        }
    }

    return(
        <div className="canvas">
            <div className='container'>
                <div className='containerImg'></div>
                <div className='loginForm'>
                    <h1 className='title'>Welcome!</h1>
                    <div className='formData'>
                        <div className='form'>
                            <label>Email</label>
                            <br/>
                            <input className='inputstyle' 
                                type='email' 
                                placeholder='Your email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='form'>
                            <label>Password</label>
                            <br/>
                            <input className='inputstyle' 
                                type='password' 
                                placeholder='Your password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className='btn' onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    );
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

export default Landing;