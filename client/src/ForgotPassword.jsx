import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests


function ForgotPassword() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/forgot-password', {
          email
        });
  
        alert(response.data.message); // Display login status message
  
        // Redirect to Home page on successful login
        if (response.status === 200) {
          navigate('/verify-otp');
        }
      } catch (error) {
        alert('Login failed. Please check your credentials.');
        console.error('Login Error:', error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    );
}

export default ForgotPassword
