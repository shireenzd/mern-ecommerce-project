
import express from 'express'
import User from '../models/User'

const UsersController = express.Router()

UsersController.post('/create',async (req,res) => {
    try {
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        await user.save()
        res.json(user)
        
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: "Failed to create user!" })
    }
})  

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
  
  
  UsersController.delete('/:_id',async (req,res) => {
      try {
          if (!req.params._id) {
              return
          }
          const operation = await User.deleteOne({ _id: req.params._id });
  
          res.json(operation)
      } catch (error) {
          console.log(error);
          res.status(400).json({ error: "Failed to delete user!" });
      }
  })



export default UsersController