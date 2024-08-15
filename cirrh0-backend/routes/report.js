const express = require("express");
const reportRouter = express.Router();
const reportController = require("../controller/reportController");

// Add file to report
reportRouter.post("/add-files-to-report", reportController.report_add_files);

// analyse report
reportRouter.post("/analyze-report", reportController.analyze_report);

// get report
reportRouter.post("/get-report-by-id",reportController.get_report)

// Delete  report
reportRouter.delete("/delete-report",reportController.delete_report)

module.exports = reportRouter;
