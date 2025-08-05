import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { MdOutlineStar } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { removeFromCart } from '../../../../slices/cartSlice';
import { Rating } from './Rating';
import RatingStars from '../../../common/RatingStars';

export const RenderCartCourses = () => {
    const{cart} = useSelector((state)=>state.cart)
    //console.log("cart>>",cart)
    const dispatch=useDispatch()
  return (
    <div className="flex flex- w-full flex-col">
        {
            cart?.map((course,index)=>(
                <div key={course._id}
                className={`flex w-full flex-wrap items-start justify-between gap-6 ${
                    index !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
                  } ${index !== 0 && "mt-6"} `}>
                    <div className="flex flex-1 flex-col md:flex-row lg:flex-col gap-4 xl:flex-row"> 
                        <img src={course.thumbnail} alt=""
                         className="h-[148px] w-[220px] rounded-lg object-cover" />
                        <div className="flex flex-col space-y-1">
                            <p className="text-lg font-medium text-richblack-5">{course.courseName}</p>
                            <p className="text-sm text-richblack-300">{course.category.name}</p>
                            <div className="flex items-center gap-2 lg:pt-10">
                                <span className="text-yellow-5">
                                    {/* hw to add avegare rating  */}
                                    <Rating rating={course.ratingAndReviews}/> 
                                </span>
                                <span className="text-richblack-400">{course.ratingAndReviews.length} Ratings</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                        <button 
                        className="flex items-center gap-x-1 rounded-md border border-richblack-700 bg-richblack-800 py-[.6rem] px-[12px] text-pink-200"
                         onClick={()=>dispatch(removeFromCart(course._id))}>
                            
                            <IoMdTrash/>
                            <span>Remove</span>
                        </button>

                        <p className="mb-6 text-3xl font-medium text-yellow-100"> Rs. {course.price}</p>
                    </div>
                </div>
            ))
        }

    </div>
  )
}
