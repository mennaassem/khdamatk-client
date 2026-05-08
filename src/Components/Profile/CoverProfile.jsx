import React from 'react'
 import logoPhoto from '../../assets/Images/Logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
export default function CoverProfile() {
  return (
    <>
    
    
    
    <img src={logoPhoto} className="w-full h-full object-cover" />

        <button className="absolute top-3 left-4 text-white">
          <FontAwesomeIcon icon={faTrash} />
        </button>

        <button className="absolute top-3 right-4 text-white">
          <FontAwesomeIcon icon={faPen} />
        </button>
    
    
    
    
    
    
    
    
    </>
  )
}
