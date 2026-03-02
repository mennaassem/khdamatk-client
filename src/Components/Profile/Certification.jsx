import { faGraduationCap, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function Certification() {
  return (
     <>
      <div className='border-t p-4 space-y-2 '>
      <h1 className='flex items-center justify-between'>
        <span className='font-bold '>Certification</span>
   <button className='btn w-fit bg-Purple-200'>
       <FontAwesomeIcon className='text-purple-600' icon={faPlus} />
   </button>
      </h1>
      <div className='flex items-center gap-10' >
          <FontAwesomeIcon className='text-2xl' icon={faGraduationCap} />
        <div className='space-x-3'>
             <p className='flex items-center justify-between'>
            <span>“Certification Name”</span>
              <FontAwesomeIcon className='text-xl' icon={faPenToSquare} />
        </p>
        <p>“specialty”</p>
        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, temporibus!</p>
        <p>2022 /2/1 - 2026/5/1</p>
        </div>
       
        
       
      </div>

     </div>
     
     
     
     
     
     
     
     
     
     
     </>
  )
}
