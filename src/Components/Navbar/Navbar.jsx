import { faBell, faCircleUser, faMessage, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBars, faChevronDown, faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from './../Context/AuthContext';

export default function Navbar() {
  const {logOut}=useContext(AuthContext)
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
              </div >
              <div className='flex items-center gap-8 text-2xl'>
                <FontAwesomeIcon icon={faMessage} />
                <FontAwesomeIcon icon={faBell} />
                <span>AR</span>
               
                {/* <div className='relative group/profile'>
  <button>
    <FontAwesomeIcon className='text-2xl' icon={faCircleUser} />
  </button>

  <div className='hidden group-hover/profile:block absolute top-11 right-0 mt-2 w-44 bg-red-400 shadow-lg rounded-lg'>
    <ul className='divide-y divide-gray-300/30'>
      
      <li className='py-2 px-4 hover:bg-gray-100 cursor-pointer'>
        <Link to="/profile">Profile</Link>
      </li>

      <li className='py-2 px-4 hover:bg-gray-100 cursor-pointer'>
        <Link to="/wallet">Wallet</Link>
      </li>

      <li className='py-2 px-4 hover:bg-gray-100 cursor-pointer'>
        <Link to="/my-offers">My offers</Link>
      </li>

      <li className='py-2 px-4 hover:bg-gray-100 cursor-pointer'>
        <Link to="/log-out">Log out</Link>
      </li>

    </ul>
  </div>
</div> */}
<div className='relative group inline-block'>
  <button>
    <FontAwesomeIcon className='text-2xl' icon={faCircleUser} />
  </button>

  <div className='absolute right-0 top-full w-44 bg-white shadow-lg rounded-lg 
                  opacity-0 invisible group-hover:opacity-100 
                  group-hover:visible transition duration-200'>

    {/* <ul className='divide-y divide-gray-200'>
      <li className='px-4 py-2 hover:bg-gray-100'>
        <Link to="/profile">Profile</Link>
      </li>
      <li className='px-4 py-2 hover:bg-gray-100'>
        <Link to="/wallet">Wallet</Link>
      </li>
      <li className='px-4 py-2 hover:bg-gray-100'>
        <Link to="/my-offers">My offers</Link>
      </li>
      <li className='px-4 py-2 hover:bg-red-50 text-red-600'>
        <Link to="/log-out">Log out</Link>
      </li>
    </ul> */}
    <ul className='divide-y divide-gray-200'>
  <li>
    <Link 
      to="/profile" 
      className='block w-full px-4 py-2 hover:bg-gray-100'
    >
      Profile
    </Link>
  </li>

  <li>
    <Link 
      to="/wallet" 
      className='block w-full px-4 py-2 hover:bg-gray-100'
    >
      Wallet
    </Link>
  </li>

  <li>
    <Link 
      to="/my-offers" 
      className='block w-full px-4 py-2 hover:bg-gray-100'
    >
      My offers
    </Link>
  </li>

  <li onClick={logOut}>
    <Link 
      className='block w-full px-4 py-2 hover:bg-red-50 text-red-600'
    >
      Log out
    </Link>
  </li>
</ul>


  </div>
</div>


                
              
              </div>
    </div>
    
    
    
    
    
    
    
    
    
    </>
  )
}
