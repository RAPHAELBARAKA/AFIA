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
                host: 'smtp.gmail.com',
                port: 587, // Use the appropriate port for your setup
                 secure: false, // Set to true for SSL/TLS, false for SMTP
                 auth: {
                    user: 'goldensilver424@gmail.com',
                    pass: 'nyjq pfev nuen lpnm',
                },
            });

            const mailOptions = {
                from: 'goldensilver424@gmail.com',
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
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    
    // Set isVerified status to true upon successful OTP verification
    user.isVerified = true;
    await user.save();

    res.json({ message: 'OTP verified' });

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
      host: 'smtp.gmail.com',
      port: 587, // Use the appropriate port for your setup
       secure: false, // Set to true for SSL/TLS, false for SMTP
       auth: {
          user: 'goldensilver424@gmail.com',
          pass: 'nyjq pfev nuen lpnm',
      },
  });

  const mailOptions = {
      from: 'goldensilver424@gmail.com',
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
        return res.json({ message: 'OTP resent. Check your email for the new OTP.' });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    if (!user.isVerified) {
      return res.status(403).json({ message: 'Email not verified. Please verify your email to login.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/password-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const passOtp = randomstring.generate(4);
    user.passOtp = passOtp;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // Use the appropriate port for your setup
       secure: false, // Set to true for SSL/TLS, false for SMTP
       auth: {
          user: 'goldensilver424@gmail.com',
          pass: 'nyjq pfev nuen lpnm',
      },
  });

  const mailOptions = {
      from: 'goldensilver424@gmail.com',
      to: email,
      subject: 'OTP for password',
      text: `Your OTP for verification is: ${passOtp}`,
  };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.json({ message: 'OTP sent. Check your email for your password OTP.' });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/verifypassword-otp", async (req, res) => {
  const { enteredpassOTP } = req.body;

  try {
    const user = await collection.findOne({ passOtp: enteredpassOTP });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    res.json({ message: 'verified' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/resendpass-otp", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await collection.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const passOtp = randomstring.generate(4);
    user.passOtp = passOtp;
    await user.save();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // Use the appropriate port for your setup
       secure: false, // Set to true for SSL/TLS, false for SMTP
       auth: {
          user: 'goldensilver424@gmail.com',
          pass: 'nyjq pfev nuen lpnm',
      },
  });

  const mailOptions = {
      from: 'goldensilver424@gmail.com',
      to: email,
      subject: 'OTP for password',
      text: `Your OTP for verification is: ${passOtp}`,
  };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.json({ message: 'OTP sent. Check your email for your password OTP.' });
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post('/resetpassword', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find user by email
    const user = await collection.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'An error occurred while resetting password. Please try again later.' });
  }
});


app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
}); 