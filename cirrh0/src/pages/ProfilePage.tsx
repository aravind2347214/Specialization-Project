import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function ProfilePage() {
  return (
    <div className='flex flex-col justify-between h-screen'>
      <Navbar activePage ="profile"/>
      <div className='flex flex-col flex-1 pt-[70px] '>

      </div>
      <Footer/>
    
    </div>
  )
}

export default ProfilePage
