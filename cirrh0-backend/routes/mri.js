const express = require("express");
const mriRouter = express.Router();
const mriController = require("../controller/mriController");

// Register a new user
mriRouter.post("/analyze-mri", mriController.analyze_mri)

// get mri
mriRouter.post("/get-mri-by-id/:id",mriController.get_mri)

// Delete  report
mriRouter.delete("/delete-mri/:id",mriController.delete_mri)

module.exports = mriRouter;
