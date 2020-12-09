const express = require('express');
const mongoose = require('mongoose');
const path = require('path');


const User= require('./models/user');
const Media= require('./models/media');
mongoose.connect(`mongodb://localhost:27017/ftpserver`, { useNewUrlParser : true , useUnifiedTopology : true})

const app = express();
const PORT = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('./public'));
app.use('/users', require('./routes/users') );

app.get('/', async(req,res)=>{
    const data = await Media.find();
    res.render('pages/home',{ data })
})
app.get('/login', (req,res)=>{
    res.render('pages/login')
})
app.get('/dashboard', async (req,res)=>{
    const data = await Media.find();
    res.render('pages/dashboard',{ data })
})

const createMe = async () =>{
    const isSaved = await User.findOne({ email : "yassine.sta@esprit.tn" });
    if(isSaved){
        return true;
    }
    const user = new User({
        email : "yassine.sta@esprit.tn",
        password: "21135374",
        role: "admin"
    })
    await user.save();
    return true;
}
 
app.listen(PORT, "0.0.0.0", async ()=>{
    await createMe();
    console.log(`app is runing on port ${PORT}`);
})

