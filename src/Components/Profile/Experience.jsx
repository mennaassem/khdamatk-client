// import { faGraduationCap, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import React from 'react'
// import AddExperience from '../ModalPage/AddExperience'

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


import { faGraduationCap, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import AddExperience from '../ModalPage/AddExperience'

export default function Experience() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='border-t p-4 space-y-2 '>
        
        <h1 className='flex items-center justify-between'>
          <span className='font-bold '>Experience</span>

          {/* زرار الفتح */}
          <button 
            onClick={() => setOpen(true)}
            className='btn w-fit bg-Purple-200'
          >
            <FontAwesomeIcon className='text-purple-600' icon={faPlus} />
          </button>
        </h1>

        <div className='flex items-center gap-10'>
          <FontAwesomeIcon className='text-2xl' icon={faGraduationCap} />

          <div className='space-x-3'>
            <p className='flex items-center justify-between'>
              <span>Certification Name</span>
            </p>

            <p>specialty</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <p>2022/2/1 - 2026/5/1</p>
          </div>
        </div>

      </div>

      {/* المودال */}
      <AddExperience 
        isOpen={open} 
        onClose={() => setOpen(false)} 
      />
    </>
  )
}
