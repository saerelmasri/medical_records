import './LeftContainer.css'
import { useNavigate } from 'react-router-dom';

const LeftContainer = ({role}) => {
    const navigation = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigation('/')

    }
    return(
        <div className='leftContainer'>
            <h1 className='containertTitle'>Medical Portal</h1>
            <h3 className='roleDashboard'>{role}</h3>
            <div className='actionContainer'>
                <p className='options'>Information</p>
                <p className='options' onClick={logout}>Log out</p>
            </div>
        </div>
    );
}

export default LeftContainer