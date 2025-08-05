import React from 'react'
import {Template} from "../components/core/Auth/Template";
import loginImg from "../assets/Images/login.webp"

export const Login = () => {
  return (
    <div>
         <Template
        title="Welcome Back"
        desc1="Build skills for today,tomarrow and beyond"
        desc2="Education to future-proof your career"
        image={loginImg}
        formtype="login"/>
    </div>
  )
}
