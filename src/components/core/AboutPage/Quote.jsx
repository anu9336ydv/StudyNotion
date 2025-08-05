import React from 'react'
import { HighlightText } from '../HomePage/HighlightText'

export const Quote = () => {
  return (
    <div className=' text-xl md:text-4xl font-semibold mx-auto py-24 xl:p-40 pb-20 text-center text-whit    '>
        "We are passionate about revolutionizing the way we learn. Our innovative platform
        <HighlightText text={"combines technology"}/>
        <span className='font-bold  bg-gradient-to-b from-[#FF512F]  to-[#F09819] text-transparent bg-clip-text'>{" "},experties</span> ,and community to create an
        <span className='font-bold  bg-gradient-to-b from-[#E65C00]  to-[#F9D423] text-transparent bg-clip-text '> unparalleled educational experience."</span>
    </div>
  )
}
