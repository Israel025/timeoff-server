const express = require("express");
const LeaveRequestModel = require("../models/LeaveRequestModel");
const AuthMiddleware = require("../middlewares/auth");
const {CreateLeaveReqValidator} = require("../validators/LeaveRequestVAlidator");
const JoiValidator = require("../middlewares/validator")
const router = express.Router();

//create a request
router.post("/", AuthMiddleware, JoiValidator(CreateLeaveReqValidator), async function(req, res){
  try {
    const leaveRequest = await LeaveRequestModel.create({
      leave_type: req.body.leave_type,
      date_start: req.body.date_start,
      date_end: req.body.date_end,
      leave_reason: req.body.leave_reason,
      user: req.user,
      time_stamp: new Date().toLocaleString()
    });

    res.json({
      status: "success",
      data: leaveRequest
    });
  } catch (err) {
    res.status(401).json({
      status: "error",
      message: "an error occured while creating your request"
    });
  }
});

//get all user's request
router.get("/", AuthMiddleware, async function(req, res){
  try {
    const leaveReqs = await LeaveRequestModel.find({user: req.user});

    res.json({
      status: "success",
      data: leaveReqs    
    })
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "requests not find"
    })
  }
});

module.exports = router;