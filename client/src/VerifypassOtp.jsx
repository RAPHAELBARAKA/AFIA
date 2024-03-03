import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import './VerifypassOtp.css';

function VerifypassOtp() {
    const [passOtp, setPassOtp] = useState(['', '', '', '']);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
   

    const email = location.state?.email || '';

    const handleInputChange = (index, value) => {
        const newPassOtp = [...passOtp];
        newPassOtp[index] = value;
        setPassOtp(newPassOtp);
    };

    const handleVerifyPassOTP = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const enteredPassOTP = passOtp.join(''); // Combine OTP characters into one string
            const response = await axios.post("http://localhost:3000/verifypassword-otp", { enteredPassOTP });

            if (response.status === 200) { alert('otp verified')// check for status code instead of response.data.success
                // OTP verification successful
                 // Redirect to a success page
                 navigate('/resetpassword')
            } else {
                alert(response.data.message); // Display error message
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            alert("An error occurred during OTP verification. Please try again later.");
        }
    
        setLoading(false);
    };

    const handleResendPassOTP = async () => {
        try {
            setLoading(true);
            const response = await axios.post("http://localhost:3000/resendpass-otp", { email });

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
        <div className='ver12'>
            <div className='ver2'>
                <h2 className='tele1'>TeleAfia</h2>  
                <h5>_____OTP Verification_____</h5>
                <p>A verification code has been sent to {email}. If the email address is incorrect, you can go back and change it.</p><br/>
                <p>Enter OTP sent to your device here</p>
                <form onSubmit={handleVerifyPassOTP}>
                    <div>
                            <input className='inpu1'
                                onChange={(e) => handleInputChange( e.target.value)}
                            />
                    </div><br/>
                    <button className='buttonv1' type="submit" disabled={loading}>Verify OTP</button>
                </form><br/>
                <button onClick={handleResendPassOTP} disabled={loading}>Resend OTP</button>

            </div>
        
        
        </div>
    );
}

export default VerifypassOtp;
