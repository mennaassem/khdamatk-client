
 import logoPhoto from '../../assets/Images/Logo.png'
 import { useEffect, useState } from "react";
import EditInfo from './../ModalPage/EditInfo'
import { jwtDecode } from "jwt-decode";
 
 
 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faStar,
  faLocationDot,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import ProfileDetails from './ProfileDetails';
import { getFreelancerProfile } from '../../Services/api-profile';
import { useParams } from 'react-router-dom';
import CoverProfile from './CoverProfile';
import ImageProfile from './ImageProfile';
import ImageProfileModal from '../ModalPage/ImageProfileModal';
import DeletImageProfile from '../ModalPage/DeletImageProfile';

 
 

export default function ProfileHeader() {
  const [profile, setProfile] = useState(null);
const { userId } = useParams();
const token = localStorage.getItem("token");

const user = token ? jwtDecode(token) : null;

 

 
   
    const [isEditOpen, setIsEditOpen] = useState(false);
    async function fetchProfile() {
  const res = await getFreelancerProfile(userId);
  setProfile(res);
}
   useEffect(() => {
  fetchProfile();
}, [userId]);

 
// };
 return (
  <>
    <div className="mt-10">
      {/* Cover */}
      <div className="h-32 relative bg-gray-800">
         <CoverProfile/>
          {/* profile-image */}
        <div className="absolute left-32 -bottom-3 transform -translate-x-1/2 translate-y-1/3 z-30">
          
  <ImageProfile/>
</div>
      </div>
      
      {/* Profile Info */}
      
      <div className=" relative px-6 pb-6 bg-white">

  {/* ايقونه التعديل الخاصة بصفحه EditInfo*/}
  {/* <div className="absolute top-6 right-6">
    <FontAwesomeIcon
      className="text-xl cursor-pointer text-gray-700 hover:text-purple-600 transition"
      icon={faPenToSquare}
      onClick={() => setIsEditOpen(true)}
    />
    
  </div> */}
{user?.UserId === profile?.userId && (
  <div className="absolute top-6 right-6">
    <FontAwesomeIcon
      className="text-xl cursor-pointer text-gray-700 hover:text-purple-600 transition"
      icon={faPenToSquare}
      onClick={() => setIsEditOpen(true)}
    />
  </div>
)}

  {/* Profile Content */}
  <div className="flex items-center  justify-between ">
    <ProfileDetails profile={profile} />
  </div>

</div>
    </div>

    {/* Modal */}
    {isEditOpen && (
 
<EditInfo
  onClose={() => setIsEditOpen(false)}
  refetch={fetchProfile}
/>
    )}
  </>
);
}