import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Resetpassword.css'

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/resetpassword', {
        email,
        newPassword,
      });

      setSuccessMessage(response.data.message);
      
      // Navigate to the login page after successful password reset
      navigate('/login');
    } catch (error) {
      console.error('Error resetting password:', error.response.data);
      setError(error.response.data.message || 'An error occurred while resetting password.');
    }

    setLoading(false);
  };

  return (
    <div className='rest1'>
      <div className='rest2'>
      <h2>Reset Password</h2><br/>
      <form onSubmit={handleResetPassword} className='inp'>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='mail'
        /><br/><br/>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className='pass'
        /><br/><br/>
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='conf'
        /><br/><br/>
        <button type='submit'className='rp' disabled={loading}>
          {loading ? 'Resetting...' : 'Reset '}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </div>
    </div>
  );
}

export default ResetPassword;
