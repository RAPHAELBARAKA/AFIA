import React from 'react'
import './Home.css'
import dashLogo from './assets/Leading Icon.png'
import homePointer from './assets/Group 711 (1).png'
import specialistIcon from './assets/specialist icon.png'
import appoitmenticon from './assets/Image.png'
import historyicon from './assets/historyicon.png'
import settingicon from './assets/Setting.png'
import lightmodeicon from './assets/lightmodeicon.png'
import lightmodeicon1 from './assets/lightmodeicon1.png'

function Home() {
  return (
    <div>
      <div className='home1'>
          <div className='imaged'>
            <img className='dashlog' src={dashLogo}alt='dashlog'/> 
            <h2 className='dashb'>Dashboard</h2>
            <h1 className='h1dash'>OUR_SERVICES</h1>
          </div>
          <ul><img className='appoitmenticon' src={appoitmenticon} alt='appoitmenticon'/>My Appointments</ul>
          <ul><img className='specialisticon' src={specialistIcon} alt='speciisticon'/> Specialists</ul>
          <div className='dashright1'>
            <ul><img className='historyicon' src={historyicon} alt='historyicon'/> MyHistory</ul>
              <div  className='dashright12'>
                <p>Medical services</p><img className='homepoiter'src={homePointer} alt='poiter'/>
                <p>Specialists</p> <img className='homepoiter' src={homePointer} alt='poiter'/> 
                <p>My health records</p> <img className='homepoiter' src={homePointer} alt='poiter'/> 
            </div>
          </div>  
          <ul> <img className='settingicon1'src={settingicon} alt='setting'/> Payments</ul>
          <ul><img className='settingicon2' src={settingicon} alt='setting'/>  Customer Care</ul>
          <div className='dashright2'>
            <ul><img className='settingicon3'  src={settingicon} alt='setting'/> MyAcccount</ul>
              <div  className='dashright21'>
                <p>Book appointment </p> <img className='homepoiter1' src={homePointer} alt='poiter'/>
                <p>Teleclinics</p> <img className='homepoiter1'  src={homePointer} alt='poiter'/> 
                <p>Other services </p><img className='homepoiter1' src={homePointer} alt='poiter'/>
            </div>
          </div>
      </div>
      <div className='home2'>
      <img className='lightmodeicon' src={lightmodeicon} alt='lightmodeicon'/> <ul>Light mode</ul>
        <div className='dashright3'>
           <ul>Logout</ul><img className='lightmodeicon1' src={lightmodeicon1} alt='lightmodeicon1'/>
          <h3>Powered,by..E&M..Technologies</h3>
        </div>
      </div>
    </div>
  )
}

export default Home
