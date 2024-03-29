// Init
import React from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import Navbar from './common/Navbar';
import 'react-toastify/dist/ReactToastify.css';

// Files
import Index from './routes/index';
import './css/index.css';

// Component
function App() {
  return (
    <div className="App">
      {/* toastify Container for Notification */}
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar transition={Flip} />
      <Navbar />
      {/* Routes */}
      <Index />
    </div>
  );
}

// Export
export default App;
