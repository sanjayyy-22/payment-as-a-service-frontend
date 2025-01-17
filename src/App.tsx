import '../style.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import LoginComponent from './components/LoginComponent';
import SignupComponent from './components/SignupComponent';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {}, []);

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<LoginComponent />} />
          <Route path='/login' element={<LoginComponent />} />
          <Route path='/signup' element={<SignupComponent />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
