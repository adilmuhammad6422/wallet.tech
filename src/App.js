import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BudgetPage from './components/BudgetModel'; // Ensure this component is correctly named based on your file structure
import Login from './components/login'; // Assuming this is the correct path to your Login component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <>
            <Navbar />
            <Hero />
          </>
        } />
        <Route path="/budget" element={
          <>
            <Navbar />
            <BudgetPage />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
