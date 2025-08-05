import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Tab } from '../../common/Tab';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { setSignupData } from '../../../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import{sendOtp} from '../../../services/operation/authApi'

export const SignupForm = () => {
     const[accountType, setAccountType]= useState("Student")
     const [formData, setFormData] = useState( {firstName:"", lastName:"",email:"", password:"",confirmPassword:""})
     const [showPassword, setShowPassword] = useState(false);
     const [ showConfirmPassword, setShowConfirmPassword]= useState(false);
     const {loading}= useSelector((state)=>state.auth)

     const dispatch = useDispatch()
     
     const navigate = useNavigate()

     const changeHandler = (event)=>{
        setFormData((prevData)=>(
            {
                ...prevData,
                [event.target.name]: event.target.value

             }
          ))

        }
     
        const submitHandler=(event)=>{
            event.preventDefault();

            if(formData.password !== formData.confirmPassword){
                toast.error("password donot match");
                return;
            }

            const accountData ={
                ...formData,
                accountType
            }
           
            dispatch(setSignupData(accountData))
            dispatch(sendOtp(formData.email,navigate))

             // Reset
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
            })
            
            
        }

        const tabData = [
            {
              id: 1,
              tabName: "Student",
            //   type: ACCOUNT_TYPE.STUDENT
            type:"Student",
            },
            {
              id: 2,
              tabName: "Instructor",
            //   type: ACCOUNT_TYPE.INSTRUCTOR,
            type: "Instructor"
            },
          ]
          

   return (
    <div>
        <div className=' flex flex-col gap-4'>
            
            <div>
                <Tab tabData={tabData} field={accountType} setField={setAccountType} />

                <form onSubmit={submitHandler} className="flex w-full flex-col gap-y-4">
                    <div className="flex gap-x-4">
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        First Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                        required
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={changeHandler}
                        placeholder="Enter first name"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 focus:outline-none"
                        />
                    </label>
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Last Name <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                        required
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={changeHandler}
                        placeholder="Enter last name"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 focus:outline-none"
                        />
                    </label>
                    </div>
                    <label className="w-full">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Email Address <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder="Enter email address"
                        style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 focus:outline-none"
                    />
                    </label>
                    <div className="flex gap-x-4">
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Create Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                        required
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 focus:outline-none"
                        />
                        <span
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                        {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                        </span>
                    </label>
                    <label className="relative">
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Confirm Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                        required
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={changeHandler}
                        placeholder="Confirm Password"
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5 focus:outline-none"
                        />
                        <span
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                        {showConfirmPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                        ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                        )}
                        </span>
                    </label>
                    </div>
                    <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                    >
                    Create Account
                    </button>
                </form>


            </div>

        </div>
    </div>
  )
}
