import express from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const UsersController = express.Router();

UsersController.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.findOne({
      email: email,
    }).exec();

    // if user exists, return error!
    if (user) {
      return res
        .status(400)
        .json({ error: "User with email " + email + " already exists!" });
    }

    // at this point, we're sure that the user record does not exist yet
    const hashedPass = bcrypt.hashSync(password, saltRounds);

    console.log(hashedPass);
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPass,
    });
    await newUser.save();
    newUser["password"] = "";

    console.log(newUser);
    // if not exists, create it
    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
        data: JSON.stringify(user),
      },
      "some-secret-no-one-knows-except-this-backend"
    );

    console.log(token);
    res.json({ token: token, newUser });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to create user!" });
  }
});

UsersController.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user= await User.findOne({email})
    if(!user){
      res.status(401).json({error: "user not found! please register"})
    }
    //verify password

  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to create user!" });
  }
});

UsersController.get("/list", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to get users list!" });
  }
});

UsersController.get("/:_id", async (req, res) => {
  try {
    if (!req.params._id) {
      return;
    }
    const user = await User.findOne({
      _id: req.params._id,
    });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to get user!" });
  }
});

UsersController.put("/:_id", async (req, res) => {
  try {
    if (!req.params._id || !req.body.name) {
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params._id,
      { name: req.body.name },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to edit user!" });
  }
});

UsersController.delete("/:_id", async (req, res) => {
  try {
    if (!req.params._id) {
      return;
    }
    const operation = await User.deleteOne({ _id: req.params._id });

    res.json(operation);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to delete user!" });
  }
});

export default UsersController;
