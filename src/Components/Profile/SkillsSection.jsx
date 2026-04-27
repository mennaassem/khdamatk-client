// 
// import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { useEffect, useState } from 'react'
 
// import SkillsModification from './../ModalPage/SkillsModification';
// import { getFreelancerProfile, updateSkills } from '../../Services/api-profile';
// import { useParams } from 'react-router-dom';

// export default function SkillsSection() {
// const [skills, setSkills] = useState([]);
// const { userId } = useParams();
//   const [isModalOpen, setIsModalOpen] = useState(false)
// useEffect(() => {
//    getFreelancerProfile(userId).then(data => {
//     setSkills(data.skills || []);
//   });
// }, [userId]);

//   return (
//     <>
    
//       <div className='border-t p-4 space-y-2'>
        
//         <h1 className='flex items-center justify-between'>
//           <span className='font-bold'>Skills</span>

//           <FontAwesomeIcon
//             className='text-xl cursor-pointer'
//             icon={faPenToSquare}
//             onClick={() => setIsModalOpen(true)}
//           />
//         </h1>

//         <div className='space-x-3 flex flex-wrap gap-2'>
//   {skills.length > 0 ? (
//     skills.map(skill => (
//       <span
//         key={skill.id}
//         className='bg-gray-100 px-4 py-2 rounded-2xl'
//       >
//         {skill.name}
//       </span>
//     ))
//   ) : (
//     <p className="text-gray-400">No skills added</p>
//   )}
// </div>

//       </div>

//       {isModalOpen && (
//   <SkillsModification
//     closeModal={() => setIsModalOpen(false)}
//     setSkills={setSkills}
//   />
// )}

//     </>
//   )
// }
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SkillsModification from './../ModalPage/SkillsModification';
import { getFreelancerProfile } from '../../Services/api-profile';

export default function SkillsSection() {
  const { userId } = useParams();

  const [skills, setSkills] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!userId) return;

    getFreelancerProfile(userId).then(data => {
      setSkills(data.skills || []);
    });
  }, [userId]);

  return (
    <>
      <div className='border-t p-4 space-y-2'>

        <h1 className='flex items-center justify-between'>
          <span className='font-bold'>Skills</span>

          <FontAwesomeIcon
            className='text-xl cursor-pointer'
            icon={faPenToSquare}
            onClick={() => setIsModalOpen(true)}
          />
        </h1>

        <div className='flex flex-wrap gap-2'>
          {skills.map(skill => (
            <span
              key={skill.id}
              className='bg-gray-100 px-4 py-2 rounded-2xl'
            >
              {skill.name}
            </span>
          ))}
        </div>

      </div>

      {isModalOpen && (
        <SkillsModification
          closeModal={() => setIsModalOpen(false)}
          setSkills={setSkills}
          initialSkills={skills}
        />
      )}
    </>
  );
}