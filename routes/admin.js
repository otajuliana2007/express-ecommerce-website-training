const express=require("express")
const router=express.Router()
const User=require('../models/user')

router.get('/member',(req,res)=>{
     res.render('admin/users',{
        title:"Members",
        layout:false
     })
})
router.get('/admin',(req,res)=>{
  User.getAll((err,users)=>{
   if(err){
      console.error(err)
      return res.status(500).send("database error")
   }
// total users
   const totalUsers=users.length;
   
   // for total admin 
   const totalAdmin=users.filter(item =>item.role==="admin")
   .length
   // for regular user
   const totalRegular=users.filter(item =>item.role==="user")
   .length
   res.render('admin/dashboard',{
      title:"Admin Dashboard",
      users:users,
      totalUsers,
      totalAdmin,
      totalRegular,
      layout:false
   })


  })
})
router.get('/user/:id/edit',(req,res)=>{
   const id= req.params.id
   User.findByID(id, (err, user) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
 
   res.render('admin/editdashboard',{
      title:"Edit Dashboard",
      user,
      id,
      layout:false
   })


  })
})
// router.get('/admin/:id',(req,res)=>{
//    const id= req.params.id
    
 
//    res.render('admin/dashboard',{
      
//       id,
//       layout:false
//    })


  
// })
router.post('/user/edit/:id',  (req, res) => {
    const id = req.params.id;
    const { name, email, role  } = req.body;
    const  newUser ={ name, email, role }
     
   User.update(id, newUser, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Database error');
        }
        res.redirect('/admin');
    });
});
router.post('/delete/:id', (req, res) => {
    const id = req.params.id;

   //  if (!/^\d+$/.test(id)) {
   //      return res.status(400).send('Invalid product ID');
   //  }

   //  Product.getByID(id, (err, product) => {
   //      if (err) {
   //          console.error('Fetch error:', err);
   //          return res.status(500).send('Database error');
   //      }

   //      // getByID returns one product object
   //      if (!product) {
   //          return res.status(404).send('Product not found');
   //      }
   //      });

        User.delete(id, (deleteErr) => {
            if (deleteErr) {
                console.error('Delete error:', deleteErr);
                return res.status(500).send('Failed to delete product');
            }

             

             
        
    });
});




module.exports=router
