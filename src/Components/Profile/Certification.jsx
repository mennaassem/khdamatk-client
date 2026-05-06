 
import { faGraduationCap, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import AddCertificate from '../ModalPage/AddCertificate'

export default function Certification() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='border-t p-4 space-y-2 '>

        <h1 className='flex items-center justify-between'>
          <span className='font-bold '>Certification</span>

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
            <p>Certification Name</p>
            <p>specialty</p>
            <p>Lorem ipsum dolor sit amet consectetur</p>
            <p>2022/2/1 - 2026/5/1</p>
          </div>
        </div>

      </div>

      {/* المودال */}
      <AddCertificate 
        isOpen={open} 
        onClose={() => setOpen(false)} 
      />
    </>
  )
}