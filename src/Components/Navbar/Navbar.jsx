import { faBell, faMessage, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faChevronDown, faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link, NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
    <div className=' flex items-center justify-between bg-white shadow fixed top-0 left-0 w-full  p-4'>
              <Link to="/" className='text-Purple-400 font-bold text-2xl'>KHADMA <span className='text-amber-500'> HUB</span></Link>
              <div className='flex items-center gap-8'>
                <button className=' flex items-center gap-2'>
                  <span>Services</span>
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
                {/* <ul>
                  <li>
                    <FontAwesomeIcon icon={faCode} />
                    <NavLink to={`/Developers`}>Developers</NavLink>
                  </li>
                   <li>
                    <NavLink>Media Production</NavLink>
                  </li>
                  <li>
                    <NavLink>Media Production</NavLink>
                  </li>
                  <li>
                    <NavLink>Media Production</NavLink>
                  </li>
                  <li>
                    <NavLink>Media Production</NavLink>
                  </li>
                  <li>
                    <NavLink>Media Production</NavLink>
                  </li>
                  <li>
                    <NavLink>Media Production</NavLink>
                  </li>
                  <li>
                    <NavLink>Media Production</NavLink>
                  </li>
                  <li>
                    <NavLink>Media Production</NavLink>
                  </li>
                  <li>
                    <NavLink>Media Production</NavLink>
                  </li>
                  <li>
                    <NavLink>Media Production</NavLink>
                  </li>
                  <li>
                    <NavLink>Media Production</NavLink>
                  </li>
                </ul> */}
                <span>About</span>
                <span>Job</span>
              </div>
              <div className='flex items-center gap-8 text-xl'>
                <FontAwesomeIcon icon={faMessage} />
                <FontAwesomeIcon icon={faBell} />
                <span>AR</span>
                <FontAwesomeIcon icon={faUser} />
              </div>
    </div>
    
    
    
    
    
    
    
    
    
    </>
  )
}
