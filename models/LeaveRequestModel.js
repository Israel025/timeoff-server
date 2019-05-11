const mongoose = require("mongoose");

const LeaveRequestSchema = new mongoose.Schema({
  user:{//user's DB document id 
    type: String,
    required: true
  },
  leave_type:{
    type: String,
    enum: ["maternity", "sick", "travel", "education", "liesure"],
    required: true
  },
  date_start:{
    type: Date,
    required: true
  },
  date_end:{
    type: Date,
    required: true
  },
  leave_reason:{
    type: String,
    required: true
  },
  time_stamp:{
    type: String,
    required: true
  }   
});

const LeaveRequestModel = mongoose.model("LeaveRequest", LeaveRequestSchema);

module.exports = LeaveRequestModel;