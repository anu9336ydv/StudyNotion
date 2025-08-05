import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '../../../common/IconButton'
import { UpdateDisplayPicture, updateProfile } from '../../../../services/operation/settingApi'
import { HiOutlineUpload } from 'react-icons/hi'

export const UpdatePicture = () => {
    const {user} = useSelector((state)=>state.profile)
    const {token}= useSelector((state)=>state.auth)
    const [previewSource,setPreviewSource] = useState(null)
    const [imageFile,setImageFile]= useState(null)
    const [loading,setLoading]= useState(false)
    const dispatch = useDispatch()
    const filerefernce = useRef(null)

    const changeHandler=(e)=>{
        const file= e.target.files[0]
        if(file){
            previewFile(file)
            setImageFile(file)
        }
    }
    const clickHandler=(e)=>{
        filerefernce.current.click()
    }
    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          setPreviewSource(reader.result)
        }
      }
    const UploadHandler=()=>{

        try{
            setLoading(true)
            const formData = new FormData()
            //console.log("image file",imageFile)
            formData.append("displayPicture", imageFile)
            //console.log("form upload handler",formData.get("displayPicture"))

            dispatch(UpdateDisplayPicture(token,formData)).then(()=>{
                setLoading(false)
            })
        }
        catch(error){
            console.log("ERROR MESSAGE - ", error.message)
        }
        

    }
   
  return (
    <div className=' bg-richblack-800 flex gap-4 sm:py-7 sm:px-12 px-6 py-3 rounded-lg border border-richblack-700 mt-10'>
        <div>
            <img src={previewSource||user.image} alt={` `}className=' aspect-square w-[70px] rounded-full object-cover' />
        </div> 
        
        <div className=' flex flex-col gap-3 '>
             <p className='text-richblack-5 text-sm sm:text-base font-normal'>Change Profile Picture</p>
            <input 
            type="file" 
            onChange={changeHandler}
            ref={filerefernce}
            className='hidden'
            accept='image/png, image/jpg, image/jpeg, image/gif'
            /> 
            <div className='flex  gap-3'>
            <button 
            onClick={clickHandler}
            disabled={loading}
            className='bg-richblack-600 w-full rounded-md text-richblack-50 sm:font-semibold px-2 sm:px-8 text-base'
            >
                Select
            </button>

            <IconButton text={loading?"Uploading...":"Upload"} customClasses={"flex-row-reverse  px-2 py-[2px]  "}
            onClick={UploadHandler}>
                <HiOutlineUpload className='sm:text-xl text-lg '/>
            </IconButton>
            </div>
            

        </div>
    </div>
  )
}
