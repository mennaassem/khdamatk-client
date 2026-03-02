import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import PortifiloCard from '../PortifiloCard/PortifiloCard'

export default function PortifiloSection() {
  return (
     <>
     <div className='border-t p-4 space-y-2 '>
      <h1 className='flex items-center justify-between'>
        <span className='font-bold '>Portfolio</span>
   <button className='btn w-fit bg-Purple-200'>
       <FontAwesomeIcon className='text-purple-600' icon={faPlus} />
   </button>
      </h1>
      <div className='space-x-3'>
        <PortifiloCard/>
       
      </div>

     </div>
     
     
     
     
     
     
     
     
     </>
  )
}
