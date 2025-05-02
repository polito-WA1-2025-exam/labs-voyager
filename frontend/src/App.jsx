import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BusinessPage from './pages/BusinessPage';


function App() {

  return <Router>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/business/:id/' element={<BusinessPage />}/>
    </Routes>
  </Router>
  
}

export default App
