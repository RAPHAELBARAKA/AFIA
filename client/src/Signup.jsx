import React from 'react';
import './Signup.css';
import myImage from './equity-afia.jpg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [name,setName] = useState()
  const [email,setEmail] = useState()
  const [phone,setPhone] = useState()
  const [id,setId] = useState()
  const [password,setPassword] = useState()
  const [confirm,setConfirm] = useState()
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3003/register',{name,email,phone,id,password,confirm})
    .then(result => console.log(result))
    .catch(err => console.log(err))
  }
   return (
   <div className='register1'>
     <div className='register2'>
       <img className='image'  src={myImage} alt="Description"/>
       <label className='sig'>____User registration___</label><br/><br></br>
      <form onSubmit={handleSubmit}>
       <label className='label'>Name</label><br/>
       <input type='name' name='name' className='text'placeholder='Enter your full name'required
       autoComplete='off'
       onChange={(e)=> setName(e.target.value)}/><br/><br/>
       <label className='label'>Email</label><br/>
       <input type='email' name='email' className='text'placeholder='Enter your Email' required
       autoComplete='off'
       onChange={(e)=> setEmail(e.target.value)}/><br/><br/>
       <label className='label'>Phone</label><br/>
       <input type='phone' name='phone' className='text' placeholder='Enter your Phone number' required
       autoComplete='off'
       onChange={(e)=> setPhone(e.target.value)} /><br/><br/>
       <label className='label'>ID</label><br/>
       <input type='id' name='id' className='text'placeholder='Enter your ID number'required
       autoComplete='off'
       onChange={(e)=> setId(e.target.value)}/><br/><br/>
       <label className='label'>Password</label><br/>
       <input type='password' name='password' className='text' placeholder='Enter your password'required
       autoComplete='off'
       onChange={(e)=> setPassword(e.target.value)}/><br/><br/>
       <label className='label'>Confirm</label><br/>
       <input type='confirm' name='confirm' className='text' placeholder='Confirm your password'required
       autoComplete='off'
       onChange={(e)=> setConfirm(e.target.value)}/><br/><br/>
       <Link to='/login'><button className='sign'>Register</button></Link>
      </form>
     </div>
   </div>
   );
 
}

export default Signup
