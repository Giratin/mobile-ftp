const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('../models/user');
const Media = require('../models/media');


const secret = "mailing@23;deyassinesta5simEspritMobile201-20";

router.get('/', async (req,res)=>{
    res.send('Test')
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,  path.join(__dirname, '../public/files') )
    },
    filename: function (req, file, cb) {
        console.log(file)
      cb(null, Date.now().toString() + "."+ file.originalname.split(".")[file.originalname.split(".").length -1] )
    }
  })
   
var upload = multer({ storage: storage })

router.post('/login', async (req,res)=>{
    const user = await User.findOne({ email : req.body.email, password: req.body.password });
    if(!user){
        return res.json("credentials are incorrect");
    }

    const token = jwt.sign({ id : user.id, role : user.role },secret);
    res.json({token});
})

router.post('/uploadFile', upload.single('file'), async (req,res)=>{

   console.log(req.file);
   console.log(req.body.Title);
   
   let media = Media({
       name: req.file.filename,
       size: req.file.size,
       title: req.body.Title
   })

   await media.save();
   res.json(media).status(200);
})

router.get('/download/:id', async(req,res)=>{
    
        const {id} = req.params;
        const file = await Media.findOne({ _id : id });
        console.log(file);
        // res.json("tt")
        res.download( path.join(__dirname, `../public/files/${file.name}` ) );
    
})

module.exports = router;