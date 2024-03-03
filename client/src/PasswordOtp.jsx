import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './PasswordOtp.css'


function PasswordOtp() {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/password-otp', {
          email
        });
 
        alert(response.data.message); // Display login status message
  
        // Redirect to Home page on successful login
        if (response.status === 200) {
          navigate('/VerifypassOtp',{ state: { email } });
        }
      } catch (error) {
        alert('Login failed. Please check your credentials.');
        console.error('Login Error:', error);
      }
    };
  
    return (
      <div className='ot'>
       <div className='ot2'>
       <h4>Password Reset</h4> 
       <p >Enter your email address
             to receive a Verification Code</p><br/><br/>
      <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required className='emil'
      /><br/><br/>
      <button type="submit" className='but'>Send</button>
    </form>
    </div> 
    </div>
      
    );
}

export default PasswordOtp
