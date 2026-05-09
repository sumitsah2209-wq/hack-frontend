import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';
import BottomNav from './components/common/BottomNav';
import { AppDataProvider } from './context/AppDataContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppDataProvider>
          <Toaster
            position="top-center"
            toastOptions={{
              duration: 2500,
              style: { borderRadius: '12px', fontSize: '12px' }
            }}
          />
          <div className="min-h-screen bg-slate-50 flex flex-col max-w-md mx-auto relative shadow-xl min-h-screen">
            <main className="flex-1 pb-24 overflow-y-auto">
              <AppRoutes />
            </main>
            <BottomNav />
          </div>
        </AppDataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
