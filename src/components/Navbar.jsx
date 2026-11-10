import React from 'react';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

const Navbar = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => console.log("Logged out successfully"))
      .catch((error) => alert(error.message));
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      padding: '20px 40px', 
      width: '100%', 
      boxSizing: 'border-box', // This is the magic CSS fix
      position: 'absolute', 
      zIndex: 100 
    }}>
      <h1 style={{ color: '#e50914', cursor: 'pointer', margin: 0 }}>NETFLIX</h1>
      
      <button 
        onClick={handleLogout} 
        style={{ 
          padding: '8px 16px', 
          backgroundColor: '#e50914', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px', 
          cursor: 'pointer', 
          fontWeight: 'bold' 
        }}
      >
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;