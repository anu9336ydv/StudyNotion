import React from 'react'
import * as Icons from 'react-icons/vsc'
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';


export const SidebarLinks = ({link,iconName,open}) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch  = useDispatch();
    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname);
    }
  return (
   <NavLink to={link.path}
   className={` relative px-2 md:px-8 py-2 text-sm text-richblack-300 font-medium ${matchRoute(link.path) ?"bg-yellow-800 text-yellow-50 bg-opacity-70 backdrop-blur-sm md:bg-opacity-100 md:backdrop-blur-none ":"bg-opacity-0"}`}>

    <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path) ?"bg-opacity-100":"bg-opacity-0"}
    `}></span>

    <div className='flex items-center gap-x-2'>
        <Icon className="text-lg"/>
        <span className='md:hidden visible transition-transform ease-in duration-0 delay-1000 ' >{
            open===true ?(link.name):("")
        }</span>
        <span className=' hidden md:flex '>
            {link.name}
        </span>

    </div>



   </NavLink>
  )
}
