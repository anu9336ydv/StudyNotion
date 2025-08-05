import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '../../../common/IconButton'
import { useNavigate } from 'react-router-dom'
import { buyCourse } from '../../../../services/operation/studentFeatureApi'

export const RenderTotalAmount = () => {
    const{total,cart}=useSelector((state)=>state.cart)
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const HandleBuyCourse = ()=>{
        const courses=cart.map((course)=>course._id);
        buyCourse(token, courses, user, navigate, dispatch)
       // console.log("bought these course",courses)
    }
  return (
    <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
        <p className="mb-1 text-sm font-semibold text-richblack-300">Total:</p>
        <p className=" text-3xl font-medium text-yellow-100 mb-2">Rs. {total}</p>
         
         <IconButton text='Buy Now'
         onClick={HandleBuyCourse}
         customClasses="w-full justify-center"
         />

    </div>
  )
}
