const mongoose = require("mongoose");
const mriAnalysisSchema = new mongoose.Schema({

    userId: { type: mongoose.Schema.Types.ObjectId,ref: 'User'},
    file: { type: String },
    analysis: {type: String},
    inflamation:{type:Number},
    lifestyle_recommendations:[{type:String}],
    precautions:[{type:String}],
    date:{type:Date},
    self_treatment_plan:[{type:String}],
    doctor_type:[{type:String}]
    
});
// Add any additional user-related fields here

const MRIAnalysis = mongoose.model("MRIAnalysis", mriAnalysisSchema);

module.exports = MRIAnalysis;