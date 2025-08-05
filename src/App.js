
import './App.css';
import { Route,Routes } from 'react-router-dom';
import {Home} from "./pages/Home"
import Signup from './pages/Signup';
import {Login} from './pages/login';
import { Navbar } from './components/common/Navbar';
import { ForgotPassword } from './pages/ForgotPassword';
import { UpdatePassword } from './pages/UpdatePassword';
import { VerifyEmail } from './pages/VerifyEmail';
import { AboutPage } from './pages/AboutPage';
import { ContactUs } from './pages/ContactUs';
import { Dashboard } from './pages/Dashboard';
import { MyProfile } from './components/core/Dashboard/MyProfile';
import { PrivateRoute } from './components/core/Auth/PrivateRoute';
import { OpenRoute } from './components/core/Auth/OpenRoute';
import {Error} from "./pages/Error"
import { Settings } from './components/core/Dashboard/Setting/Settings';
import { EnrolledCourses } from './components/core/Dashboard/EnrolledCourses';
import { Cart } from './components/core/Dashboard/Cart';
import { useSelector } from 'react-redux';
import { ACCOUNT_TYPE } from './utils/constants';
import {MyCourses} from './components/core/Dashboard/MyCourse';
import {AddCourse} from './components/core/Dashboard/AddCourse/index'
import { EditCourse } from './components/core/Dashboard/EditCourse';
import { Catalog } from './pages/Catalog';
import { CourseDetail } from './pages/CourseDetail';
import { ViewCourse } from './pages/ViewCourse';
import { VideoDetails } from './components/core/ViewCourse/VideoDetails';
import { Instructor } from './components/core/Dashboard/InstructorDashboard/Instructor';




function App() {
  const {user}= useSelector((state)=>state.profile)
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex flex-col font-inter'>
     <Navbar/>
      <Routes>

         <Route path='/' element={<Home/>}/>
         <Route path='/catalog/:catalogName' element={<Catalog />}/>
         <Route path="course/:courseId" element={<CourseDetail/>} />
         <Route path='signup' 
        element={
        <OpenRoute>
          <Signup />
        </OpenRoute> }/>
      

      <Route path='login' 
        element={
          <OpenRoute>
            <Login />
          </OpenRoute>
        
        }/>
      <Route path='forgot-password' 
        element={
          <OpenRoute>
            <ForgotPassword/>
          </OpenRoute>}/>

        <Route path='update-password/:id' 
        element={
        <OpenRoute>
          <UpdatePassword/>
        </OpenRoute> }/>
        <Route path='verify-email' 
        element={
        <OpenRoute>
          <VerifyEmail/>
        </OpenRoute> }/>

        <Route path='/about' 
        element={<AboutPage/>}/>

        <Route path='/contact' 
        element={<ContactUs/>}/>

        <Route 
          
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }>
           <Route path='/dashboard/my-profile'  element={<MyProfile/>}/>
           <Route path='/dashboard/settings'  element={<Settings/>}/>
        
           {
             user?.accountType === ACCOUNT_TYPE.STUDENT &&(
              <>
                   <Route path='/dashboard/enrolled-courses'  element={<EnrolledCourses/>}/>
                    <Route path='/dashboard/cart'  element={<Cart/>}/>
              </>
             )
           }

        {
        user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
           <Route path="dashboard/instructor" element={<Instructor />} />
          <Route path="dashboard/add-course" element={<AddCourse />} />
          <Route path="dashboard/my-courses" element={<MyCourses />} />
           <Route path="dashboard/edit-course/:courseId" element={<EditCourse />} />
          
          </>
          )
        }
        </Route>

        <Route element={
          <PrivateRoute>
            <ViewCourse/>
          </PrivateRoute>
        }>
          {
            user?.accountType === ACCOUNT_TYPE.STUDENT &&(
              <>
                <Route 
                path='view-course/:courseId/section/:sectionId/subsection/:subSectionId'
                element={<VideoDetails/>}
                
                />
              </>
            )
          }


        </Route>

        <Route path='*' element={<Error/>}/>

      </Routes>
      
    </div>
  );
}

export default App;
