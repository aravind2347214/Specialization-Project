import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getUserDetailsFromToken } from '../services/authServices';
import { getUserById } from '../services/userServices';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import * as authActions from "../redux/actions"
import { FindInPage, ImageSearch } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { Tooltip } from '@mui/material';
import moment from 'moment';


function ProfilePage() {
  const [rerender, setRerender] = useState(false);
  const [networkError,setNetworkError] = useState<Boolean>(false)
  const [pageLoading, setPageLoading] = useState<any>("not-loaded")


  const myProfiledata = useSelector(
    (state: any) => state.authReducer.myUserProfile
  );
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  useEffect(() => {
    const existingUser:any = getUserDetailsFromToken()
    // console.log("EXISITING USER ID : ",existingUser)

    if (existingUser?._id) {
      getMyProfileData(existingUser._id)
    }
    else{
      navigate("/") 
      setPageLoading("loaded")
    }

  }, [rerender]);

  const dummyAnalysisreports=[
    {reportName:"Analysis 1 20th Aug"},
    {reportName:"Analysis 2 23th Aug"},
    {reportName:"Analysis 3 25th Aug"},
    {reportName:"Analysis 4 26th Aug"},
    {reportName:"Analysis 5 30th Aug"},
  ]

  console.log("UserDetails : ",myProfiledata)

  return (
    <div className='flex flex-col justify-between h-screen'>
      <Navbar activePage ="profile"/>
      <div className='flex-1 pt-[70px] lg:px-[100px] xl:px-[150px] justify-center flex flex-col md:flex-row gap-2'>
        <div className='lg:w-1/2 p-10 mt-10  rounded-[2px] items-center flex'>
        <div>
        <div className='p-1 font-bold  w-fit league-spartan text-[50px] text-C11' data-aos="fade-up" data-aos-duration="800">{myProfiledata?.fullName}</div>
        <div className='flex flex-row gap-1 p-1 text-[16px]  px-2 rounded-[2px]'data-aos="fade-up" data-aos-duration="900"><div className='font-semibold text-gray-400 w-[150px]'>Username</div><div className="text-C11 w-[200px]">{myProfiledata?.username}</div></div>
        <div className='flex flex-row gap-1 p-1 text-[16px]  px-2 rounded-[2px]'data-aos="fade-up" data-aos-duration="1000"><div className='font-semibold text-gray-400 w-[150px]'>Age</div><div className="text-C11 w-[200px]">{`${myProfiledata?.age} yrs`}</div></div>
        <div className='flex flex-row gap-1 p-1 text-[16px]  px-2 rounded-[2px]'data-aos="fade-up" data-aos-duration="1200"><div className='font-semibold text-gray-400 w-[150px]'>Email</div><div className="text-C11 w-[200px]">{myProfiledata?.email}</div></div>
        <div className='flex flex-row gap-1 p-1 text-[16px]  px-2 rounded-[2px]'data-aos="fade-up" data-aos-duration="1300"><div className='font-semibold text-gray-400 w-[150px]'>Gender</div><div className="text-C11 w-[200px] capitalize">{myProfiledata?.gender}</div></div>
        </div>
        </div>
        <div className='lg:w-1/2 p-10 mt-10  rounded-[2px]'>
        <div>
          <div className='font-bold league-spartan text-[20px] text-C11 flex flex-row gap-1 items-center ' data-aos="fade-up" data-aos-duration="800"><FindInPage sx={{fontSize:20}}/><div>All Test Analysis Reports</div> </div>
          <div data-aos="fade-up" data-aos-duration="900" className='flex flex-col gap-2 max-h-[150px] overflow-y-auto pl-[20px] mt-[10px]'>
            {myProfiledata?.reportAnalysisSet.map((node:any, index:any) => (
            <Tooltip title="View Result" placement='right' arrow>
              <Link to={`/report-result?id=${node._id}`} className='cursor-pointer p-1  px-2 hover:hover:bg-[#a9030628] transition-all duration-[0.1s] text-[14px] hover:border-l-[5px] hover:border-C11   hover:font-semibold hover:underline underline-offset-1' key={index} >
              {`${moment(node.date).format('llll')}`}
              </Link>
            </Tooltip>
           ))}
          </div>

          <div data-aos="fade-up" data-aos-duration="1000" className='font-bold league-spartan text-[20px] mt-10 text-C11 flex gap-1 flex-row items-center'><ImageSearch sx={{fontSize:20}}/><div>All Image Analysis Reports</div></div>
          <div data-aos="fade-up" data-aos-duration="1200" className='flex flex-col gap-2 max-h-[150px] overflow-y-auto pl-[20px] mt-[10px]'>
          {dummyAnalysisreports.map((node:any, index:any) => (
            <Tooltip title="View Report" placement='right' arrow>
              <Link to={`/mri-result?id=${node.reportName}`} className='cursor-pointer p-1  px-2 hover:hover:bg-[#a9030628] transition-all duration-[0.1s] text-[14px] hover:border-l-[5px] hover:border-C11   hover:font-semibold hover:underline underline-offset-1' key={index} >{node?.reportName}</Link>
            </Tooltip>
            ))}
          </div>
        </div>
        
        



        </div>
        


      </div>
      <Footer/>
    
    </div>
  )
}

export default ProfilePage
