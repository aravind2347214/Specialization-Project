import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function MRIResultPage() {

    useEffect(() => {
        const queryString = window.location.search;
        console.log(queryString);
        let urlParams = new URLSearchParams(queryString);
        const reportId = urlParams.get("id");
        console.log("ReportID in MRI Report Page : ", reportId);
        // if (taskId) {
        //   getTaskData(taskId)
        // }
        // else{
        //   navigate("*")
        // }
      }, []);


  return (
    <div className='flex flex-col justify-between h-screen'>
    <Navbar activePage ="mri-result"/>
    <div className='flex-1 pt-[70px]  px-[150px] justify-center flex flex-row gap-2'>
    </div>

    <Footer/>
    </div>
  )
}

export default MRIResultPage
