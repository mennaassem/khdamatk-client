 
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
export default function Profile() {
  return (
      <>
      <div className="container bg-gray-100 ">
        <ProfileHeader/>
         
        <ActionShortCut/>
         
        {/* <ProfileDetails/> */}
           
      <EducationSection />
      <Experience />
      <Certification />
      </div>
      
      
      </>
  )
}
