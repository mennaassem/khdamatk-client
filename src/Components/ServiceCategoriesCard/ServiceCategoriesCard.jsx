import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function ServiceCategoriesCard({category}) {
  return (
      <div className="card  w-fit p-4 text-center  border border-black/10  rounded-xl py-6 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="content">
                   <FontAwesomeIcon icon={faCircleQuestion} />
                <h3 className="font-medium">{category}</h3>
              </div>
            </div>
  )
}
