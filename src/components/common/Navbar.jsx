import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import {NavbarLinks} from "../../data/navbar-links.js"
import { useLocation } from 'react-router-dom'
import { matchPath } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import ProfileDropDown  from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { MdKeyboardArrowDown } from 'react-icons/md'



export const Navbar = () => {
    const {token}=useSelector((state) => state.auth)
    const {user}=useSelector((state) => state.profile)
    const{totalItems}= useSelector((state) => state.cart)
    // console.log("token-",token)
    // console.log("user-",user)
    // console.log("total item=",totalItems)
    const [loading,setLoading] = useState(false)

    const [subLinks, setSubLinks] = useState([]);
   

    useEffect(()=>{
        (async ()=>{
            setLoading(true)
            try{
               const result = await apiConnector("GET",categories.CATEGORIES_API); 
              // console.log("sublinks result", result)
               setSubLinks(result.data.data)  ; 
               //console.log(subLinks)
            }
            catch(error){
                //console.log("could not fetch data",error)
            }
            setLoading(false)
        })()
    },[])

    const location = useLocation()
    const matchRoute = (route)=>{
        return matchPath({path:route}, location.pathname)
    }

    //console.log("subLinks",subLinks)
  return (
    <div  className='flex h-14 items-center border-b border-b-richblack-700 justify-center'>

        <div className='flex w-11/12 max-w-maxContent items-center justify-between '>
            <Link to="/">
                    <img src={logo} alt="" width={160} height={32} loading='lazy' />
            </Link>

            {/* navlinks */}
            <nav className=' hidden md:block'>
            <ul className='flex gap-x-6 text-richblack-25'>
                    {
                        NavbarLinks.map((ele,i)=>{
                            return(
                                <li key={i}>
                                    {
                                        ele.title ==="Catalog" ? (<div className=' relative group flex gap-1 items-center justify-center'>
                                            {ele.title}
                                            <MdKeyboardArrowDown/>
                                                   {/* old */}
                                            {/* <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>
                                                    <div className='absolute left-[50%] top-0 translate-x-[80%] translate-y-[-40%] h-6 w-6 rotate-45 rounded bg-richblack-5'></div>
                                                    {
                                                     subLinks && subLinks.length ?(
                                                            subLinks.map((subLinks,index)=>(
                                                                <Link to={`/category/${subLinks.name.split(" ").join("-").toLowerCase()}`} key={index}
                                                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50">
                                                                    <p>{subLinks.name}</p>
                                                                </Link>
                                                            ))
                                                      ):(<div></div>)
                                                    }

                                            </div> */}
                                                    {/* new */}
                                                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                                                        {loading ? (
                                                        <p className="text-center">Loading...</p>
                                                        ) : (subLinks && subLinks.length) ? (
                                                        <>
                                                            {subLinks
                                                            ?.filter(
                                                                (subLink) => subLink?.course?.length > 0
                                                            )
                                                            ?.map((subLink, i) => (
                                                                <Link
                                                                to={`/catalog/${subLink.name
                                                                    .split(" ")
                                                                    .join("-")
                                                                    .toLowerCase()}`}
                                                                className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
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
                                            <Link to={ele?.path}><p className={`${matchRoute(ele?.path) ?"text-yellow-25":"text-richblack-25"}`}>{ele.title}</p></Link>
                                        )
                                    }
                                </li>
                            )
                        })
                    }
            </ul>
             </nav>
            {/* login signup dashboard */}
            <div className='flex gap-x-4 items-center' >
                { 
                    user&& user?.accountType !== "Instructor" &&(
                        <Link to='/dashboard/cart' className='relative'>
                            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                            {
                                //hw styling
                                totalItems>0 &&(
                                    <span className='absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100'>
                                        {totalItems}
                                    </span>
                                )
                            }
                         </Link>
                    )
                }

                {
                    token === null && (
                        <Link to="/login">
                            <button className=' border border-richblack-700 bg-richblack-800 px-2 sm:px-2 md:px-3 md:py-2 py-1 text-xs sm:text-base text-richblack-25 rounded-md'>Log in</button>
                        </Link>
                    )
                }
                {
                    token === null && (
                        <Link to="/signup">
                            <button className=' border border-richblack-700 bg-richblack-800 px-2 sm:px-2 md:px-3 md:py-2 py-1 text-xs sm:text-base text-richblack-25 rounded-md'>Sign Up</button>
                        </Link>
                    )
                }
                {
                     <ProfileDropDown token={token} subLinks={subLinks} loading={loading} />
                }

            </div>

        </div>

        
       

    </div>
  )
}
