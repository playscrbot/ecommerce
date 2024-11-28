import React, { useState, useEffect } from 'react';
import { ScaleLoader } from 'react-spinners';
import Layout from './components/Layout';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 3000);
  
  return (
    <>
      {loading ? (
        <div className="loading-container">
          <ScaleLoader color="#0056b3" loading={loading} size={75} />
          <p>Loading</p>
        </div>
      ) : (
        <>
          <Layout />
          <Footer />
        </>
      )}
    </>
  )
}

export default App;