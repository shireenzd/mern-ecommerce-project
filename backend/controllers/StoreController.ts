import express from "express";
import Store from "../models/Store";

const StoreController = express.Router();

StoreController.post("/create", async (req, res) => {
  try {
    // TODO
    // const ownerId = req.decoded.ownerId
    const { name, description, location, ownerId } = req.body;
    const store = new Store({
      name,
      description,
      location,
      owner: ownerId,
    });
    await store.save();
    res.json(store);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to get store!" });
  }
});

StoreController.get("/list", async (req, res) => {
  try {
    const store = await Store.find();
    res.json(store);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to get store list!" });
  }
});

StoreController.get("/:_id", async (req, res) => {
  try {
    if (!req.params._id) {
      return;
    }
    const store = await Store.findOne({
      _id: req.params._id,
    });
    res.json(store);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to get store!" });
  }
});

StoreController.put("/approve/:_id", async (req, res) => {
  try {
    if (!req.params._id || !req.body.name) {
      return;
    }

    // TODO authorize only admins (check by email)

    const updatedStore = await Store.findByIdAndUpdate(
      req.params._id,
      { approved: true },
      { new: true }
    );

    res.json(updatedStore);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to edit store!" });
  }
});

StoreController.delete("/:_id", async (req, res) => {
  try {
    if (!req.params._id) {
      return;
    }
    const operation = await Store.deleteOne({ _id: req.params._id });

    res.json(operation);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Failed to delete store!" });
  }
});

export default StoreController;
