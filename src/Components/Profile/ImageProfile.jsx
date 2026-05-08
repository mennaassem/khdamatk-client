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
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import DeletImageProfile from "../ModalPage/DeletImageProfile";
import ImageProfileModal from "../ModalPage/ImageProfileModal";
 import logoPhoto from '../../assets/Images/Logo.png'

 

export default function ProfileImage() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  return (
    <>
      <div className="relative w-fit">
        <img
          src="https://via.placeholder.com/150"
          alt=""
          className="rounded-full size-28 object-cover border-4 border-white"
        />

        {/* delete */}
        <div
          onClick={() => setShowDeleteModal(true)}
          className="absolute -left-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow cursor-pointer"
        >
          <FontAwesomeIcon
            className="text-red-500 text-sm"
            icon={faTrash}
          />
        </div>

        {/* edit */}
        <div
          onClick={() => setShowEditModal(true)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow cursor-pointer"
        >
          <FontAwesomeIcon
            className="text-black text-sm"
            icon={faPen}
          />
        </div>
      </div>

     {/* Delete Modal */}
{showDeleteModal && (
  <DeletImageProfile setShowDeleteModal={setShowDeleteModal} />
)}

{/* Edit Modal */}
{showEditModal && (
  <ImageProfileModal setShowEditModal={setShowEditModal} />
)}
    </>
  );
}