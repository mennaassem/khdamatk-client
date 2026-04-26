
 import logoPhoto from '../../assets/Images/Logo.png'
 import { useEffect, useState } from "react";
import EditInfo from './../ModalPage/EditInfo'
 
 
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
 
 

export default function ProfileHeader() {
  const [profile, setProfile] = useState(null);
const { userId } = useParams();
   
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
        <img src={logoPhoto} className="w-full h-full object-cover" />

        <button className="absolute top-3 left-4 text-white">
          <FontAwesomeIcon icon={faTrash} />
        </button>

        <button className="absolute top-3 right-4 text-white">
          <FontAwesomeIcon icon={faPen} />
        </button>
          {/* profile-image */}
        <div className="absolute left-32 -bottom-3 transform -translate-x-1/2 translate-y-1/3 z-30">
          
  <div className="relative w-fit">
    
    <img
      src={logoPhoto}
      className="rounded-full size-28 object-cover border-4 border-white"
    />

    {/* delete */}
    <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow">
      <FontAwesomeIcon className="text-red-500 text-sm" icon={faTrash} />
    </div>

    {/* edit */}
    <div className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow">
      <FontAwesomeIcon className="text-black text-sm" icon={faPen} />
    </div>

  </div>
</div>
      </div>
      
      {/* Profile Info */}
      <div className="relative px-6 pb-6 bg-white">
       
 
        <div className="flex items-center justify-between">
          {/* User Profile Details (Name, Join Date, Rating, Location */}

          {/* <ProfileDetails/> */}
          <ProfileDetails profile={profile} />

          <div>
            <FontAwesomeIcon
              className="text-xl cursor-pointer"
              icon={faPenToSquare}
              onClick={() => setIsEditOpen(true)}
            />
          </div>
        </div>
      </div>
    </div>

    {/* Modal */}
    {isEditOpen && (
//       <EditInfo
 
//   onClose={() => setIsEditOpen(false)}
  
// />
<EditInfo
  onClose={() => setIsEditOpen(false)}
  refetch={fetchProfile}
/>
    )}
  </>
);
}