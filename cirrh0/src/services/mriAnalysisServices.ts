import axios from "axios"
import { ENV } from "../env/environment"

export const  analyseReport =(mriAnalysisId:String,userId:String,fileURL:String)=>{
    let analysisResult
    axios.post(`${ENV}/analyse-report`,{mriAnalysisId,userId,fileURL}).then((res:any)=>{
            analysisResult=res.data
            }).catch((err:Error)=>{
                analysisResult=err
               console.log(err)
        })
    return analysisResult
}

export const getMriResultByid = (mriAnalysisId:String)=>{
    let mriResult
    axios.get(`${ENV}/get-mri-report/${mriAnalysisId}`).then((res:any)=>{
        mriResult=res.data
    }).catch((err:Error)=>{
        mriResult=err
        console.log("Error",err)
    })
    return mriResult
}