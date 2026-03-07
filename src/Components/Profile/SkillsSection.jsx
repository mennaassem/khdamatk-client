// 
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
 
import SkillsModification from './../ModalPage/SkillsModification';

export default function SkillsSection() {

  const [isModalOpen, setIsModalOpen] = useState(false)

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

        <div className='space-x-3'>
          <span className='bg-gray-100 px-4 py-2 rounded-2xl'>Skills</span>
          <span className='bg-gray-100 px-4 py-2 rounded-2xl'>Skills</span>
        </div>

      </div>

      {isModalOpen && (
        <SkillsModification  closeModal={() => setIsModalOpen(false)} />
      )}

    </>
  )
}