import { useState } from 'react';
import './LandingStyle.css'
import Toastify from 'toastify-js';

const Landing = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const data = {
        "email": email,
        "password": password
    }

    const handleSubmit = () => {
        if(email === "" || password === ""){
            alertFail('All fields are required')
        }else{
            console.log(data);
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
                    <div className='actionContent'>
                        <h3 className='action'>Don't have an account? Register right now</h3>
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