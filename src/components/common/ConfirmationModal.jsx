import React from 'react'
import { IconButton } from './IconButton'

export const ConfirmationModal = ({modalData}) => {
  return (
    <div className='fixed inset-0 z-[100000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6" >
            <p className="text-2xl font-semibold text-richblack-5">{modalData.text1}</p>
            <p className="mt-3 mb-5 leading-6 text-richblack-200">{modalData.text2}</p>

            <div className="flex flex-row items-center gap-x-4">
                <IconButton
                onClick={modalData?.btn1Handler}
                text={modalData?.btn1text}
                customClasses={'py-2 px-5' }/>
                

                <button
                 className="cursor-pointer rounded-md bg-richblack-200 py-[8px] px-[20px] font-semibold text-richblack-900"
                onClick={modalData?.btn2Handler} >{modalData?.btn2text}</button>

            </div>
        </div>

    </div>
  )
}
