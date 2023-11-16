import React, { useState,useEffect } from 'react';
import './Header.css';
function Header() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowWarning(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial state based on window size
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return (
    <div>
        <h1>Vidyalai</h1>
        <div>
        {showWarning && (
        <div className="warning-message">
          <p>When Pdf is Uploaded,Scroll down to Extract Pages</p>
        </div>
      )}
        </div>
    </div>
  )
}

export default Header