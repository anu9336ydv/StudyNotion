import React, { useState } from 'react'
import { Chart, registerables } from "chart.js"
import { Pie ,Doughnut} from "react-chartjs-2"
Chart.register(...registerables)


export const InstructorChart = ({courses}) => {
    const [currentChart,setCurrChart] = useState('students')
    const randomColor=(numColors)=>{
        const colors=[]
        for(let i=0; i<numColors ;i++){
            const color = `rgb(${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)}, ${Math.floor(Math.random()*256)})`
            colors.push(color);
        }
        return colors;
    }

    //create data for chart displaying student info
    const chartDataForStudents = {
            labels: courses.map((course)=>course.courseName),
            datasets:[{
                data: courses.map((course)=>course.totalStudentsEnrolled),
                backgroundColor: randomColor(courses.length)
            }]
    }

    //create data for chart displaying instructor info
    const chartDataForIncome={
        labels: courses.map((course)=>course.courseName),
        datasets:[{
            data:courses.map((course)=>course.totalAmountGenerated),
            backgroundColor: randomColor(courses.length)
        }]

    }

    //create options
    const options = {
        maintainAspectRatio: false,
    };

  return (
    <div className="flex flex-1 flex-col gap-y-4 rounded-md bg-richblack-800 p-6">
        <p className="text-lg font-bold text-richblack-5">Visulise</p>
        <div className="space-x-4 font-semibold">
            <button
            onClick={()=>setCurrChart('students')}
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                currentChart === "students"
                  ? "bg-richblack-700 text-yellow-50"
                  : "text-yellow-400"
              }`}>
                Students
            </button>
            <button
            onClick={()=>setCurrChart('income')}
            className={`rounded-sm p-1 px-3 transition-all duration-200 ${
                currentChart === "income"
                  ? "bg-richblack-700 text-yellow-50"
                  : "text-yellow-400"
              }`}>
                Income
            </button>
        </div>

        <div className="relative mx-auto aspect-square h-full w-full">
            <Doughnut
             data={currentChart==='students'? chartDataForStudents:chartDataForIncome}
             options={options}
            />
        </div>

    </div>
  )
}
