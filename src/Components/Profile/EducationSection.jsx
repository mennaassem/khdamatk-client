// import { faGraduationCap, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import AddEducational from './../ModalPage/AddEducational'
import { faGraduationCap, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'

export default function EducationSection() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
    
      <div className='border-t p-4 space-y-2'>
        
        <h1 className='flex items-center justify-between'>
          <span className='font-bold'>Educational</span>

          <button
            className='btn w-fit bg-purple-200'
            onClick={() => setIsModalOpen(true)}
          >
            <FontAwesomeIcon className='text-purple-600' icon={faPlus} />
          </button>

        </h1>

        <div className='flex items-center gap-10'>

          <FontAwesomeIcon className='text-2xl' icon={faGraduationCap} />

          <div className='space-y-1'>

            <p className='flex items-center justify-between'>
              <span>Educational Name</span>
              {/* <FontAwesomeIcon className='text-xl cursor-pointer' icon={faPenToSquare} /> */}
            </p>

            <p>specialty</p>

            <p className='text-sm text-gray-600'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            </p>

            <p className='text-sm'>
              2022 /2/1 - 2026/5/1
            </p>

          </div>

        </div>

      </div>

      {isModalOpen && (
        <AddEducational closeModal={() => setIsModalOpen(false)} />
      )}

    </>
  )
}