import React, { useState } from 'react'
import { LogoIcon } from '../assets/Icons'
import { Link } from 'react-router-dom'
import LogoText from './LogoText'

function Navbar(props:any) {
  const{activePage} = props
  const [login,setLogin] = useState<Boolean>(false)
  const [showProductsMenu,setShowProductsMenu] = useState<Boolean>(false)
  return (
    <div
    data-aos="fade-down" 
    data-aos-duration="900"
    className='min-h-[70px]  z-10 border-b-[0.5px] border-gray-200 text-[14px] fixed backdrop-blur-[5px] min-w-[100vw] z[100] flex items-center bg-[#ffffff48]'>
      <div className='relative z-10 flex flex-row items-center justify-center w-full h-full '>
      <div className='flex flex-row mx-auto w-[80%] justify-between items-center absolute z-20'>
        <Link to='/'>
        <div className='flex flex-row'>
         <LogoIcon/>
        <LogoText look="text-C11 text-[30px]"/>
        </div>
        </Link>
            <div className='flex flex-row gap-[50px] font-semibold relative'>
                <div className={`cursor-pointer ${showProductsMenu?"underline":""}  underline-offset-2 decoration-C11 decoration-2`} onMouseEnter={()=>setShowProductsMenu(true)} >Products</div>
                {
                  showProductsMenu&&
                  <div 
                  onMouseEnter={()=>setShowProductsMenu(true)} 
                  onMouseLeave={()=>setShowProductsMenu(false)}
                  className=' min-w-[200px] absolute rounded-[2px]  flex flex-col p-2 top-[30px] bg-white border-gray-200 border-[0.5px] shadow-lg left-[-10px]'>
                  <Link to="/mri-analysis" className='px-2 py-1 hover:bg-[#a9030628] rounded-[2px]'>MRI Analysis</Link>
                  <Link to="/report-analysis" className='px-2 py-1 hover:bg-[#a9030628] rounded-[2px]'>Report Analyis</Link>

                 </div>
                }
             
                <Link to="/about" className={`${activePage==="about"?"underline":""} cursor-pointer hover:underline underline-offset-2 decoration-C11 decoration-2`} onMouseEnter={()=>setShowProductsMenu(false)}>About</Link>
            </div>
            {
              login?
              <div className='flex flex-row items-center gap-2'>
                <Link to="/profile" className='w-[35px] h-[35px] flex text-[18px] justify-center items-center rounded-full bg-C11   font-semibold text-white'>P</Link>
              </div>:
              <div className='flex flex-row gap-[10px] font-semibold'>
                  <Link to="/login" className='flex items-center px-3 text-white py-[2px] bg-C11 rounded-[2px]'>Login</Link>
                  <Link to="/signup" className='flex items-center px-3 font-semibold hover:bg-[#f2f2f2] py-[2px] text-C11 rounded-[2px]'>Sign Up</Link>
              </div>
            }

        </div>
      </div>

      
    </div>
  )
}

export default Navbar
