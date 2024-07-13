import React, { useState } from 'react'
import LogoText from '../components/LogoText'
import { Link } from 'react-router-dom'

function SignupPage() {
  const [showPassword,setShowPassword] = useState<Boolean>(false)

  return (
<div className='flex justify-center'>
      <div className='flex flex-col mx-auto  w-[500px] mt-[120px] gap-3 p-2'>
        <div className='text-center'>
        <LogoText look={"text-C11 text-[70px] "}/>
        </div>
        <div className='flex flex-row gap-3'>
        <input type="text" className='flex-1 w-[80%] px-3 py-2 bg-gray-100 outline-C11' placeholder='Full Name' />
        <input type="number" className='px-3 w-[100px] py-2 bg-gray-100 outline-C11' placeholder='Age' />
        </div>

 
        <input type="text" className='px-3 py-2 bg-gray-100 outline-C11' placeholder='Email' />


        <input type="text" className='px-3 py-2 bg-gray-100 outline-C11' placeholder='Username' />
        <div className=' pr-1 flex flex-row w-full bg-gray-100 border-transparent border-[2px] focus-within:border-C11 rounded-[2px]'>
        <input type={`${showPassword?"text":"password"}`} className='flex-1 px-3 py-2 bg-gray-100 outline-none rounded-[3px] ' placeholder='Password' />
        <button onClick={()=>setShowPassword(!showPassword)} >
        {
          showPassword?
          <div >hide</div>:
          <div>show</div>
        }
        </button>
        </div>
        <input type="password" className='flex-1 px-3 py-2 bg-gray-100 outline-C11 rounded-[2px] ' placeholder='Confirm Password' />

        <button className=' my-[10px] px-2 py-1 font-semibold text-white bg-C11'>Sign Up</button>
        <div className='text-center text-[11px]'>Already Have an Account? <Link className='hover:underline text-C11 font-semi' to="/login">Login</Link></div>
        <div className='text-center text-[11px]'><Link className='hover:underline text-C11' to="/">Home</Link></div>

        
      </div>
      
    </div>
  )
}

export default SignupPage
