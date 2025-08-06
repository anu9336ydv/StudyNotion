

const BASE_URL = "https://studynotion-3-pm60.onrender.com/api/v1"





export const categories = {
    CATEGORIES_API: BASE_URL +"/course/showAllCategories"
}

export const endpoints = {
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL +"/auth/login",
}

export const contactusEndpoint={
    CONTACT_US_API: BASE_URL+"/reach/contact"
}

export const profileEndPoint={
    GET_USER_ENROLLED_COURSES_API: BASE_URL+"/profile/getenrolledcourses",
    GET_USER_DETAIL_API: BASE_URL+"/profile/getuserdetails",
    GET_INSTRUCTOR_DASHBOARD_API: BASE_URL+"/profile/instructordahboard"
} 

export const settingApi={
    UPDATE_DISPLAY_PICTURE_API: BASE_URL+"/profile/updatedisplaypicture",
    UPDATE_PROFILE_API:BASE_URL+"/profile/updateprofile",
    DELETE_ACCOUNT_API:BASE_URL+"/profile/deleteaccount",
    CHANGE_PASSWORD_API:BASE_URL+"/auth/changepassword"
}

export const coursesEndpoint={
        GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL+"/course/getinstructorcourses",
        DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
        DELETE_ALL_COURSE_API: BASE_URL + "/course/deleteAllCourse",
        GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
        COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
        EDIT_COURSE_API: BASE_URL + "/course/editCourse",
        COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
        CREATE_COURSE_API: BASE_URL + "/course/createCourse",
        CREATE_SECTION_API: BASE_URL + "/course/addSection",
        CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
        UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
        UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
        DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
        DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
        GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",
        LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
        CREATE_RATING_API: BASE_URL + "/course/createRating",
}

export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
  }

export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",

}

export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
  }