 import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
 
 export default function SkillsSection() {
   return (
     <>
     <div className='border-t p-4 space-y-2 '>
      <h1 className='flex items-center justify-between'>
        <span className='font-bold '>Skills</span>
        <FontAwesomeIcon className='text-xl' icon={faPenToSquare} />
      </h1>
      <div className='space-x-3'>
        <span className='bg-gray-100 px-4 py-2 rounded-2xl'>Skills</span>
        <span className='bg-gray-100 px-4 py-2 rounded-2xl'>Skills</span>
      </div>

     </div>
     
     
     
     
     
     
     
     
     </>
   )
 }
 
 