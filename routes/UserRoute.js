const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const router = express.Router();

const SECRET = "TS@I55Y!A";

//create a new user
router.post("/", async (req, res) => {
  try{
    req.body.password = await bcrypt. hash(req.body.password, 10);
    req.body.user_id = `UN${Math.floor(1000 + Math.random() * 9000)}`;
    
    const user = await UserModel.create(req.body);

    const token = jwt.sign({id: user.id}, SECRET, {expiresIn: "1h"})

    res.status(200).json({
      status: "success",
      data: {user, token},
    });
  } catch(err){
    console.log(err);

    res.status(500).json({
      status: 500,
      message: "An error occured while creating your user account"
    })
  }
});

// Get s user's profile
router.get("/profile", async function(req, res) {
  try {
    const authHeader = req.headers.authorization;

    if(!authHeader){
      return res
        .status(401)
        .json({status:"error", message: "Please specify a header"});
    }

    const token = authHeader.split(" ")[1];

    const tokenData = jwt.verify(token, SECRET);

    const user = await UserModel.findById(tokenData.id);

    res.json({status: "success", user});

    res.json({
      status: "succcess",
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      status: "error",
      message: `${err.message}, Kindly login again`,
    });
  }
});

// Get all users
router.get("", async function(req, res) {
  try {
    const users = await UserModel.find();
    res.json({
      status: "succcess",
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "An error occured while getting users",
    });
  }
});

// Delete a user
router.delete('/:user_id', async function(req, res) {
  try {
    const deletedUser = await UserModel.findOneAndDelete({
      user_id: req.params.user_id,
    });

    if (!deletedUser) {
      res.status(404).json({
        status: 'error',
        message: "The User's record does not exist",
      });
      return;
    };

    res.json({
      status: 'success',
      message: 'User deleted successfully',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'error',
      message: 'Error deleting the user',
    });
  }
});

// Update and edit a user
router.put('/:user_id', async function(req, res) {
  try {
    const updatedUser = await UserModel.findOneAndUpdate(
      { user_id: req.params.user_id },
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        company_name: req.body.company_name,
        designation: req.body.designation,
        phone_number: req.body.phone_number,
        department: req.body.department,
        managers_name: req.body.managers_name,
        marital_status: req.body.marital_status,
        dob: req.body.dob,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        gender: req.body.gender,
      },
      { new: true }
    );

    // Check if user not found and updated
    if (!updatedUser) {
      res.status(404).json({
        status: 'error',
        message: 'Sorry that user record does not exist',
      });
    }

    res.json({
      status: 'success',
      data: updatedUser,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      status: 'error',
      message: 'Error occured while updating the user',
    });
  }
});

module.exports = router;