import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AttachFile, Close, FolderZip, Image, Info, InfoOutlined, InsertDriveFile, Troubleshoot, Upload, UploadFile } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@mui/material";
import { getUserDetailsFromToken } from "../services/authServices";
import * as authActions from "../redux/actions"
import { getUserById } from "../services/userServices";
import Loader from "../assets/Loader";
import APIResponseStatus from "../components/APIResponseStatus";
import { reverse } from "dns";
import { CLOUDINARY_CLOUDNAME } from "../env/environment";
import axios from "axios";
import { getExtractedParameters } from "../services/reportAnalysisServices";
import ReportResultModal from "../modals/ReportResultModal";


function ReportAnalysisPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const fileTestInputRef = useRef<any>(null);
  const [fileList, setFileList] = useState<any>([]);
  const [rerender, setRerender] = useState(false);
  const [networkError,setNetworkError] = useState<Boolean>(false)
  const [pageLoading, setPageLoading] = useState<any>("not-loaded")
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [resultStatus,setResultStatus] = useState<String>("result-loaded")



  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const existingUser:any = getUserDetailsFromToken()
    // console.log("EXISITING USER ID : ",existingUser)

    if (existingUser?._id) {
      getMyProfileData(existingUser._id)
    }
    else{
      
      setPageLoading("loaded")
    }

  }, [rerender]);

  const getMyProfileData =async(myUserId:any)=>{
    await getUserById(myUserId).then((res:any)=>{
      // console.log("in TASKPAGE RETURNED TASK ",res.code);
      if(res.code==="ERR_NETWORK"){
        setNetworkError(true)
        console.error("NETWORK ERROR ")
        setPageLoading("error")
      }
      else{
        setPageLoading("loaded")
        dispatch(authActions.loginAction(res))
      }
    }).catch((err:any)=>{
      console.error(err)
    })
}

  const myProfiledata = useSelector(
    (state: any) => state.authReducer.myUserProfile
  );

 


  const handleFileUpload = () => {
    fileTestInputRef.current.click();
  };

  const handleFileChange = (event:any) => {
    const newFiles = Array.from(event.target.files);
    setFileList((prevList:any) => [...prevList, ...newFiles]);
  };

  const removeItemFromFileList = (node: any) => {
    let newList = fileList.filter((item: any) => item !== node);
    setFileList(newList);
  };

  const uploadToCloudinary = async()=>{
    try {
      const uploadPromises = fileList.map(async (file: any) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "image_preset");
  
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUDNAME}/auto/upload`,
          data
        );
  
        return response.data.secure_url;
      });
  
      // Wait for all uploads to complete before returning
      const uploadedMediaData = await Promise.all(uploadPromises);
  
      return uploadedMediaData;
    } catch (error:any) {
      console.log("ERROR IN UPLOADING TO CLOUDINARY", error);
      setLoading(false);
      setError(error?.message || "Could not Upload To Cloud");
    }
}

const handleExtractParameters = async()=>{
  window.scrollTo(300,300)
  if(fileList.length===0){
    setError("Add atleast one media")
  }
  else{
    setLoading(true);
    try {
      await uploadToCloudinary().then(async(res:any)=>{
        console.log("MEDIA UPLOAD RESULT : ",res)
        setLoading(false);
        await getExtractedParameters(myProfiledata?._id,res).then((res:any)=>{
          console.log("(INREACT) UPLOAD MEDIA RESULT: ", res);

          if(res.addSuccess){
           
            setFileList([]);
            // setAddMediaModal(false);
            // triggerRerender();
          }
          else{
            setLoading(false);
            setError("Something went wrong");
          }
  
        }).catch((err:any)=>{
          console.log("(INREACT) UPLOAD MEDIA ERROR: ", err);
  
        })
      }).catch((err:any)=>{
        console.log("MEDIA UPLOAD ERROR INCLOUDINARY : ",err)
      })

    } catch (err:any) {
      setLoading(false);
      setError(err?.message || "Something went wrong");
    }
  }
   


}

useEffect(() => {
  if(loading){
    document.body.style.overflow = "hidden";
  }
  else{
      document.body.style.overflow = "scroll"
  };
}, [loading]);


  

  return (
    <>{
      pageLoading==="loaded"?
      <div className="flex flex-col justify-between h-screen">
         {
            loading?
            <div className="absolute min-w-[100vw] top-0 left-0  z-[100] min-h-[100vh] bg-[#0000005f] justify-center flex items-center">
              <Loader/>
            </div>:
            null
          }
      <Navbar activePage="report-analysis" />
      <div className="flex flex-col flex-1 pt-[70px] ">
        <div className="flex flex-col justify-center text-center mt-[50px] lg:w-[80%] mx-auto relative">


          <div
            data-aos="fade-up"
            data-aos-duration="800"
            className="text-[50px] text-C11 font-bold league-spartan"
          >
            Report Analysis
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="700"
            className="text-[16px]"
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas
            temporibus perspiciatis quisquam autem similique ipsum, modi minus
            qui officiis asperiores ut quos sint, beatae culpa nostrum ratione
            reprehenderit quibusdam a!
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="600"
            className="mt-[20px] text-[14px] w-[80%] mx-auto text-C11"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
            officiis tempore autem maiores debitis soluta nihil consequuntur!
            Officia quaerat sapiente et perspiciatis consequuntur, nesciunt
            eveniet doloribus reprehenderit omnis soluta iure!
          </div>
          {!myProfiledata?.username ? (
            <>
              <Link
                data-aos="fade-up"
                data-aos-duration="700"
                to="/login"
                className="shadow-md flex flex-row items-center gap-2 px-5 mt-[50px] mx-auto py-2 bg-C11 w-fit text-[14px] text-white font-semibold rounded-[2px]"
              >
                Try Now !
              </Link>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center justify-between gap-3 px-2 py-5 ">
                <div className="min-w-[49%] justify-center flex flex-col gap-[10px]   mx-auto">
                  <input
                    type="file"
                    ref={fileTestInputRef}
                    className="hidden"
                    accept="application/pdf"
                    onChange={handleFileChange}
                  />
        
                  <button
                    data-aos="fade-up"
                    data-aos-duration="700"
                    onClick={handleFileUpload}
                    className={`h-[200px] flex-col hover:bg-gray-100 border-dashed border-gray-300 border-[3px] rounded-[8px]  justify-center items-center flex `}
                  >
                    <div className="jump-up-and-down">
                      <Upload sx={{ fontSize: 35, color: "#9ca3af" }} />
                    </div>
                    <div className="font-semibold text-gray-400 text-[12px]">
                      {`${fileList.length>0?"Add More Files":"Upload All Related Test Reports (PDFs)"}`}
                    </div>
                  </button>

            {fileList.length > 0 && (
          <div className="flex flex-col  gap-1 max-h-[150px] overflow-y-auto">
            {fileList?.reverse().map((node: any) => (
              <div className="flex items-center justify-between flex-row  px-2 py-1 text-[12px] font-semibold bg-gray-100 w-fit gap-5 mx-auto hover:bg-inactiveC11 text-C11 rounded-[4px]">
                <div className="flex flex-row gap-1 item-center">
                  <div className="w-fit">
                      <InsertDriveFile sx={{ fontSize: 15 }} />
                  </div>
                  <div className=' w-[200px] max-w-[200px] text-left text-ellipsis truncate'>{node.name}</div>
                </div>

                <Tooltip title="Remove File" arrow placement="right">
                  <button
                  // className={`${loading?"cursor-not-allowed":"cursor-pointer"}`}
                  // disabled={loading?true:false} 
                  onClick={() => removeItemFromFileList(node)}>
                    <Close sx={{ fontSize: 15 }} />
                  </button>
                </Tooltip>
              </div>
            ))}
          </div>
        )}
                
                </div>
                

                <div>
                <div className="flex flex-row items-center gap-1 mt-5 text-C11">
                  <InfoOutlined sx={{fontSize:16}}/>
                  <div
                    data-aos="fade-up" 
                    data-aos-duration="800"  
                  className=" flex flex-col text-[12px] justify-center gap-[5px]">
                Certain parameters within these documents are required to conduct the analysis.There could be errors on the extracted values
                </div>
                  </div>

                  
                  <button
                       data-aos="fade-up"
                        onClick={handleExtractParameters}
                       data-aos-duration="900" 
                       data-aos-once 
                       disabled={fileList.length<1}
                  className="shadow-md flex flex-row gap-2 px-5 mt-[20px] mx-auto py-2 bg-C11 w-fit text-[14px] text-white font-semibold rounded-[2px]">
                    Extract Report Parameters
                  </button>
                </div>
              </div>

              <div className="flex flex-row justify-between gap-[20px]  px-[100px] mt-[50px]">
                <div className="flex flex-col gap-[20px]">
                  <div
                  data-aos="fade-up" 
                  data-aos-duration="1000" 
                  data-aos-once 
                  className="flex flex-col justify-start mt-3">
                    <div className="text-left text-C11  text-[18px]">
                      {" "}
                      Do you have <strong> Ascites</strong>?
                    </div>
                    <div className="text-left">
                      Description about what that dicease is{" "}
                    </div>
                    <select className=" w-[100px] py-2 px-2 mt-[5px]  rounded-[2px] text-[12px] bg-gray-100 border border-gray-300 outline-none focus:border-C11">
                      <option value="Y">Yes</option>
                      <option value="N">No</option>
                    </select>
                  </div>

                  <div
                  data-aos="fade-up" 
                  data-aos-duration="1200" 
                  data-aos-once
                   className="flex flex-col justify-start mt-3">
                    <div className="text-left text-C11  text-[18px]">
                      {" "}
                      Do you have <strong> Edema</strong>?
                    </div>
                    <div className="text-left">
                      Description about what that dicease is{" "}
                    </div>
                    <select className=" w-[200px] py-2 px-2 mt-[5px]  rounded-[2px] text-[12px] bg-gray-100 border border-gray-300 outline-none focus:border-C11">
                      <option value="Y">Edema Desipite Diuretic Therapy</option>
                      <option value="S">Edema Present Without Diuretics or Edema Resolved by Diuretics</option>
                      <option value="N">No Edema and No Diuretic Therapy for Edema</option> 
                    </select>
                  </div>

                  <div
                  data-aos="fade-up" 
                  data-aos-duration="1100" 
                  data-aos-once
                  className="flex flex-col justify-start mt-3">
                    <div className="text-left text-C11  text-[18px]">
                      {" "}
                      Do you have <strong> Spiders</strong>?
                    </div>
                    <div className="text-left">
                      Description about what that dicease is{" "}
                    </div>
                    <select className=" w-[100px] py-2 px-2 mt-[5px]  rounded-[2px] text-[12px] bg-gray-100 border border-gray-300 outline-none focus:border-C11">
                      <option value="Y">Yes</option>
                      <option value="N">No</option>
                    </select>
                  </div>

                  <div
                  data-aos="fade-up" 
                  data-aos-duration="1200" 
                  data-aos-once
                   className="flex flex-col justify-start mt-3">
                    <div className="text-left text-C11  text-[18px]">
                      {" "}
                      Do you have <strong> Hepatomegaly</strong>?
                    </div>
                    <div className="text-left">
                      Description about what that dicease is{" "}
                    </div>
                    <select className=" w-[100px] py-2 px-2 mt-[5px] rounded-[2px] text-[12px] bg-gray-100 border border-gray-300 outline-none focus:border-C11">
                      <option value="Y">Yes</option>
                      <option value="N">No</option>
                    </select>
                  </div>
                </div>

                <div
                data-aos="fade-up" 
                data-aos-duration="800" 
                data-aos-once 
                className="w-1/2">
                  <div className="font-bold league-spartan text-C11 text-[25px]">
                    Analysis Parameters
                  </div>
                 
                  <div 
                     data-aos="fade-up" 
                     data-aos-duration="900"
                     data-aos-once  
                  className="flex flex-wrap gap-[30px]">
                    <div
                 
                     className="flex flex-col justify-start w-[100px] mt-3">
                      <div className="text-left text-C11  text-[10px]">
                        Bilirubin
                      </div>
                      <input
                        type="text"
                        className="border-gray-300 border py-2 px-2 bg-gray-100  rounded-[2px] text-[12px] outline-none focus:border-C11"
                      />
                    </div>

                    <div className="flex flex-col justify-start w-[100px] mt-3 ">
                      <div className="text-left text-C11  text-[10px]">
                        Albumin
                      </div>
                      <input
                        type="text"
                        className=" border-gray-300 border py-2 px-2 bg-gray-100 outline-none focus:border-C11 rounded-[2px] text-[12px]"
                      />
                    </div>

                    <div className="flex flex-col justify-start w-[100px] mt-3">
                      <div className="text-left text-C11  text-[10px]">
                        Copper
                      </div>
                      <input
                        type="text"
                        className=" border-gray-300 border py-2 px-2 bg-gray-100 outline-none focus:border-C11 rounded-[2px] text-[12px]"
                      />
                    </div>

                    <div className="flex flex-col justify-start w-[100px] mt-3">
                      <div className="text-left text-C11  text-[10px]">
                        Alk_Phos
                      </div>
                      <input
                        type="text"
                        className="border-gray-300 border py-2 px-2 bg-gray-100 outline-none focus:border-C11 rounded-[2px] text-[12px]"
                      />
                    </div>

                    <div className="flex flex-col justify-start w-[100px] mt-3">
                      <div className="text-left text-C11  text-[10px]">
                        SGOT
                      </div>
                      <input
                        type="text"
                        className="border-gray-300 border py-2 px-2 bg-gray-100 outline-none focus:border-C11 rounded-[2px] text-[12px]"
                      />
                    </div>

                    <div className="flex flex-col justify-start w-[100px] mt-3">
                      <div className="text-left text-C11  text-[10px]">
                        Tryglicerides
                      </div>
                      <input
                        type="text"
                        className="border-gray-300 border py-2 px-2 bg-gray-100 outline-none focus:border-C11 rounded-[2px] text-[12px]"
                      />
                    </div>

                    <div className="flex flex-col justify-start w-[100px] mt-3">
                      <div className="text-left text-C11  text-[10px]">
                        Platelets
                      </div>
                      <input
                        type="text"
                        className="border-gray-300 border py-2 px-2 bg-gray-100 outline-none focus:border-C11 rounded-[2px] text-[12px]"
                      />
                    </div>

                    <div className="flex flex-col justify-start w-[100px] mt-3">
                      <div className="text-left text-C11  text-[10px]">
                        Prothrombin
                      </div>
                      <input
                        type="text"
                        className="border-gray-300 border py-2 px-2 bg-gray-100 outline-none focus:border-C11 rounded-[2px] text-[12px]"
                      />
                    </div>
                  </div>
                  <div
                     data-aos="fade-up" 
                     data-aos-duration="1000"
                     data-aos-once 
                   className="flex flex-row items-center gap-1 mt-5 text-C11">
                  <InfoOutlined sx={{fontSize:16}}/>
                  <div className=" flex flex-col text-[12px] justify-center gap-[5px]">
                  Please Note that all values are authentic and please cross check with the actual document 
                </div>
                  </div>
                </div>
              </div>
              <button
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-once
                className="shadow-md flex flex-row gap-2 px-5 mt-[20px] mx-auto py-2 bg-C11 w-fit text-[14px] text-white font-semibold rounded-[2px]"
              >
                <div>
                  <Troubleshoot sx={{ color: "white" }} />
                </div>
                <div>Analyze Report</div>
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>:
     pageLoading==="not-loaded"?
     <div className="w-[100vw] h-[100vh] flex justify-center items-center">
     <div className="flex justify-center text-[16px] font-light flex-col ">
         <Loader/>
     </div>
     </div>:
       <div className="flex items-center justify-center flex-1 w-full h-[100vh]">
       <APIResponseStatus status={false} message={`${networkError?"Network Error":"An Error Occured"}`}/>
       </div>

    }
    
    </>

  );
}

export default ReportAnalysisPage;

