import React from 'react'
import { useSelector } from 'react-redux'
import { RenderCartCourses } from './RenderCartCourses'
import { RenderTotalAmount } from './RenderTotalAmount'

export const Cart = () => {
    const{total,totalItems}= useSelector((state)=>state.cart)
  return (
    <div className='text-richblack-50 '> 
        <h1  className="mb-7 text-2xl md:text-3xl font-medium text-richblack-5">Your Cart</h1>
        <p className="border-b border-b-richblack-400 pb-2 font-semibold text-richblack-400">{totalItems} Courses in Cart</p>

        {
            total>0 ?(
                <div className="mt-8 flex flex-col-reverse  w-full items-start gap-x-10 gap-y-6 lg:flex-row">
                    <RenderCartCourses/>
                    <RenderTotalAmount/>
                </div>
            ):(
                <p className="mt-14 text-center text-xl text-pink-600">Your Cart Is Empty</p>
            )
        }

    </div>
  )
}
