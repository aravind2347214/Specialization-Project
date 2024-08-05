import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getUserDetailsFromToken } from '../services/authServices';
import { getUserById } from '../services/userServices';
import * as authActions from "../redux/actions"
import APIResponseStatus from '../components/APIResponseStatus';
import Loader from '../assets/Loader';



  

function HomePage() {
  const [rerender, setRerender] = useState(false);
  const [networkError,setNetworkError] = useState<Boolean>(false)
  const [pageLoading, setPageLoading] = useState<any>("not-loaded")





  const myProfiledata = useSelector(
    (state: any) => state.authReducer.myUserProfile
  );
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

  
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])

  // console.log("MYPROFILE : ",myProfiledata);

  return (
    <>
    {pageLoading==="loaded" ?
        <div className='flex flex-col justify-between h-screen'>
        <Navbar activePage="home"/>
        <div className='flex flex-col flex-1 pt-[70px] '>

          {/* Home Page Hero */}
          <div className='flex flex-col justify-center mx-auto text-center mt-[150px] gap-[10px]'>
            <div
            data-aos="fade-up" 
            data-aos-duration="700"
            className='text-[80px] text-C11 font-bold league-spartan'>Title Text</div>

            <div 
            data-aos="fade-up" 
            data-aos-duration="600"
            className='w-[60%] mx-auto text-[25px]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis necessitatibus aperiam dolorem delectus ea! Ex dignissimos quasi, ipsam officia hic ea maiores magni deserunt eius error quam veniam iusto unde.</div>
            <div
            data-aos="fade-up" 
            data-aos-duration="500" 
            className='text-[14px] w-[50%] mx-auto text-C11'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, officiis tempore autem maiores debitis soluta nihil consequuntur! Officia quaerat sapiente et perspiciatis consequuntur, nesciunt eveniet doloribus reprehenderit omnis soluta iure!</div>
          </div>


          {/* Section 1 */}
          <div className='mx-auto w-[80%] flex flex-row mt-[100px] gap-[50px] items-center'>
            <div
             data-aos="zoom-in" 
             data-aos-duration="900"  
            className='min-w-[500px] min-h-[400px] bg-gray-100 rounded-[2px] justify-center items-center flex border-C11 border-[1px]'>image</div>
            <div className='flex flex-col gap-[20px]'>
              <div className='text-C11 font-semibold text-[35px] league-spartan'
              data-aos="fade-down" 
             data-aos-duration="700"
              >Title Text</div>
              <div
               data-aos="fade-right" 
               data-aos-duration="600" 
              className='text-[18px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet inventore a, ab veniam maxime, alias sed totam quia suscipit voluptatem adipisci pariatur! Iure deleniti, mollitia perferendis beatae et ipsa corrupti!</div>
              <div
              data-aos="fade-up" 
              data-aos-duration="500"  
              className='text-[14px] text-C11'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, quae aperiam reprehenderit ad vero repellendus esse tenetur velit error perspiciatis! Nisi facere cumque possimus dignissimos accusamus nesciunt repellat suscipit est.</div>
            </div>
          </div>


          {/* Section 2 */}
          <div className='mx-auto w-[80%] flex flex-row-reverse mt-[100px] gap-[50px] items-center'>
            <div
            data-aos="zoom-in" 
            data-aos-duration="900"  
            className='min-w-[500px] min-h-[400px] bg-gray-100 rounded-[2px] justify-center items-center flex border-C11 border-[1px]'>image</div>
            <div className='flex flex-col gap-[20px]'>
              <div
              data-aos="fade-down" 
              data-aos-duration="700"
               className='text-C11 font-semibold text-[35px] league-spartan'>Title Text</div>
              <div
               data-aos="fade-left" 
               data-aos-duration="600" 
              className='text-[18px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet inventore a, ab veniam maxime, alias sed totam quia suscipit voluptatem adipisci pariatur! Iure deleniti, mollitia perferendis beatae et ipsa corrupti!</div>
              <div
              data-aos="fade-up" 
              data-aos-duration="500"  
              className='text-[14px] text-C11'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, quae aperiam reprehenderit ad vero repellendus esse tenetur velit error perspiciatis! Nisi facere cumque possimus dignissimos accusamus nesciunt repellat suscipit est.</div>
            </div>
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

export default HomePage
