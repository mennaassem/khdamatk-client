 
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function SkillsModification({ closeModal }) {

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center z-50 justify-center">

      <div className='bg-white shadow p-5 w-[500px] flex flex-col rounded'>

        <h2 className='font-semibold text-lg mb-4'>
          Skills Modification
        </h2>

        <div className='space-y-4'>

          <p className='font-semibold text-sm'>Skills</p>

          <div>
            <p className='text-sm bg-gray-100 w-fit p-2 rounded flex items-center gap-2 mb-2'>
              <span>Skills</span>
              <FontAwesomeIcon className="cursor-pointer" icon={faXmark} />
            </p>
          </div>

          <p className='border-t pt-2 text-sm text-gray-600'>
            Note that any manipulation of the skills field will be saved automatically
          </p>

        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={closeModal}
            className='btn w-fit text-white'
          >
            Close
          </button>
        </div>

      </div>

    </div>
  )
}
 