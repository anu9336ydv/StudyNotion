const Category = require("../models/Category")
const Course = require("../models/Course")
function getRandomInt(max) {
    return Math.floor(Math.random() * max)
  }


exports.createCategory = async(req,res) =>{
    try{

        const {name,description} = req.body;

        //validation
        if(!name || !description){
            return res.status(500).json({
                success:false,
                message:"all field require"
            })
        }

        const categoryDetails =await Category.create({
            name: name,
            description: description,
        });

        return res.status(200).json({
            success:true,
            message:"categroy created successfully"
        })

    }
    catch(error){
        console.log(error)

        return res.status(500).json({
            success:false,
            message:"error in creating tag "
        })
    }
};

//get all Category 

exports.showAllCategories = async(req,res)=>{
        try{
            const allCategory =  await Category.find({});
           //console.log("allCategory",allCategory)
           // console.log("")
            res.status(200).json({
                success:true,
                message:"all categories retrive",
                data:allCategory
            })
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:"unable to retive Categories "
            })
        }
};

//categroy page details

// exports.categoryPageDetails = async (req,res)=>{
//     try{
//         //get category id
//         const {categoryId} = req.body;
//         //get all courses
//         const selectedCategory = await Category.findById(categoryId).populate({path:"courses",match:{status:"Published"},populate:([{path:"instructor"},{path:"ratingAndReviews"}])})
//         .exec();
//         //validation
//         if(!selectedCategory){
//             return res.status(404).json({
//                 success:false,
//                 message:"data not found"
//             })
//         }

//         //+ Handle the case when there are no courses
// 		if (selectedCategory.course.length === 0) {
// 			console.log("No courses found for the selected category.");
// 			return res.status(404).json({
// 				success: false,
// 				message: "No courses found for the selected category.",
// 			});
// 		}
//         //+
//         const selectedCourses = selectedCategory.course;

//         //get courses of different category
//         const differentCategory = await Category.find({
//             _id:{$ne: categoryId},
//         }).populate({path:"courses",match:{status:"Published"},populate:([{path:"instructor"},{path:"ratingAndReviews"}])});
//         //+
// 		let differentCourses = [];
//         for (const category of differentCategory) {
// 			differentCourses.push(...category.courses);
// 		}
//         // get top selling 
//         //hw
//         //return response
//         return res.status(200).json({
//             success:true,
//             data:{
//                 selectedCourses,
//                 selectedCategory,
//                 differentCategory,
//                 differentCourses
//             }
//         })
//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"unable to retive Category data"
//         })
//     }
// }
exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body
     // console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: [
            { path: "instructor"},
            { path: "ratingAndReviews"},  
           ],
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.course.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: [
            { path: "instructor"},
            { path: "ratingAndReviews"},  
           ],
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: [
           { path: "instructor"},
           { path: "ratingAndReviews"},  
          ],
        })
        .exec()
      const allCourses = allCategories.flatMap((category) => category.course)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }

//+
exports.addCourseToCategory = async (req, res) => {
	const { courseId, categoryId } = req.body;
	// console.log("category id", categoryId);
	try {
		const category = await Category.findById(categoryId);
		if (!category) {
			return res.status(404).json({
				success: false,
				message: "Category not found",
			});
		}
		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}
		if(category.course.includes(courseId)){
			return res.status(200).json({
				success: true,
				message: "Course already exists in the category",
			});
		}
		category.course.push(courseId);
		await category.save();
		return res.status(200).json({
			success: true,
			message: "Course added to category successfully",
		});
	}
	catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
}