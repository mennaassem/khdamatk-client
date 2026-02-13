import { Link } from 'react-router-dom'
import photo from '../../assets/Images/Logo.png'

export default function FreelancerCard({ data }) {
      const {
    profilePictureUrl,
    userName,
    jobTitle,
    hourlyRate,
    skills
  } = data

  return (
     <>
     <div className=" flex items-center justify-center">
     <div className="card space-y-4 w-72 text-center border border-black/10  rounded-2xl py-6 shadow-sm hover:shadow-md transition-shadow duration-300 ">
        <div>
              <img src={photo} className='size-14 object-cover rounded-full mx-auto mb-3'/>
         <h2 className='font-semibold text-xl'>{userName}</h2>
         <h3 className='text-sm text-gray-600'>{jobTitle}</h3>
        </div>
         {/* <div>
            <h3 className='w-full h-0.5 border border-gray-300/30'></h3>
            <div className='flex items-center justify-between mx-4'>
            <p>HourlyRate</p>
            <span>350/EG</span>
        </div>
            <h3 className='w-full h-0.5 border border-gray-300/30'></h3>

         </div> */}
         <div className="mt-4">
  <div className="w-full h-px bg-gray-300/40 mb-2"></div>

  <div className="flex items-center justify-between px-2">
    <p className="text-sm text-gray-500">Hourly Rate</p>
    <span className="font-semibold text-gray-800">
      {hourlyRate} EGP / hr
    </span>
  </div>
  <div className="w-full h-px bg-gray-300/40 mt-2"></div>
</div>

        {/* <div className='flex items-center justify-around '>
            <h3 className='bg-gray-500 text-white px-3 py-1 rounded-2xl'>UI</h3>
            <h3 className='bg-gray-500 text-white px-3 py-1 rounded-2xl'>UI</h3>
            <h3 className='bg-gray-500 text-white px-3 py-1 rounded-2xl'>UI</h3>
        </div> */}
         <div className="flex flex-wrap gap-2 justify-center mt-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="text-xs bg-gray-100 px-2 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
        <div>
            <Link to="profile"> 
            <button className='btn text-white'>Profile</button>
            </Link>
        </div>
     </div>
     </div>
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     
     </>
  )
}
