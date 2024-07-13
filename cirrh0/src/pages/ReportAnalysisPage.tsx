import React, { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ReportAnalysisPage() {
    useEffect(()=>{
        window.scrollTo(0,0)
      },[])
    const fileInputRef = useRef<any>(null);

  return (
    <div className='flex flex-col justify-between h-screen'>
    <Navbar activePage ="report-analysis"/>
    <div className='flex flex-col flex-1 pt-[70px] '>
    <div className='flex flex-col justify-center text-center mt-[50px] w-[80%] mx-auto'>
    <div 
             data-aos="fade-up" 
             data-aos-duration="800" 
            className='text-[50px] text-C11 font-bold league-spartan'>Title Text</div>
            <div 
             data-aos="fade-up" 
             data-aos-duration="700" 
            className='text-[16px]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptas temporibus perspiciatis quisquam autem similique ipsum, modi minus qui officiis asperiores ut quos sint, beatae culpa nostrum ratione reprehenderit quibusdam a!</div>
            <div 
             data-aos="fade-up" 
             data-aos-duration="600" 
            className='mt-[20px] text-[14px] w-[80%] mx-auto text-C11'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, officiis tempore autem maiores debitis soluta nihil consequuntur! Officia quaerat sapiente et perspiciatis consequuntur, nesciunt eveniet doloribus reprehenderit omnis soluta iure!</div>

           <div className='flex flex-row items-center justify-between gap-3 px-2 py-5 '>
            <div className='min-w-[49%] justify-center flex'>
            <input 
            type="file"
            ref={fileInputRef}
            className="hidden"/>
            <button
              data-aos="zoom-in" 
              data-aos-duration="700" 
            onClick={() => {fileInputRef.current.click();}}
             className='w-[80%] h-[300px]  bg-gray-100 border border-gray-300 hover:border-C11 rounded-[8px]  justify-center items-center flex '>
                Upload LFT Report
            </button>

            </div>
            

            <div
              data-aos="slide-up" 
              data-aos-duration="700" 
             className='min-h-[400px] min-w-[3px] bg-C11 rounded-full'></div>
            <div 
              data-aos="zoom-in" 
              data-aos-duration="700" 
            className='min-w-[49%]'>
                <div className=''>Fill In the Form Giving Appropriate Details</div>
            </div>

           </div>
           
            
            <button 
              data-aos="fade-up" 
              data-aos-duration="800" 
            className='shadow-md px-5 mt-[20px] mx-auto py-2 bg-C11 w-fit text-[14px] text-white font-semibold rounded-[2px]'>
                Analyze Report
            </button>
        </div>

    </div>
    <Footer/>
  
  </div>
  )
}

export default ReportAnalysisPage
