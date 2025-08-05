import React, { useState } from 'react'
import { IoMdTrash } from 'react-icons/io'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAccount } from '../../../../services/operation/settingApi'
import { useNavigate } from 'react-router-dom'
import { ConfirmationModal } from '../../../common/ConfirmationModal'

export const DeleteAccount = () => {
  const{token}= useSelector((state)=>state.auth)
  const navigate= useNavigate()
  const dispatch = useDispatch()
  const [confirmationModal, setConfirmationModal] = useState(null)
  const submithandler=()=>{
    try{
      dispatch(deleteAccount(token, navigate))
    }
    catch(error){
      console.log("error in delete account jsx >>> ",error.message)
    }
   
  }
  return (
    <div>
      <div className='flex bg-pink-900 rounded-lg border py-7 px-4 sm:px-12 mt-10 border-pink-700 gap-5 mb-10'>
        <div className='rounded-full bg-pink-700 h-7 sm:w-14 sm:h-14  grid place-items-center '>
            <IoMdTrash className=' text-2xl sm:text-4xl  text-pink-200'/>
        </div>
        <div className=''>
          <p className='text-lg font-semibold text-richblack-50'>Delete Account</p>
          <p className='text-sm text-pink-25 font-medium mt-2'>Would you like to delete account?</p>
          <p className='text-sm text-pink-25 font-medium sm:w-9/12 mt-1'>This account contains Paid Courses. Deleting your account will remove all the contain associated with it.</p>

          <div className='mt-3'>
            <span className='font-semibold text-pink-300 italic cursor-pointer' onClick={
              ()=>setConfirmationModal({
                       text1:"Are You Sure",
                        text2:"Your account will be deleted",
                        btn1text:"Delete",
                        btn2text:"Cancle",
                        btn1Handler:()=> dispatch(deleteAccount(token,navigate)),
                        btn2Handler:()=>setConfirmationModal(null),
              })
            }>I want to delete my account.</span>
          </div>

        </div>
      </div>
      {confirmationModal&&<ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}
