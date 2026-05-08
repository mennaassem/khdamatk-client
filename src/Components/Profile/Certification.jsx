 
// import { faGraduationCap, faPlus } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import React, { useState } from 'react'
// import AddCertificate from '../ModalPage/AddCertificate'

// export default function Certification() {
//   const [open, setOpen] = useState(false);

//   return (
//     <>
//       <div className='border-t p-4 space-y-2 '>

//         <h1 className='flex items-center justify-between'>
//           <span className='font-bold '>Certification</span>

//           <button 
//             onClick={() => setOpen(true)}
//             className='btn w-fit bg-Purple-200'
//           >
//             <FontAwesomeIcon className='text-purple-600' icon={faPlus} />
//           </button>
//         </h1>

//         <div className='flex items-center gap-10'>
//           <FontAwesomeIcon className='text-2xl' icon={faGraduationCap} />

//           <div className='space-x-3'>
//             <p>Certification Name</p>
//             <p>specialty</p>
//             <p>Lorem ipsum dolor sit amet consectetur</p>
//             <p>2022/2/1 - 2026/5/1</p>
//           </div>
//         </div>

//       </div>

//       {/* المودال */}
//       <AddCertificate 
//         isOpen={open} 
//         onClose={() => setOpen(false)} 
//       />
//     </>
//   )
// }
import {
  faGraduationCap,
  faPlus
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import React, {
  useEffect,
  useState
} from 'react'

 

 

import { useParams } from 'react-router-dom'
import { getFreelancerProfile } from '../../Services/api-profile'
import AddCertificate from './../ModalPage/AddCertificate';
import { jwtDecode } from 'jwt-decode'

export default function Certification() {
    

  const [open, setOpen] = useState(false);

  const [certificates, setCertificates] = useState([]);

  const { userId } = useParams();
   const token = localStorage.getItem("token");
      
      const user = token ? jwtDecode(token) : null;

  async function fetchProfile() {

    try {

      const data = await getFreelancerProfile(userId);

      console.log(data);

    setCertificates(data.certifications || []);

    } catch (error) {

      console.log(error);

    }
  }

  useEffect(() => {

    fetchProfile();

  }, [userId]);

  return (
    <>
      <div className='border-t p-4 space-y-4'>

        <h1 className='flex items-center justify-between'>

          <span className='font-bold'>
            Certification
          </span>
 
            {user?.UserId == userId && (
         
          <button
            onClick={() => setOpen(true)}
            className='btn w-fit bg-Purple-200'
          >
            <FontAwesomeIcon
              className='text-purple-600'
              icon={faPlus}
            />
          </button>
          )}

        </h1>

       {certificates.length > 0 && (() => {
  const last = certificates.at(-1);

  return (
    <div className='flex items-center gap-10'>

      <FontAwesomeIcon
        className='text-2xl'
        icon={faGraduationCap}
      />

      <div className='space-y-2'>

        <p>{last.name}</p>
<p>{last.description}</p>
<p>{last.date}</p>

      </div>

    </div>
  );
})()}

      </div>

      <AddCertificate
        isOpen={open}
        onClose={() => setOpen(false)}
        fetchProfile={fetchProfile}
      />
    </>
  )
}