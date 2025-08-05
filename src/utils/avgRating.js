export default function GetAvgRating(ratingArr) {
  //console.log("ratingArr",ratingArr)
    if (ratingArr?.length === 0) return 0
    const totalReviewCount = ratingArr?.reduce((acc, curr) => {
     // console.log("curr",curr.rating)
      acc += curr.rating
    //  console.log("acc",acc)
      return acc
      
    }, 0)
   // console.log("totalReviewCount",totalReviewCount)
  
    const multiplier = Math.pow(10, 1)
    const avgReviewCount =
      Math.round((totalReviewCount / ratingArr?.length) * multiplier) / multiplier
    //  console.log("avgReviewCount",avgReviewCount)
    return avgReviewCount
  }