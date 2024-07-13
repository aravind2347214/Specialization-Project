import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function AboutPage() {
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
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
