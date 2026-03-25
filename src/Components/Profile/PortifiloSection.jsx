 
 import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import PortifiloCard from './../PortifiloCard/PortifiloCard';
import AddPortfolio from '../ModalPage/AddPortfolio';

 

export default function PortfolioSection() {

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
    
      <div className='border-t p-4 space-y-2'>

        <h1 className='flex items-center justify-between'>
          <span className='font-bold'>Portfolio</span>

          <button
            className='btn w-fit bg-purple-200'
            onClick={() => setIsModalOpen(true)}
          >
            <FontAwesomeIcon
              className='text-purple-600'
              icon={faPlus}
            />
          </button>

        </h1>

        <div className='space-x-3'>
          <PortifiloCard/>
        </div>

      </div>

      {isModalOpen && (
        <AddPortfolio closeModal={() => setIsModalOpen(false)} />
      )}

    </>
  )
}