import React from 'react'
import { SignupForm } from './SignupForm'
import { LoginForm } from './LoginForm'
import Frame from '../../../assets/Images/frame.png'
import { useSelector } from 'react-redux'

export const Template = ({title,desc1,desc2,image,formtype}) => {
    const{loading}=useSelector((state)=>state.auth)

    if(loading){
        return (
            <div className='flex min-h-[calc(100vh-3.5rem)] items-center justify-center'>
                <div className='loader '></div>
            </div>
        )
    }
  return (
    <div>
        <div className="  flex lg:flex-row flex-col-reverse items-center max-w-[1160px] py-12 w-[90%] mx-auto">

            <div className=" mx-auto lg:mr-64 flex w-11/12 max-w-[450px] flex-col justify-between gap-y-12 py-12 md:flex-col md:gap-y-0 md:gap-x-12">
                <div className=" mx-auto w-11/12 max-w-[450px] md:mx-0">
                    <h1  className="text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5">{title}</h1>
                    <p className="mt-4 text-[1.125rem] leading-[1.625rem]">
                        <span className="text-richblack-100">
                            {desc1}
                        </span>
                            <br />
                        <span className="font-edu-sa font-bold italic text-blue-100">
                            {desc2}
                        </span>
                    </p>
                   
                </div>

                {formtype==="signupForm" ? <SignupForm/>:<LoginForm/>}

            </div>

            <div className="relative mx-auto w-11/12 max-w-[450px]  md:mx-0 my-7"> 
                <img src={Frame} alt=""  width={558}
                    height={504}
                    loading="lazy"
                />
                <img src={image} alt=""   width={558}
                     height={504}
                     loading="lazy"
                     className="absolute -top-4 right-4 z-10"/>
            </div>

        </div>
    </div>
  )
}
