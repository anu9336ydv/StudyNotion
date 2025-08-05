import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/core/Dashboard/Sidebar'
import { useSelector } from 'react-redux'
import { GoSidebarExpand } from 'react-icons/go'

export const Dashboard = () => {
    const {loading:authLoading}= useSelector((state)=>state.auth)
    const {loading:profileLoading}= useSelector((state)=>state.profile)

    if(profileLoading || authLoading){
        return(
            <div className='flex min-h-[calc(100vh-3.5rem)] items-center justify-center'>
            <div className='loader '></div>
             </div>
        )
    }
  return (
    
         <div className=' relative flex min-h-[calc(100vh-3.5rem)]'>

        <Sidebar/>
        <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto  '>
            <div className='mx-auto  pl-10 md:pl-0 py-10  w-11/12 max-w-[1000px] '>
                <Outlet/>
            </div>
        </div>

       </div>
    
   
  )
}
