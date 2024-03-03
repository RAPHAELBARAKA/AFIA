import React from 'react';
import './Landingpage.css';
import myImage from './assets/doctor.png';
import { Link } from 'react-router-dom';
import homeLogo from './assets/Leading Icon.png'

function Landingpage() {

  return (
    
    <div>
     <div className='nav1'>
       <img className='homelogo' src={homeLogo} alt='home'/>
       <p className='home'>Home</p>
       <p className='about'>About us</p>
       <p className='service'>Services</p>
       <p className='contact'>Contact us</p>
       <Link to='/Registers' className='register'>Register</Link>
       <Link to='/Login' className='login3'>Login</Link>
     </div>  
    <img className='img' src={myImage} alt='phto'/>
        <div className='services'>
           <div className='meds'>Our medical services</div>
           <div className='consumables'>Medical consumables</div>
           <div className='pharm'>Pharmaceutical sevices</div>
        </div>
        <div className='services1'>
           <div className='opt'>Optometry</div>
           <div className='con'>Counselling Therapy</div>
           <div className='phy'>Physiotherapy</div>
        </div>
        <div className='services2'>
           <div className='nut'>Nutrition</div>
           <div className='amb'>Ambulence Services</div>
           <div className='lab'>Laboratory</div>
        </div>
        <div className='services3'>
           <div className='mis'><p>Our Mission</p>Our Vision</div>
           <div className='abo'>About us</div>
           <div className='cont'>Contact us</div>
        </div>
    </div>  );

    
}

export default Landingpage;
