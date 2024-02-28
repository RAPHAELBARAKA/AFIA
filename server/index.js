const express = require('express');
const collection=require("./mongo");
const app=express()
const cors = require("cors")
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const randomstring = require('randomstring');
//const otpGenerator = require('otp-generator');

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.get("/",cors(), (req, res) => {
  res.send("Hello World!");
})



app.post("/",async(req,res)=>{
  const {name}=req.body
  const{email}=req.body
  const{phone}=req.body
  const{id}=req.body
  const{password}=req.body
  const{confirm}=req.body
  const hashedPassword = await bcrypt.hash(password, 4);



  try {
  const user = await collection.findOne({email:email}) 
   
  if (user) {
   return res.json("exist");
  }
  const newUser = new collection({
    name,
    email,
    phone,
    id,
    password: hashedPassword,
    confirm
});
       await newUser.save();

       const otp = randomstring.generate(4);
       newUser.otp = otp;
       await newUser.save();
       
       
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'raphaelbaraka424@gmail.com',
                    pass: 'tjly lmns zxsj okkm',
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

app.post("/verify-otp", async (req, res) => {
  const { enteredOTP } = req.body;

  try {
    const user = await collection.findOne({ otp: enteredOTP });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.json({ message: 'verified' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/resend-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const otp = randomstring.generate(4);
    user.otp = otp;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'raphaelbaraka424@gmail.com',
        pass: 'tjly lmns zxsj okkm',
      }
    });

    const mailOptions = {
      from: 'raphaelbaraka424@gmail.com', // Update with your email address
      to: email,
      subject: 'Resend OTP',
      text: `Your new OTP is: ${otp}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.json({ message: 'OTP resent. Check your email for the new OTP.' });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login",async(req,res)=>{
  const{email}=req.body
  const{password}=req.body

  try {
   const user = await collection.findOne({email}); 
   
   if (!user) {
    return res.status(400).json({ message: 'User not found' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({ message: 'Login successful' });
} catch (err) {
  res.status(500).json({ error: err.message });
}
})



app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
}); 