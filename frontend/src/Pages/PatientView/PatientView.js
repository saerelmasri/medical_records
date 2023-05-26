import './PatientView.css'
import LeftContainer from '../../components/leftContainer/LeftContainer';
import { format, getDate, getYear } from 'date-fns';
import Records from '../../components/Records/Records';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PatientView = () => {
    const location = useLocation();
    const { id, fullName } = location.state;
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
            <LeftContainer role={'Doctor Dashboard'}/>
            <div className='mainContainer'>
                <div className='patientInfo'>
                    <h2 style={{ color: 'white'}}>Patient: {fullName}</h2>
                    <h3 style={{color: 'white'}}>{month} {day}, {year}</h3>
                </div>
                <Records recordName={'Medical Conditions'} tableName={'MedicalCondition'} id={id}/>
                <Records recordName={'Allergic'} tableName={'Allergic'} id={id}/>
                <Records recordName={'Medications'} tableName={'Medications'} id={id}/>
            </div>
            
        </div>
    );
}

export default PatientView