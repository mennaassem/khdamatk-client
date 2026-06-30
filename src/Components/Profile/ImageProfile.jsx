// import React from 'react'
//  import logoPhoto from '../../assets/Images/Logo.png'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
// export default function ImageProfile() {
//   return (
//      <>
     
     
     
     
     
//       <div className="relative w-fit">
    
//     <img
//       src={logoPhoto}
//       className="rounded-full size-28 object-cover border-4 border-white"
//     />

//     {/* delete */}
//     <div className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow">
//       <FontAwesomeIcon className="text-red-500 text-sm" icon={faTrash} />
//     </div>

//     {/* edit */}
//     <div className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow">
//       <FontAwesomeIcon className="text-black text-sm" icon={faPen} />
//     </div>

//   </div>
     
     
     
     
     
     
     
//      </>
//   )
// }
import { useState, useEffect } from "react";
import logoPhoto from "../../assets/Images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function ProfileImage({ setValues, initialImage }) {
  const [profileImage, setProfileImage] = useState(
    initialImage || logoPhoto
  );

  // لو فيه صورة جاية من الـ API
  useEffect(() => {
    if (initialImage) {
      setProfileImage(initialImage);
    }
  }, [initialImage]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;

      setProfileImage(base64);

      setValues((prev) => ({
        ...prev,
        profileImageUrl: base64,
      }));
    };

    reader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    setProfileImage(logoPhoto);

    setValues((prev) => ({
      ...prev,
      profileImageUrl: null,
    }));
  };

  return (
    <div className="relative w-fit">
      <img
        src={profileImage}
        alt="profile"
        className="rounded-full size-36 object-cover border border-purple-600/50"
      />

      {/* Delete */}
      <div
        onClick={handleDeleteImage}
        className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow cursor-pointer"
      >
        <FontAwesomeIcon className="text-red-500 text-sm" icon={faTrash} />
      </div>

      {/* Edit */}
      <label className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow cursor-pointer">
        <FontAwesomeIcon className="text-black text-sm" icon={faPen} />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </label>
    </div>
  );
}