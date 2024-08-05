import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Analytics, Close, Info, InfoOutlined, InsertDriveFile, Insights, QueryStats, Troubleshoot, Upload, UploadFile } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Tooltip } from '@mui/material'
import { getUserDetailsFromToken } from '../services/authServices'
import { getUserById } from '../services/userServices'
import * as authActions from "../redux/actions"
import Loader from '../assets/Loader'
import APIResponseStatus from '../components/APIResponseStatus'


function MRIAnalysisPage() {
useEffect(()=>{
        window.scrollTo(0,0)
    },[])
const fileTestInputRef = useRef<any>(null);
const [fileList, setFileList] = useState<any>([]);
const [rerender, setRerender] = useState(false);
const [networkError,setNetworkError] = useState<Boolean>(false)
const [pageLoading, setPageLoading] = useState<any>("not-loaded")

const dispatch = useDispatch()
const navigate = useNavigate()

const myProfiledata = useSelector(
  (state: any) => state.authReducer.myUserProfile
);

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

  return (
    <>{
      pageLoading==="loaded" ?
      <div className='flex flex-col justify-between h-screen'>
      <Navbar activePage ="mri-analysis"/>
      <div className='flex flex-col flex-1 pt-[70px] '>
        <div className='flex flex-col justify-center text-center mt-[50px] w-[80%] mx-auto'>
            <div 
             data-aos="fade-up" 
             data-aos-duration="700" 
            className='text-[50px] text-C11 font-bold league-spartan'> MRI Image Analysis</div>
            <div 
             data-aos="fade-up" 
             data-aos-duration="600" 
            className='text-[16px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas temporibus perspiciatis quisquam autem similique ipsum, modi minus qui officiis asperiores ut quos sint, beatae culpa nostrum ratione reprehenderit quibusdam a!</div>
            <div 
             data-aos="fade-up" 
             data-aos-duration="500" 
            className='mt-[20px] text-[14px] w-[80%] mx-auto text-C11'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, officiis tempore autem maiores debitis soluta nihil consequuntur! Officia quaerat sapiente et perspiciatis consequuntur, nesciunt eveniet doloribus reprehenderit omnis soluta iure!</div>


            {
              !myProfiledata?.username?
                <>
                <Link 
                data-aos="fade-up" 
                data-aos-duration="700" 
                to="/login" className='shadow-md flex flex-row items-center gap-2 px-5 mt-[50px] mx-auto py-2 bg-C11 w-fit text-[14px] text-white font-semibold rounded-[2px]'>Try Now !</Link>
                </>:
                <>
            <input type="file"
            ref={fileTestInputRef}
            className="hidden"
            onChange={handleFileChange}
            disabled={fileList.length>0?true:false}
            accept="image/png, image/gif, image/jpeg"
        
            />   
            <button
            //  data-aos="zoom-in" 
            //  data-aos-duration="700" 
            //  data-aos-once
             onClick={handleFileUpload}
             disabled={fileList.length>0}
             className={`${fileList.length>0?"cursor-not-allowed":"hover:bg-gray-100 "} mt-[50px] gap-2 border-dashed border-spacing-3 flex-col  w-full max-w-[60%]  h-[200px]  border-[3px] border-gray-200 rounded-[8px] mx-auto justify-center items-center flex`}>
                 {
                  fileList.length>0?
                    <InfoOutlined sx={{fontSize:35,color:"#9ca3af"}}/>
                  :
                 <div className='jump-up-and-down'>
                  <Upload sx={{fontSize:35,color:"#9ca3af"}}/>
                </div>
                 }
                 
                <div className='font-semibold text-gray-400 text-[12px]'>
                {fileList.length>0?"Remove the existing file to upload another":"Upload Your Liver MRI image"}
                </div>
            </button>
            {fileList.length > 0 && (
          <div className="flex flex-col  gap-1 max-h-[150px] overflow-y-auto max-w-[60%] mx-auto mt-[10px]">
            {fileList?.map((node: any) => (
              <div className="flex items-center justify-between flex-row gap-5 px-2 py-1 text-[12px] font-semibold bg-gray-100     hover:bg-inactiveC11 text-C11 rounded-[4px]">
                <div className="flex flex-row gap-1 item-center">
                  <div className="w-fit">
                      <InsertDriveFile sx={{ fontSize: 15 }} />
                  </div>
                  <div className=' max-w-[400px] text-ellipsis truncate'>{node.name}</div>
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
            <button
              data-aos="fade-up" 
              data-aos-duration="700" 
              data-aos-once 
              disabled={fileList.length===0}
            className='shadow-md flex flex-row items-center gap-2 px-5 mt-[50px] mx-auto py-2 bg-C11 w-fit text-[14px] text-white font-semibold rounded-[2px]'>
               <div>
                <Troubleshoot sx={{color:"white"}}/>
               </div>
               <div>
                Analyze MRI
               </div>
            </button>
                </>

              
            }

        </div>

      </div>
      <Footer/>
    
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

  )
}

export default MRIAnalysisPage
