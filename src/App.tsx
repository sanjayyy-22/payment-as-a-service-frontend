import '../style.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import LoginComponent from './components/LoginComponent';
import { useEffect } from 'react';

const App = () => {
  useEffect(() => {}, []);

  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<LoginComponent />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
