// import { faGraduationCap, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import React from 'react'
// import AddExperience from '../ModalPage/AddExperience'

import { useEffect, useState } from "react";
import { getFreelancerProfile } from "../../Services/api-profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faPlus } from "@fortawesome/free-solid-svg-icons";
import AddExperience from './../ModalPage/AddExperience';
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

// export default function Experience() {
//   return (
//      <>
//       <div className='border-t p-4 space-y-2 '>
//       <h1 className='flex items-center justify-between'>
//         <span className='font-bold '>Experience</span>
//    <button className='btn w-fit bg-Purple-200'>
//        <FontAwesomeIcon className='text-purple-600' icon={faPlus} />
//    </button>
//       </h1>
//       <div className='flex items-center gap-10' >
//           <FontAwesomeIcon className='text-2xl' icon={faGraduationCap} />
//         <div className='space-x-3'>
//              <p className='flex items-center justify-between'>
//             <span>“Certification Name”</span>
              
//         </p>
//         <p>“specialty”</p>
//         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, temporibus!</p>
//         <p>2022 /2/1 - 2026/5/1</p>
//         </div>
       
      
       
//       </div>

//      </div>
     
     
     
     
     
     
     
     
     
     
//      </>
//   )
// }


export default function Experience() {
  const [open, setOpen] = useState(false);
  const [experiences, setExperiences] = useState([]);

  const { userId } = useParams();
   const token = localStorage.getItem("token");
      
      const user = token ? jwtDecode(token) : null;

  async function fetchProfile() {
    try {
      const data = await getFreelancerProfile(userId);
      setExperiences(data.experiences || []);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  return (
    <>
      <div className='border-t p-4 space-y-2'>

        <h1 className='flex items-center justify-between'>
          <span className='font-bold'>Experience</span>

          
            {user?.UserId == userId && (
           <button
            onClick={() => setOpen(true)}
            className='btn w-fit bg-Purple-200'
          >
            <FontAwesomeIcon className='text-purple-600' icon={faPlus} />
          </button>
          )}
        </h1>

        {/* 👇 آخر experience بس */}
        {experiences.length > 0 && (() => {
          const last = experiences.at(-1);

          return (
            <div className='flex items-center gap-10'>
              <FontAwesomeIcon className='text-2xl' icon={faGraduationCap} />

              <div className='space-y-2'>
  <p>{last.jobTitle}</p>
  <p>{last.description}</p>
</div>
            </div>
          );
        })()}

      </div>

      <AddExperience
        isOpen={open}
        onClose={() => setOpen(false)}
        fetchProfile={fetchProfile}
      />
    </>
  )
}