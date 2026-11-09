const express=require('express')
const bcrypt=require('bcrypt')
const router=express.Router()
const User=require('../models/user')

// respAPI //

 
 
router.get('/register',(req,res)=>{
    res.render('home')
})

router.post('/register',async(req,res)=>{
    try{
        const{
            name,email,role,password,confirmPassword
        }=req.body
        // An if statement runs its block only when its condition is true.
        if(!name||!email||!role||!password||!confirmPassword){
            // return sends this response and stops the handler from continuing.
            return res.status(400).json({
                success:false,
                message:"All fields are required "
            })
        }
//  password lenght
        if(password.length<6 && password.length<=8){
            return res.status(400).json({
                success:false,
                message:"password must be atleats 6 characters"
            })
        }
//  password lenght must not be more 8
        // if(password.length<=8){
        //     return res.status(400).json({
        //         success:false,
        //         message:"password has exceed the range"
        //     })
        // }
// check if email already exists 
User.findByEmail(email, async(err,results)=>{

    // if(err){
    //     console.log(err)
    //     return res.status(500).json({
    //         success:false,
    //         message:"database"
    //     })
    // }
    if(results.length >0){
        return res.status(400).json({
            success:false,
            message:"Email Already exists"
        })
    }
    // hash password 
    const hashpassword=await bcrypt.hash(password,10)
    // insert user
    const user={
        name,
        email,
        role,
        password:hashpassword
    }
    User.create(user,(err,results)=>{
            if(err){
                console.error(err)

                return res.status(500).json({
                    success:false,
                    message:"failed to create user"
                })
            }
            res.redirect('/')
    })

})
    }catch(error){
        console.error(error)
        res.status(500).json({
            success:false,
            message:"server error"
        })

    }
})

router.get('/login',(req,res)=>{
   res.render('home')
})
router.post('/login',(req,res)=>{
    const {email,password}=req.body 

    // validate password
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"email and password is required"

  
        })
    }
// find user 
User.findByEmail(email,async(err,users)=>{
    if(err){
        console.error(err)
        return res.status(400).json({
           success:false,
            message:"database error" 
        })
    }

    // if user does not exists 
    if(!users || users.length===0){
        return res.status(400).json({
           success:false,
           message:"invalid password or email"
        })
    }

    const user=users[0]

    try{
        const passwordMatch= await bcrypt.compare(
                password,
                user.password
        );
        if(!passwordMatch){
            return res.status(400).json({
                error:"invalid password or email"
            })

        }
        // redirect view 
        if(user.role==='admin'){
            return res.redirect('/admin')
        }else if(user.role==='user'){
            return res.redirect('/member')
        }
        // redirect normal user 
        return res.redirect('/')
    }catch (error){
        console.error(error)
        return res.status(500).json({
            error:"login failed"
        })
    }
})

})


module.exports=router
