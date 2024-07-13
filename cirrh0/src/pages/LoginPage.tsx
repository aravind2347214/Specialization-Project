import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LogoText from '../components/LogoText'

function LoginPage() {
  const [showPassword,setShowPassword] = useState<Boolean>(false)
  return (
    <div className='flex justify-center'>
      <div className='flex flex-col mx-auto  min-w-[400px] mt-[150px] gap-3 p-2'>
        <div className='text-center'>
        <LogoText look={"text-C11 text-[70px] "}/>
        </div>
        <input type="text" className='px-3 py-2 bg-gray-100 outline-C11' placeholder='Username' />
        <div className=' pr-1 flex flex-row w-full bg-gray-100 border-transparent border-[2px] focus-within:border-C11 rounded-[2px]'>
        <input type={`${showPassword?"text":"password"}`} className='flex-1 px-3 py-2 bg-gray-100 outline-none rounded-[2px] ' placeholder='Password' />
        <button onClick={()=>setShowPassword(!showPassword)} >
        {
          showPassword?
          <div >hide</div>:
          <div>show</div>
        }
        </button>
        </div>
        <button className=' my-[10px] px-2 py-1 font-semibold text-white bg-C11'>Login</button>
        <div className='text-center text-[11px]'>Are you new to Cirrh0 ? <Link className='hover:underline text-C11 ' to="/signup">Sign up</Link></div>
        <div className='text-center text-[11px]'><Link className='hover:underline text-C11' to="/">Home</Link></div>

        
      </div>
      
    </div>
  )
}

export default LoginPage
