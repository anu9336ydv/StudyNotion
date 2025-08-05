import React from "react"
import { HiOutlineVideoCamera } from "react-icons/hi"

function CourseSubSectionAccordion({ subSec }) {
  return (
    <div>
      <div className="flex justify-between py-2 ml-6">
        <div className={`flex items-center gap-2`}>
          <span>
            <HiOutlineVideoCamera className="text-xl" />
          </span>
          <p>{subSec?.title}</p>
        </div>
      </div>
    </div>
  )
}

export default CourseSubSectionAccordion