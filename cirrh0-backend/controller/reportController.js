const { NLP_BASE_URL, REPORT_BASE_URL } = require("../env/dotenv");
const ReportAnalysis = require("../model/reportsAnalysis");
const User = require("../model/user");
const axios = require('axios')

exports.report_add_files = async (req, res) => {
    try {
      const userId = req.params.userId
      const fileURLSet = req.body.fileURLSet
      // create a new mriAnalysis instance
      const newReportAnalysis = new ReportAnalysis({
        userId: userId,
        files: fileURLSet,
        analysis: null,
        stage:null,
        ascites:null,
        edema:null,
        spiders:null,
        hepatomegaly:null,
        bilirubin:null,
        albumin:null,
        sgot:null,
        age:null,
        sex:null,
        tryglycerides:null,
        prothrombinTime:null,
        date: new Date().now(),
        copper:null,
        alk_phos:null,
        lifestyle_recommendations:[],
        precautions:[],
        self_treatment_plan:[],
        doctor_type:[]
    });

      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({ message: 'User not found',addSuccess:false });
      }
      
      
      await User.findByIdAndUpdate(
        userId,
        { $push: { reportAnalysisSet: newReportAnalysis._id } },
        { new: true }
      );
      
      // sending the file urlset and the user id and project id to python Server 
      axios.push(NLP_BASE_URL,fileURLSet).then((res)=>{
        // this should give the extracted parameters and we return this back to the frontend, with the validated parameters
        const extractedData = res.data
        return res.json({extractSuccess:true,extractedData:extractedData})

      }).catch((err)=>{
        console.log("Extract Failure : ",err)
        return res.status(500).json({extractSuccess:false,extractedData:err})
      })

      res.status(200).json({ message: 'Files added and etracted details' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  exports.analyze_report = async (req, res) => {
    try {
      const reportId = req.params.reportId;
      const validatedData = req.body.validatedData;
  
      // Update each field individually
      let updatedReport = await ReportAnalysis.findByIdAndUpdate(
        reportId,
        {
          $set: {
            ascites: validatedData.ascites,
            edema: validatedData.edema,
            spider: validatedData.spiders,
            hepatomegaly: validatedData.hepatomegaly,
            bilirubin: validatedData.bilirubin,
            albumin: validatedData.albumin,
            prothrombin: validatedData.prothrombin,
            copper: validatedData.copper,
            alk_phos: validatedData.alk_phos,
            platelets:validatedData.platelets,
            sex:validatedData.sex,
            age:validatedData.age,
            tryglycerides:validatedData.tryglycerides,
            sgot:validatedData.sgot,
            cholesterol:validatedData.cholesterol

          },
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedReport) {
        return res.status(404).json({ message: 'Report not found' });
      }
  
      // Sending the validated data to the Python server for modeling
      const pythonResponse = await axios.post(REPORT_BASE_URL, validatedData);
      pythonResponse = await JSON.parse()
  
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
  
      res.json({ reportResult: updatedReport, analysisSuccess: true });
  
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