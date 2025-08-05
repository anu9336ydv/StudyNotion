import React, { useState } from 'react'
import {sidebarLinks} from '../../../data/dashboard-links'
import { logout } from '../../../services/operation/authApi'
import { useDispatch, useSelector } from 'react-redux'
import { SidebarLinks } from './SidebarLinks'
import { useNavigate } from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import { ConfirmationModal } from '../../common/ConfirmationModal'
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";

export const Sidebar = () => {
    const{user,loading:profileLoading}=useSelector((state)=>state.profile);
    const{loading:authLoading}= useSelector((state)=>state.auth)
    const dispatch= useDispatch()
    const navigate= useNavigate()
    const [confirmationModal, setConfirmationModal] = useState(null)
    const[open,setOpen]=useState(false)
    
    if(profileLoading || authLoading){
        return(
            <div className='flex min-h-[calc(100vh-3.5rem)] items-center justify-center'>
            <div className='loader '></div>
             </div>
        )
    }
  return (
    <div className=''>
         
        <div className={` z-[10000] md:z-0 absolute md:relative flex-col md:min-w-[222px] flex border-r border-r-richblack-700  h-[calc(100vh-3.5rem)] md:bg-richblack-800 py-10 transition-transform ease-in duration-0 delay-1000 bg-opacity-10 backdrop-blur-sm md:bg-opacity-100 md:backdrop-blur-none`}>
        <div onClick={()=>setOpen(!open)} className='px-2 absolute top-3 visible md:hidden'>
            {
                open===true ? (<GoSidebarCollapse className='text-white text-lg'/>):(<GoSidebarExpand className='text-white text-lg'/>)
            }
            
            </div>
            <div className='flex flex-col'>
                {
                   sidebarLinks.map((link)=>{
                    if(link.type && user?.accountType!== link.type )return null
                    return(
                        <SidebarLinks open={open} key={link.id} link={link} iconName={link.icon}/>
                    )
                   })
                }
          

            </div>
           
           <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

           <div className='flex flex-col'>
                <SidebarLinks open={open} link={{name:"Settings",path:"dashboard/settings"}}
                iconName="VscSettingsGear"/>

                <button onClick={()=>setConfirmationModal({
                        text1:"Are You Sure",
                        text2:"You will be logged out o your account",
                        btn1text:"Logout",
                        btn2text:"Cancle",
                        btn1Handler:()=> dispatch(logout(navigate)),
                        btn2Handler:()=>setConfirmationModal(null),

                })}
                className='text-sm px-2 md:px-8 py-2 font-medium text-richblack-300'
                >
                    <div className='flex items-center gap-x-2'>
                        <VscSignOut className='text-lg'/>
                        <span className='md:hidden visible transition-transform ease-in duration-0' >{
                                open===true ?"Logout":""
                            }</span>
                            <span className=' hidden md:flex '>
                                Logout
                            </span>

                    </div>
                </button>
           </div>



        </div>
        {confirmationModal&&<ConfirmationModal modalData={confirmationModal} />}

    </div>
  )
}
