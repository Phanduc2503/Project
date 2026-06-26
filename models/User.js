const mongoose =require('mongoose');
const UserSchema =new mongoose.Schema({
    username:{
        type :String,
        required :true,
        unique :true
    },
    email:{
        type :String,
        required :true,
        unique :true
    },
    password:{
        type :String,
        required :true
    },
    role :{
        type :String,
        enum :['user','admin'],
        default :'user'
    },
    avatar :{
        type :String,
        default :'https://res.cloudinary.com/dxjv0gq1f/image/upload/v1690911873/default-avatar_ow6k7b.png'
    },
    createdAt :{
        type :Date,
        default :Date.now
    }

})

module.exports = mongoose.model('User',UserSchema);
