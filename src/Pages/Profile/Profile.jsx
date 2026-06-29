 
import { Link, useParams } from 'react-router-dom';
import ActionShortCut from '../../ActionShortCut/ActionShortCut';
import Certification from '../../Components/Profile/Certification';
import EducationSection from '../../Components/Profile/EducationSection';
import Experience from '../../Components/Profile/Experience';
import ProfileImage from '../../Components/Profile/ImageProfile';
import ImageProfile from '../../Components/Profile/ImageProfile';
import CoverProfile from './../../Components/Profile/CoverProfile';
import PortfolioSection from './../../Components/Profile/PortifiloSection';
import ProfileDetails from './../../Components/Profile/ProfileDetails';
import ProfileHeader from './../../Components/Profile/ProfileHeader';
import { jwtDecode } from 'jwt-decode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
export default function Profile() {
   const { userId } = useParams();
   const token = localStorage.getItem("token");
    
    const user = token ? jwtDecode(token) : null;
  return (
      <>
      <div className="container  ">
        <ProfileHeader/>
         
 

{user?.UserId == userId ? (
  <ActionShortCut />
) : (
  <div className=" mb-4  ">
    <Link
      to="/contact-us"
      className="btn bg-purple-600 w-fit px-4 py-2 text-white hover:bg-purple-700"
    >
      Contact us
    </Link>
  </div>
)}
         
        {/* <ProfileDetails/> */}
           
      <EducationSection />
      <Experience />
      <Certification />
      </div>
      
      
      </>
  )
}
