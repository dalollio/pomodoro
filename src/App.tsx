import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import './index.css';
import Configuration from './pages/Configuration';
import Header from './components/Header';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
      <div className="main">
        <Header />
        <Navbar />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/config" element={<Configuration />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
  );
};

export default App;
