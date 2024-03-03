
import React from 'react';
import  { useState } from 'react';
import axios from 'axios';
import { Link,useLocation, useNavigate } from 'react-router-dom';
import './VerifyOtp.css';

function VerifyOtp() {
    const [otp, setotp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || '';

    const handleInputChange = (index, value) => {
        const newotp = [...otp];
        newotp[index] = value;
        setotp(newotp);
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const enteredOTP = otp.join(''); // Combine OTP characters into one string
            const response = await axios.post("http://localhost:3000/verify-otp", {enteredOTP });

            if (response.status === 200) { // check for status code instead of response.data.success
                // OTP verification successful
                navigate('/login'); // Redirect to a success page
            } else {
                alert(response.data.message); // Display error message
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("An error occurred during OTP verification. Please try again later.");
        }
    
        setLoading(false);
        
    };
    const handleResendOTP = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:3000/resend-otp", { email });

            if (response.status === 200) {
                alert(response.data.message);
            } else {
                alert("Failed to resend OTP. Please try again later.");
            }
        } catch (error) {
            console.error("Error resending OTP:", error);
            alert("An error occurred while resending OTP. Please try again later.");
        }

        setLoading(false);
    };
    return (

      <div className='ver1'>
        <div className='ver'>
        <h2 className='tele'>TeleAfia</h2>  
        <h5>_____OTP Verification_____</h5>
         <p>A verification code has been sent to {email}. If the email address is incorrect, you can go back and change it.</p><br/>
           <p>Enter OTP sent to your device here</p>
            <form onSubmit={handleVerifyOTP}>
                <div>
                    {otp.map((value, index) => (
                        <input className='inpu'
                            key={index}
                            type="text"
                            maxLength={1}
                            value={value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    ))}
                </div><br/>
                <button className='buttonv' type="submit" disabled={loading}>Verify OTP</button>
            </form><br/>
            <button onClick={handleResendOTP} disabled={loading}>Resend OTP</button>
        </div>
    </div>    
    );
}


export default VerifyOtp
