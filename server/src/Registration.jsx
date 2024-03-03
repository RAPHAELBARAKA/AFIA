import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import './Registration.css';
import myPic from './equity-afia.jpg'
import { Link } from 'react-router-dom';
//import { on } from '../../server/mongo';
import { useNavigate } from 'react-router-dom';
//import {useHistory} from 'react-router-dom'



function Registration() {
 const[name,setName]=useState('')
 const[email,setEmail]=useState('')
 const [phone,setPhone] = useState('')
  const [id,setId] = useState('')
  const [password,setPassword] = useState('')
  const [confirm,setConfirm] = useState('')
  

  const [loading, setLoading] = useState(false);
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    alert('Registration successful');

    const response = await axios.post("http://localhost:3000/", {
      name,
      email,
      phone,
      id,
      password,
      confirm
    });

    if (response.data === "exist") {
      alert("User already exists");
    } else if (response.data.message === "User registered. Check your email for OTP.") {
      navigate("/verify-otp",{ state: { email } });
    } else {
      alert("Unexpected response from server");
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("An error occurred during registration. Please try again later.");
  }

  finally {
    setLoading(false); // Set loading state to false regardless of success or failure
  }
}

  return (
  <div className='const'>
    <div className='const1'>
      <form onSubmit={handleSubmit}>
        <img className='pic'  src={myPic} alt="Description"/>
        <label className='sigg'>____User registration___</label><br/>
        <label>Full name</label><br/>
        <input className='input1' name="text" onChange={(e)=>{setName(e.target.value)}} placeholder='enter your Name' cols="30" rows="10"></input> <br/><br/>
        <label>Email</label><br/>
        <input className='input1'  name="text" onChange={(e)=>{setEmail(e.target.value)}} placeholder='enter your Email' cols="30" rows="10"></input><br/><br/>
        <label>Phone number</label><br/>
        <input className='input1' name="text" onChange={(e)=>{setPhone(e.target.value)}} placeholder='enter your phone number' cols="30" rows="10"></input> <br/><br/>
        <label>Id number</label><br/>
        <input className='input1' name="text" onChange={(e)=>{setId(e.target.value)}} placeholder='enter your Id' cols="30" rows="10"></input><br/><br/>
        <label>Password</label><br/>
        <input className='input1' name="text" onChange={(e)=>{setPassword(e.target.value)}} placeholder='enter your Password' cols="30" rows="10"></input> <br/><br/>
        <label>Confirm password</label><br/>
        <input className='input1' name="text" onChange={(e)=>{setConfirm(e.target.value)}} placeholder='Confirm your password' cols="30" rows="10"></input><br/><br/>

        <input className='sub' type="submit"  />
        {loading && <div className='load'>Loading Please wait...</div>}
      
        
        
      </form>
      <div className='logn'>
      <p>Already Registered?</p>
      <Link to='/login'>Login</Link>
      </div>
      
    </div>
  </div>
  );
};

export default Registration;
