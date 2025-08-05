import React, { useEffect, useState } from 'react'
import GetAvgRating from '../../../../utils/avgRating';
import RatingStars from '../../../common/RatingStars';

export const Rating = ({rating}) => {
    const [avgReviewCount, setAvgReviewCount] = useState(0);

  useEffect(()=> {
      const count = GetAvgRating(rating);
      setAvgReviewCount(count);
  },[])

  return (
    <div className="flex items-center gap-2">
        <span className="text-yellow-5">{avgReviewCount}</span>
        <RatingStars Review_Count={avgReviewCount}/>
    </div>
  )
}
