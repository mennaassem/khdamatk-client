import { faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logoPhoto from '../../assets/Images/Logo.png'
import React from 'react'

export default function PortifiloCard() {
  return (
   <>
 <div className="card  w-60 bg-white shadow border border-purple-300 py-2 px-4 rounded-xl">
  {/* Image */}
<figure className="imge mb-2 w-32 h-32 overflow-hidden rounded-full">
  <img 
    src={logoPhoto} 
    alt="Profile" 
    className="w-full h-full object-cover"
  />
</figure>

  {/* Content */}
  <div className="content mb-2">
    <div className="flex items-center justify-between gap-4">
      <span className="font-semibold">Name Work</span>
      <button className="p-1 rounded-full hover:bg-purple-100">
         <FontAwesomeIcon className='text-xl' icon={faPenToSquare} />
      </button>
    </div>
  </div>

  {/* Skills */}
 <div className="flex flex-wrap gap-2 mt-2">
  <span className="bg-gray-100 px-2 py-1 rounded-xl text-sm">HTML</span>
  <span className="bg-gray-100 px-2 py-1 rounded-xl text-sm">CSS</span>
  <span className="bg-gray-100 px-2 py-1 rounded-xl text-sm">JavaScript</span>
  <span className="bg-gray-100 px-2 py-1 rounded-xl text-sm">React</span>
  <span className="bg-gray-100 px-2 py-1 rounded-xl text-sm">Tailwind</span>
</div>
</div>
   
   
   
   
   
   
   
   </>
  )
}
