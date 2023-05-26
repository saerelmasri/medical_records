import './Doctor.css'
import LeftContainer from '../../components/leftContainer/LeftContainer';
import React, { useEffect, useState } from 'react';
import { format, getDate, getYear } from 'date-fns';
import List from '../../components/PatientList/PatientList';


const Doctor = ({name}) => {
    const [canvasHeight, setCanvasHeight] = useState(window.innerHeight);
    useEffect(() => {
        const handleResize = () => {
          setCanvasHeight(window.innerHeight);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
    }, []);

    const currentDate = new Date();
    const day = getDate(currentDate);
    const month = format(currentDate, 'MMMM');
    const year = getYear(currentDate);

    return(
        <div className="canva" style={{ height: canvasHeight }}>
            <LeftContainer role={"Doctor Dashboard"}/>
            <div className='mainContainer'>
                <div className='doctorInfo'>
                    <h2 style={{ color: 'white'}}>Doctor: {name}</h2>
                    <h3 style={{color: 'white'}}>{month} {day}, {year}</h3>
                </div>
                <h3 style={{paddingLeft: '80px', color: 'white', textDecorationLine: 'underline'}}>Your patients</h3>
                <List/>
            </div>
        </div>
    );
}

export default Doctor