import axios from "axios"
import { ENV } from "../env/environment"

export const getExtractedParameters= async(userId:String,fileURLSet:Array<String>)=>{
    let extractedParameterResult
    axios.post(`${ENV}/add-files-to-report/${userId}`,fileURLSet).then((res:any)=>{
        extractedParameterResult=res.data
    }).catch((err:Error)=>{
        extractedParameterResult=err
        console.log(err)
    })
    return extractedParameterResult
}

export const  analyseReportById =(reportAnalysisId:String,validatedReportData:Object)=>{
    let analysisResult
    axios.post(`${ENV}/analyze_report/${reportAnalysisId}`,validatedReportData).then((res:any)=>{
            analysisResult=res.data
            }).catch((err:Error)=>{
                analysisResult=err
               console.log(err)
            })
        return analysisResult
}

export const getReportResultById = (reportAnalysisId:String)=>{
    let reportResult
    axios.get(`${ENV}/get-mri-report/${reportAnalysisId}`).then((res:any)=>{
        reportResult=res.data
    }).catch((err:Error)=>{
        reportResult=err
        console.log("Error",err)
    })
    return reportResult
}

export const deleteReportById = (reportAnalysisId:String)=>{
    let deleteReportResult
    axios.delete(`${ENV}/delete-report/${reportAnalysisId}`).then((res:any)=>{
        deleteReportResult=res.data
        }).catch((err:Error)=>{
            deleteReportResult=err
        })

        return deleteReportResult
}