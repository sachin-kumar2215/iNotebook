const express = require('express');
const router = express.Router();
const User = require('../models/User')
const { body , validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchUser');
const JWT_SECRET = "Harryisagoodb$oy"


// Route 1 : create user using POST
router.post('/createuser',[
    body('name','Enter a valid name').isLength({min : 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','password must be atleast five characters').isLength({min : 5})
],async (req,res)=>{
    let success = false;
    //if there are error return bad request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success , errors: errors.array() });
    }
    try{
    let user = await User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({success, error: "sorry a user with this email already exist"})
    }

    const salt = await bcrypt.genSalt(10);
    secPass =  await bcrypt.hash(req.body.password,salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
    const data = {
        user:{
            id: user.id
        }
    }
    const authToken = jwt.sign(data,JWT_SECRET);
    success = true;
    res.json({success , authToken});
    } catch(error){
        console.log(error.message);
        res.status(500).send('Internal server error');
    }

})

// Route 2 : Auhtenticate user using POST
router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','password cannot be blank')
],async (req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body
    try{
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error: "please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({success ,error: "please try to login with correct credentials"});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET);
        success = true;
        res.json({success,authToken});

    } catch(error){
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
})


// Route 3 : get loggedin user details using POST "/api/auth/getuser" : login required
router.post('/getuser',fetchuser,async (req,res)=>{
    try{
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }catch(error){
        console.log(error.message);
        res.status(500).send('Internal server error');
    }
})
module.exports= router