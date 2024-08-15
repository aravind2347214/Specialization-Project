const axios = require('axios')

exports.analyze_mri = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { imageURL } = req.body;

    // Create a new MRI analysis document
    const newMRIReport = new MRIAnalysis({
      userId: userId,
      file: imageURL,
      analysis: null,
      inflamation: null,
      lifestyle_recommendations: [],
      precautions: [],
      date: new Date(), // Corrected: new Date() gives the current date and time
      self_treatment_plan: [],
      doctor_type: []
    });

    // Save the new MRI report
    await newMRIReport.save();

    // Update the user document by adding the MRI report ID to the mriAnalysisSet array
    await User.findByIdAndUpdate(
      userId,
      { $push: { mriAnalysisSet: newMRIReport._id } }, // Assuming mriAnalysisSet is the correct field name
      { new: true }
    );

    // Send the imageURL to the Python server for analysis
    const pythonResponse = await axios.post("pythonURL", { imageURL });

    // Update the MRI report with the analysis results from the Python server
    const updatedReport = await MRIAnalysis.findByIdAndUpdate(
      newMRIReport._id,
      {
        $set: {
          analysis: pythonResponse.data.analysis,
          inflamation: pythonResponse.data.inflamation,
          lifestyle_recommendations: pythonResponse.data.lifestyle_recommendations,
          precautions: pythonResponse.data.precautions,
          self_treatment_plan: pythonResponse.data.self_treatment_plan,
          doctor_type: pythonResponse.data.doctor_type,
        },
      },
      { new: true } // Return the updated document
    );

    // Return the updated MRI report
    res.json({ mriResult: updatedReport, analysisSuccess: true });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.get_mri = async (req, res) => {
  try {
    const mriId = req.params.mriId; // Assuming the MRI report ID is passed as a URL parameter

    // Find the MRI report by ID
    const mriReport = await MRIAnalysis.findById(mriId);

    if (!mriReport) {
      return res.status(404).json({ message: 'MRI report not found' });
    }

    // Respond with the found MRI report
    res.status(200).json({ mriReport });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.delete_mri = async (req, res) => {
  try {
    const mriId = req.params.mriId; // Assuming the MRI report ID is passed as a URL parameter
    const userId = req.params.userId; // Assuming the user ID is passed as a URL parameter

    // Find and delete the MRI report by ID
    const deletedMRI = await MRIAnalysis.findByIdAndDelete(mriId);

    if (!deletedMRI) {
      return res.status(404).json({ message: 'MRI report not found' });
    }

    // Remove the MRI ID from the user's mriAnalysisSet array
    await User.findByIdAndUpdate(
      userId,
      { $pull: { mriAnalysisSet: mriId } }, // Assuming mriAnalysisSet is the correct field name
      { new: true }
    );

    res.status(200).json({ message: 'MRI report was deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};