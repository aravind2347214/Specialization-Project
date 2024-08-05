import axios from "axios"
import { ENV } from "../env/environment"

export const getExtractedParameters= async(userId:String,fileURLSet:Array<String>)=>{
    let extractedParameterResult
    axios.post(`${ENV}/get-extracted-parameters`,fileURLSet).then((res:any)=>{
        extractedParameterResult=res.data
    }).catch((err:Error)=>{
        extractedParameterResult=err
        console.log(err)
    })
    return extractedParameterResult
}

export const  analyseReport =(reportAnalysisId:String,userId:String)=>{
    let analysisResult
    axios.post(`${ENV}/analyse-report`,{reportAnalysisId,userId}).then((res:any)=>{
            analysisResult=res.data
            }).catch((err:Error)=>{
                analysisResult=err
               console.log(err)
            })
        return analysisResult
}

export const getReportResultByid = (reportAnalysisId:String)=>{
    let reportResult
    axios.get(`${ENV}/get-mri-report/${reportAnalysisId}`).then((res:any)=>{
        reportResult=res.data
    }).catch((err:Error)=>{
        reportResult=err
        console.log("Error",err)
    })
    return reportResult
}