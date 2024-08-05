const mongoose = require("mongoose");
const mriAnalysisSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    file: {type: mongoose.Schema.Types.ObjectId,ref: 'File'},
    analysis: {type: String},
    inflamation:{type:Number},
    lifestyle_recommendations:[{type:String}],
    precautions:[{type:String}],
    date:{type:Date},
    self_treatment_plan:[{type:String}],
    lifestyle_recommendations:[{type:String}]
    
});
// Add any additional user-related fields here

const MRIAnalysis = mongoose.model("MRIAnalysis", mriAnalysisSchema);

module.exports = MRIAnalysis;