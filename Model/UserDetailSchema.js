const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:[true,'please Enter the originalName']
    },
    DateOfBirth:{
        type:String,
        required:[true,'please Enter the date of birth']
    },
    gender:{
        type:String,
        required:[true,'please Enter the gender']
    },
    registernumber:{
        type:String,
        required:[true,'Please Enter the USN number'],
        unique:true
    },
    email:{
        type:String,
        required:[true,'Email address is required'],
        unique:true, 
        match:[/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,'Please Enter the valid email address']
},
    course:{
        type:String,
        required:[true,'Please Enter the course']
    },
    branch:{
        type:String,
        required:[true,'Please Enter the Branch']
    },
    Currentyear:{
        type:Number,
        required:[true,'Please Enter the courseCurrentyear']
    },
    courseDuration:{
        type:Number,
        required:[true,'Please Enter the course duration to complete it']
    },
    userImage_or_anyFile:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        // default:Date.now
    }
});
// {timestamps:{createdAt:'created_at',updatedAt:'updated_at'}}


// Update updatedAt before updating the document
UserSchema.pre('findOneAndUpdate', function (next) {
    this._update.updatedAt = new Date();
    next();
});


// Update the timestamp before saving the document
UserSchema.pre('save', function (next) {
    const currentDate = new Date();

    // Update createdAt only if it's a new document
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
});

module.exports=mongoose.model('UsersDetails',UserSchema);