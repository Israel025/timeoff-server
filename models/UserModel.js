const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  user_id:{
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  first_name:{
    type: String,
    required: true
  },
  last_name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password:{
    type: String,
    required: true,
    select: false
  },
  company_name:{
    type: String,
    required: true
  },
  designation:{
    type: String,
    required: true
  },
  phone_number:{
    type: String,
    required: true
  },
  department:{
    type: String,
    required: true
  },
  manager_name:{
    type: String,
    required: true
  },
  dob:{
    type: Date,
    required: true
  },
  gender:{
    type: String,
    enum: ['male', 'female'],
    required: true
  },
  marital_status:{
    type: String,
    enum: ['single', 'married', "engaged"],
    required: true  
  },
  country:{
    type: String,
    required: true
  },  
  state:{
    type: String,
    required: true
  },
  city:{
    type: String,
    required: true
  }
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = UserModel;