import React from 'react'
import toast from 'react-hot-toast'
import { apiConnector } from '../apiconnector';
import { catalogData } from '../apis';

export const getCatalogPageData = async(categoryId) => {
    //console.log("categoryId apical",categoryId)
  
    const toastId = toast.loading("Please Wait");

    let result = []

    try{
        const response = await apiConnector("POST",catalogData.CATALOGPAGEDATA_API,{categoryId: categoryId})

        //console.log("response>>",response)
        if(!response.data.success){
            throw new Error("Could not fetch Catagory page data")
        }
        result = response.data
    }
    catch(error){
        console.log("cATALOG page Data api error",error)
        toast.error(error.message)

        result = error.response.data

    }
    toast.dismiss(toastId)

    return result
}
