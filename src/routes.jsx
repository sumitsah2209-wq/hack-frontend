import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SmartPayManager from './pages/SmartPayManager';
import Statements from './pages/Statements';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import GreenRound from './pages/GreenRound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/smartpay" element={<SmartPayManager />} />
      <Route path="/statements" element={<Statements />} />
      <Route path="/greenround" element={<GreenRound />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

