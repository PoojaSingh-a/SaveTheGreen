import React from 'react';
import { Routes, Route } from 'react-router-dom';
import IndexPage from './pages/Index';
import JoinACampaignPage from './pages/JoinACampaign';
import About from './pages/About';
import { SignIn } from '@clerk/clerk-react';
import Campaigns from './pages/Campaigns';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/joinacampaign" element={<JoinACampaignPage />} />
      <Route path="/about" element={<About />} />
      <Route path="/campaigns" element={<Campaigns/>} />
      <Route path="/login" element={<SignIn />} />
    </Routes>
  );
};

export default App;
