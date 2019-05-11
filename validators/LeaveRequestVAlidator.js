const joi = require("joi");

exports.CreateLeaveReqValidator = {
  leave_type: joi.string().required(),
  date_start: joi.date().required(),
  date_end: joi.date().required(),
  leave_reason: joi.string().required(),
  user: joi.string().required()
  // time_stamp: joi.string().required()
}