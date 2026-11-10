import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword 
} from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 1. Reusable validation check
  const validateInput = () => {
    if (!email || !password) {
      alert("Please enter both an email and a password.");
      return false;
    }
    if (password.length < 6) {
      alert("Firebase requires passwords to be at least 6 characters.");
      return false;
    }
    return true; // Input is good, safe to proceed
  };

  // 2. Logic for existing users
  const handleSignIn = async (e) => {
    e.preventDefault(); 
    if (!validateInput()) return; // Stop if validation fails

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in successfully');
    } catch (error) {
      // Check if the user doesn't exist or the password is wrong
      if (
        error.code === 'auth/invalid-credential' || 
        error.code === 'auth/user-not-found' || 
        error.code === 'auth/wrong-password'
      ) {
        alert("This email doesn't exist or the password is incorrect.");
      } else {
        alert(error.message);
      }
    }
  };

  // 3. Logic for brand new users
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateInput()) return; // Stop if validation fails

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('Account created successfully');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert("This email is already registered. Please click Sign In instead.");
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>
      <div style={{ backgroundColor: 'rgba(0,0,0,0.85)', padding: '60px', borderRadius: '8px', width: '350px' }}>
        
        <h2 style={{ marginBottom: '30px' }}>Welcome</h2>
        
        <form style={{ display: 'flex', flexDirection: 'column' }}>
          <input 
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '15px', marginBottom: '20px', borderRadius: '4px', border: 'none', backgroundColor: '#333', color: 'white' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '15px', marginBottom: '30px', borderRadius: '4px', border: 'none', backgroundColor: '#333', color: 'white' }}
          />
          
          {/* 4. Two separate buttons for direct choice */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <button 
              onClick={handleSignIn} 
              style={{ padding: '15px', backgroundColor: '#e50914', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}
            >
              Sign In
            </button>

            <button 
              onClick={handleSignUp} 
              style={{ padding: '15px', backgroundColor: 'rgba(255, 255, 255, 0.2)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', transition: 'background-color 0.2s' }}
              onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
              onMouseOut={(e) => e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            >
              Sign Up as New User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;