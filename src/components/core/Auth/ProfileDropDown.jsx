import { useRef, useState } from "react"
import { AiOutlineCaretDown } from "react-icons/ai"
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { NavbarLinks } from "../../../data/navbar-links"

import useOnClickOutside from "../../../hooks/useOnClickOutside"
import { logout } from "../../../services/operation/authApi"
import { MdKeyboardArrowDown } from "react-icons/md"
import * as Icons from 'react-icons/vsc'
import { IoMenuOutline } from "react-icons/io5"

export default function ProfileDropdown({subLinks,loading,token}) {
  const { user } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useOnClickOutside(ref, () => setOpen(false))

  // if (!user) return null

  return (
    <button className="relative" onClick={() => setOpen(true)}>
      <div className="flex items-center gap-x-1">
        {
          (token&&user) ? (
            <div className="flex items-center gap-x-1">
                <img
                  src={user?.image}
                  alt={`profile-${user?.firstName}`}
                  className="aspect-square w-[30px] rounded-full object-cover"
               />
                <AiOutlineCaretDown className="text-sm text-richblack-100" />
            </div>
          ):(
            <div className="text-white visible md:hidden "><IoMenuOutline className="text-2xl"/></div>
          )
        }
        
      </div>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[100] divide-y-[1px] divide-richblack-700  rounded-md border-[1px] border-richblack-700 bg-richblack-800 "
          ref={ref}
         >
          {
              NavbarLinks.map((link,index)=>{
                const IconComponent = Icons[link.icon];
                return(

                <div key={index} className="relative visible md:hidden">
                {
                    link.title ==="Catalog" ? (<div className="group relative flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                      {IconComponent && <IconComponent />}
                        {link.title}
                        <MdKeyboardArrowDown/>
                              
                                <div  onClick={() => setOpen(false)} className="  invisible absolute left-[0%] top-[-60%] right-[50%] z-[10000] flex w-[150px] translate-x-[-110%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]  ">
                                    <div className="absolute w-6 h-6 rotate-45 left-[100%] translate-x-[-0.8125rem] rounded bg-richblack-5 "> </div>
                                    {loading ? (
                                    <p className="text-center">Loading...</p>
                                    ) : (subLinks && subLinks.length) ? (
                                    <>
                                        {subLinks
                                        ?.filter(
                                            (subLink) => subLink?.course?.length > 0
                                        )
                                        ?.map((subLink, i) => (
                                            <Link  onClick={() => setOpen(false)}
                                            to={`/catalog/${subLink.name
                                                .split(" ")
                                                .join("-")
                                                .toLowerCase()}`}
                                            className="rounded-lg bg-transparent py-4  hover:bg-richblack-50"
                                            key={i}
                                            >
                                            <p>{subLink.name}</p>
                                            </Link>
                                        ))}
                                    </>
                                    ) : (
                                    <p className="text-center">No Courses Found</p>
                                    )}
                                </div>

                    </div>):(
                        <Link   onClick={() => setOpen(false)} to={link?.path}>
                          <p className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                          {IconComponent && <IconComponent className="text-lg" />}
                            {link.title}
                          </p>
                        </Link>
                    )
                }
            </div>
              
              )})
          }
          {
            (token&&user) ? (
              <>
                <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
                  <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 border-t-[1px]  border-richblack-700 hover:bg-richblack-700 hover:text-richblack-25">
                    <VscDashboard className="text-lg" />
                    Dashboard
                  </div>
                </Link>
                <div
                  onClick={() => {
                    dispatch(logout(navigate))
                    setOpen(false)
                  }}
                  className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
                >
                  <VscSignOut className="text-lg" />
                  Logout
                </div>
              </>

            ):("")
          }
          
        </div>
      )}
    </button>
  )
}