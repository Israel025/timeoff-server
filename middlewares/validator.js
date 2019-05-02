const joi = require("joi");

module.exports = function JoiValidator(schema){
  return async (req, res, next) => {
    try {
      const result = await joi.validate(req.body, schema, {abortEarly: false});
      
      next();
    } catch (err) {
      const errorDetails = err.detals.map(e => e.message);
      res.status(422).json({
        status: "error",
        message: "Some validation error occured",
        errors: errorDetails,
      });
    }
  };
};