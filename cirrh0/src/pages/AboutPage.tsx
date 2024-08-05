import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { getUserDetailsFromToken } from '../services/authServices'
import { getUserById } from '../services/userServices'
import * as authActions from "../redux/actions"


function AboutPage() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  const [rerender, setRerender] = useState(false);
  const [networkError,setNetworkError] = useState<Boolean>(false)
  const [pageLoading, setPageLoading] = useState<any>("not-loaded")

  const dispatch = useDispatch()
  const navigate = useNavigate()

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


  return (
    <div className='flex flex-col justify-between h-screen'>
      <Navbar activePage ="about"/>
      <div className='flex flex-col flex-1 pt-[70px] '>
      <div className='flex flex-col justify-center text-center mt-[50px] w-[80%] mx-auto'>
      <div 
             data-aos="fade-up" 
             data-aos-duration="700" 
            className='text-[50px] text-C11 font-bold league-spartan'>Title Text</div>
            <div 
             data-aos="fade-up" 
             data-aos-duration="600" 
            className='text-[16px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas temporibus perspiciatis quisquam autem similique ipsum, modi minus qui officiis asperiores ut quos sint, beatae culpa nostrum ratione reprehenderit quibusdam a!</div>
            <div 
             data-aos="fade-up" 
             data-aos-duration="500" 
            className='mt-[20px] text-[14px] w-[80%] mx-auto text-C11'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, officiis tempore autem maiores debitis soluta nihil consequuntur! Officia quaerat sapiente et perspiciatis consequuntur, nesciunt eveniet doloribus reprehenderit omnis soluta iure!</div>

     
      </div>
      </div>
      <Footer/>
    
    </div>
  )
}

export default AboutPage
