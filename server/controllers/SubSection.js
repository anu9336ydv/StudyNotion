const SubSection = require("../models/SubSection")


const cloudinary = require("cloudinary").v2
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require("../models/Section");
require('dotenv').config();

//create sub section

exports.createSubSection = async(req,res) =>{
    try{
        //fetch data 

        const{ title,description, sectionId}=req.body;
        //extract video
        const video= req.files.video;
        console.log("section id",sectionId)
        console.log("description ",description)
        console.log("title ",title)
        console.log("video",video)
        //validate data 
        if(!title || !description ||!sectionId || !video){
            return res.status(400).json({
                success:false,
                message:"all field require"
            });
        }
        const ifsection= await Section.findById(sectionId);
		if (!ifsection) {
            return res
                .status(404)
                .json({ success: false, message: "Section not found" });
        }
        //uplode to cloudinary
        async function uploadFileToCloudinary(file,folder,quality){
            const options = {folder};
            if(quality){
                options.quality = quality;
            }
        
            options.resource_type = "auto";
           return await cloudinary.uploader.upload(file.tempFilePath,options);
        }
        const uploadDetails = await uploadFileToCloudinary(video,process.env.FOLDER_NAME)
        // creat sub section
        console.log("uploadDetails.duration",uploadDetails.duration)
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration: `${uploadDetails.duration}`,
            description:description,
            videoUrl:uploadDetails.secure_url,

        })
        //update section with this sub section
        const updatedSection = await Section.findByIdAndUpdate(sectionId,
            {
                $push:{
                    subSection:subSectionDetails._id,
                }
            },{new:true}
        ).populate("subSection")
        //hw populate

        //return response
        return res.status(200).json({
            success:true,
            message:"subsection created successfully ",
            data:updatedSection
        })


    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"unable to create sub section",
            error:error.message,
        })

    }
}

//hw update sub section and delete sub section

//update 
exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId, subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        //uplode to cloudinary
        async function uploadFileToCloudinary(file,folder,quality){
            const options = {folder};
            if(quality){
                options.quality = quality;
            }
        
            options.resource_type = "auto";
           return await cloudinary.uploader.upload(file.tempFilePath,options);
        }
        const uploadDetails = await uploadFileToCloudinary(video,process.env.FOLDER_NAME)
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      console.log("updated section", updatedSection)
  
      return res.json({
        success: true,
        message: "Section updated successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
//delete sub section

exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      return res.json({
        success: true,
        message: "SubSection deleted successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }