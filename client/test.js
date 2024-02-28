import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function Registration() {
 const[msg,setMsg]=useState('')
 
 const submit = async(e)=>{
e.preventDefault()

try{
  await axios.post("http://localhost:8000/",{
    msg
  
  })

}
catch(e){
  console.log(e);

}
 }

  return (
    <div className='const'>
      <form action="POST">
        <textarea name="text" onChange={(e)=>{setMsg(e.target.value)}} placeholder='enter the text' cols="30" rows="10"></textarea>
      
        <button type="submit" onClick={submit} value="submit">submit</button>
      </form>
    </div>
  );
};

export default Registration;


<div className='logn'>
      <p>Already Registered?</p>
      <Link to='/login'>Login</Link>
      </div>



app.post("/",async(req,res)=>{
  const {name}=req.body
  const{email}=req.body
  const{phone}=req.body
  const{id}=req.body
  const{password}=req.body
  const{confirm}=req.body
  const hashedPassword = await bcrypt.hash(password, 4);



  const user = await collection.findOne({email:email}) 
   
  if (user) {
   return res.json("exist");
  }

    else {
      const data = {
          name,
          email,
          phone,
          id,
          password: hashedPassword,
          confirm
      };
  }
  try {
  await collection.insertMany[data];

            const otp = randomstring.generate(6); // Generate a 6-digit OTP
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'raphaelbaraka424@gmail.com',
                    pass: '0719247035',
                },
            });

            const mailOptions = {
                from: 'raphaelbaraka424@gmail.com',
                to: email,
                subject: 'OTP for Registration',
                text: `Your OTP for registration is: ${otp}`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    return res.status(500).json({ message: 'Internal Server Error' });
                } else {
                    console.log('Email sent: ' + info.response);
                    return res.json({ message: 'User registered. Check your email for OTP.' });
                }
            });
        } 
  
  catch (e) {
    res.json("notexist")
  }
})






app.post("/",async(req,res)=>{
  const {name}=req.body
  const{email}=req.body
  const{phone}=req.body
  const{id}=req.body
  const{password}=req.body
  const{confirm}=req.body
  const hashedPassword = await bcrypt.hash(password, 4);



  const data={
    name:name,
    email:email,
    phone:phone,
    id:id,
    password:hashedPassword,
    confirm:confirm
  }
  try {
   const user = await collection.findOne({email:email}) 
   
   if(user){
    res.json("exist")
   }
   else{
    res.json("notexist")
    await collection.insertMany([data])
   }
   
   user.otp = randomstring.generate(6); // Generate a 6-digit OTP
   const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'raphaelbaraka424@gmail.com',
      pass: '0719247035',
    },
  });

  const mailOptions = {
    from: 'raphaelbaraka424@gmail.com',
    to: email,
    subject: 'OTP for Registration',
    text: `Your OTP for registration is: ${user.otp}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ message: 'User registered. Check your email for OTP.' });
    }
  })



  } 
  
  catch (e) {
    res.json("notexist")
  }
})


// Backend: Express.js with Node.js

// Endpoint for initiating password reset
app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await collection.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Generate and store OTP for the user

  const otp = generateOTP();
  user.otp = otp;
  await user.save();
-
  // Send email with OTP
  sendEmail(email, otp);

  res.status(200).json({ message: "OTP sent to email" });
});

// Endpoint for OTP verification
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  const user = await collection.findOne({ email });

  if (!user || user.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  res.status(200).json({ message: "OTP verified successfully" });
});

// Endpoint for resetting password
app.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await collection.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update user's password
  user.password = newPassword;
  await user.save();

  res.status(200).json({ message: "Password reset successful" });
});

