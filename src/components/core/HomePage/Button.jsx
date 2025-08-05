import React from 'react'
import { Link } from 'react-router-dom'

export const CTAButton = ({children,active,linkto,}) => {
  return (
   <Link to={linkto}> 
    <div className={` w-fit text-center text-[13px] px-7 py-3 rounded-md font-bold text-nowrap   flex items-center justify-center
                ${active ? "bg-yellow-50 text-black": " bg-richblack-800 text-white" } hover:scale-95 transition-all duration-200 hover:shadow-none shadow-[1.5px_1.5px_0px_0px_rgba(255,255,255,0.25)]`}>
        {children}
    </div>
   
   </Link>
  )
}
