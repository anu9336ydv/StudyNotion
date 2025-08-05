import React from 'react'

export const IconButton = ({
    text,
    onClick,
    children,
    disable,
    outline=false,
    customClasses,
    type,

}) => {
  return (
    <button
    disable={disable}
    onClick={onClick}
    className={`flex items-center ${
        outline ? "border border-yellow-50 bg-transparent" : "bg-yellow-50"
      } cursor-pointer gap-x-2 rounded-md sm:py-2 sm:px-5 font-semibold text-richblack-900 flex  ${customClasses}`}
      type={type}>
        {
            children ?(
                <>
                <span className={`${outline && "text-yellow-50"}`}>
                {text}
                </span>
                {children}
                </>
            ):(text)
        }
    </button>
  )
}
