import './PatientStyle.css'
import LeftContainer from '../../components/leftContainer/LeftContainer';
import { format, getDate, getYear } from 'date-fns';
import Records from '../../components/Records/Records';
import React, { useEffect, useState } from 'react';

const PatientDashboard = ({name}) => {
    const currentDate = new Date();
    const day = getDate(currentDate);
    const month = format(currentDate, 'MMMM');
    const year = getYear(currentDate);

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

    return(
        <div className="canva" style={{ height: canvasHeight }}>
            <LeftContainer role={'Patient Dashboard'}/>
            <div className='mainContainer'>
                <div className='patientInfo'>
                    <h2 style={{ color: 'white'}}>Patient: {name}</h2>
                    <h3 style={{color: 'white'}}>{month} {day}, {year}</h3>
                </div>
                <Records recordName={'Medical Conditions'} tableName={'MedicalCondition'}/>
                <Records recordName={'Allergic'} tableName={'Allergic'}/>
                <Records recordName={'Medications'} tableName={'Medications'}/>
            </div>
            
        </div>
    );
}

export default PatientDashboard