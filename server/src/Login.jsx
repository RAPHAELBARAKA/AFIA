import React from 'react';
import { useState } from 'react';
import './Login.css';
import myPic from './equity-afia.jpg'
import { Link } from 'react-router-dom';
//import { on } from '../../server/mongo';
import { useNavigate } from 'react-router-dom';
//import {useHistory} from 'react-router-dom'
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email,
        password
      });

      alert(response.data.message); // Display login status message

      // Redirect to Home page on successful login
      if (response.status === 200) {
        navigate('/Home');
      }
    } catch (error) {
      alert('Login failed. Please check your credentials.');
      console.error('Login Error:', error);
    }
  };

  return (
    <div className='log'>
    <div className='log1'>
    <img className='picc'  src={myPic} alt="Description"/>
      <p className='logg'>____User Login____</p><br/>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label><br/>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='input20'
            placeholder='Enter your email'
            required
          /><br/><br/>
        </div>
        <div>
          <label>Password</label><br/>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='input21'
            placeholder='Enter your password'
            required
          /><br/><br/>
        </div>
        <button className='subm' type='submit'>Login</button>
      </form><br/>
      <div className='sin'>
        <p>Not Registered?</p>
        <Link to='/registers'>Register</Link>
      </div>
      <div className='re-set'>
        <p>Forgot password?</p>
        <Link to='/forgot-password'>Re-set</Link>
      </div>
      </div> 
    </div>
  );
}

export default Login;