import { Routes, Route } from 'react-router-dom';
import Landing from './Pages/Landing/LandingPage';
import Dashboard from './Pages/Dashboard/Dashboard';
import PatientView from './Pages/PatientView/PatientView';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/viewPatient/:id' element={<PatientView/>}/>
      <Route path='*' element={'404'}/>
    </Routes>
  );
}


export default App;
