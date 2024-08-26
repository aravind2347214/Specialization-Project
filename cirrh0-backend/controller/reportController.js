const { NLP_BASE_URL, REPORT_BASE_URL } = require("../env/dotenv");
const ReportAnalysis = require("../model/reportsAnalysis");
const User = require("../model/user");
const axios = require('axios')

exports.report_add_files = async (req, res) => {
  try {
    const userId = req.params.userId;
    const fileURLSet = req.body.fileURLSet;
    console.log("UserID:", userId, "FileURLSet:", fileURLSet);

    // Create a new ReportAnalysis instance
    const newReportAnalysis = new ReportAnalysis({
      userId: userId,
      files: fileURLSet,
      analysis: null,
      stage: null,
      ascites: null,
      edema: null,
      spiders: null,
      hepatomegaly: null,
      bilirubin: null,
      albumin: null,
      sgot: null,
      age: null,
      sex: null,
      tryglycerides: null,
      cholesterol:null,
      prothrombinTime: null,
      date: `${new Date()}`,
      copper: null,
      alk_phos: null,
      lifestyle_recommendations: [],
      precautions: [],
      self_treatment_plan: [],
      doctor_type: []
    });

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found', addSuccess: false });
    }

    await newReportAnalysis.save()

    // Update user's reportAnalysisSet
    await User.findByIdAndUpdate(
      userId,
      { $push: { reportAnalysisSet: newReportAnalysis._id } },
      { new: true }
    );

    // Sending the file URL set and the user ID to the Python server
    const pythonResponse = await axios.post(NLP_BASE_URL, { pdf_urls: fileURLSet });
    
    // This should give the extracted parameters, which we return back to the frontend
    const extractedData = pythonResponse.data;
    console.log("Extracted Data:", extractedData);
    res.json({ extractSuccess: true, extractedData: extractedData, reportId: newReportAnalysis._id });

  } catch (error) {
    console.error("Extract Failure:", error);
    res.status(500).json({ extractSuccess: false, error: error.message });
  }
};


  
  exports.analyze_report = async (req, res) => {
    try {
      console.log("ANALYSE REPORT BACKEND : ",req)
      const reportId = req.body.reportId;
      const validatedData = req.body.validatedData;
  
      // Update each field individually in the first phase
      var updatedReport = await ReportAnalysis.findById(reportId)
            updatedReport.ascites=validatedData.ascites
            updatedReport.edema=validatedData.edema
            updatedReport.spiders=validatedData.spiders
            updatedReport.hepatomegaly=validatedData.hepatomegaly
            updatedReport.bilirubin=validatedData.bilirubin
            updatedReport.albumin=validatedData.albumin
            updatedReport.prothrombin=validatedData.prothrombin
            updatedReport.copper=validatedData.copper
            updatedReport.alk_phos=validatedData.alk_phos
            updatedReport.platelets=validatedData.platelets
            updatedReport.sex=validatedData.sex
            updatedReport.age=validatedData.age
            updatedReport.edema=validatedData.edema
            updatedReport.tryglycerides=validatedData.tryglycerides
            updatedReport.sgot=validatedData.sgot
            updatedReport.cholesterol=validatedData.cholesterol
          
       updatedReport = await updatedReport.save()
  
      if (!updatedReport) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
      // Sending the validated data to the Python server for modeling
      const pythonResponse = await axios.post(REPORT_BASE_URL, validatedData);
  
      // Python gives the stage value and other details
      updatedReport = await ReportAnalysis.findByIdAndUpdate(
        reportId,
        {
          $set: {
            analysis: pythonResponse.data.analysis,
            stage: pythonResponse.data.stage,
            lifestyle_recommendations: pythonResponse.data.lifestyle_recommendations,
            precautions: pythonResponse.data.precautions,
            self_treatment_plan: pythonResponse.data.self_treatment_plan,
            doctor_type: pythonResponse.data.doctor_type,
          },
        },
        { new: true } // Return the updated document
      );
      
      await updatedReport.save()
  
      console.log('Updated Result:', updatedReport);

  
      // Return the final result after all updates are done
      res.json({ reportResult: updatedReport, analysisSuccess: true, reportId: reportId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.get_report = async (req, res) => {
    try {
      const reportId = req.params.reportId;
  
      // Find the report by ID
      const report = await ReportAnalysis.findById(reportId);
  
      if (!report) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
      // Respond with the found report
      res.status(200).json({ report: report });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.delete_report = async (req, res) => {
    try {
      const reportId = req.params.reportId;
      const userId = req.params.userId;
  
      // Find and delete the report by ID
      const deletedReport = await ReportAnalysis.findByIdAndDelete(reportId);
  
      if (!deletedReport) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
      // Remove the reportId from the user's properties
      await User.findByIdAndUpdate(
        userId,
        { $pull: { reportAnalysisSet: reportId } }, // Assuming the user's model has a "reports" array containing report IDs
        { new: true }
      );
  
      res.status(200).json({ message: 'Report deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };