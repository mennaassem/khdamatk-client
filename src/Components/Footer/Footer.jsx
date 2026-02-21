import { faFacebook, faInstagram, faSquareLinkedin, faSquareTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    //  <>
    //   <div className='bg-Purple-800'>
    //  <div className="container p-8">
    //   <div className='grid grid-cols-1 gap-8 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4'>
    //      {/* logo */}
    //   <div>
    //     <Link to="/" className='text-white font-bold text-2xl'>KHADMA <span className='text-amber-500'> HUB</span></Link>
    //     <p className='text-white '>Helping you find the right<br/> service, faster.</p>
        
    //   </div>
    //   {/* Quick Links */}
    //   <div className='text-white'>
    //     <p className='text-2xl'>Quick Links</p>
    //      <div className='flex flex-col gap-2'>
    //       <Link>Home</Link>
    //     <Link>Services</Link>
    //     <Link>Profile</Link>
    //     <Link>Sign Up</Link>
    //      </div>
    //   </div>
    //   {/* Support */}
    //   <div className='text-white'>
    //     <p className='text-2xl'>Support</p>
    //     <div className='flex flex-col gap-2'> 
    //     <Link>Privacy Policy</Link>
    //     <Link>FAQ</Link>
    //     <Link>Terms & Conditions</Link>
    //     </div>
    //   </div>
    //   {/* Socail-Media */}
    //   <div className='text-white text-2xl flex items-center gap-2'>
    //     <FontAwesomeIcon icon={faFacebook} />
    //     <FontAwesomeIcon icon={faSquareLinkedin} />
    //     <FontAwesomeIcon icon={faInstagram} />
    //     <FontAwesomeIcon icon={faSquareTwitter} />
        
    //   </div>
    //   </div>
       

    //  </div>
    //  <p className='text-white text-center mt-10 bg-Purple-600 p-4 w-full'>© 2026 KHADMA HUB. All rights reserved.</p>
       
     
    //  </div>
       
     
     
     
     
     
     
    //  </>
    <>
  <footer className="
  bg-purple-900 dark:bg-black
  text-gray-200
  transition-colors duration-300">

    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 gap-10 text-center 
      sm:grid-cols-2 sm:text-left 
      lg:grid-cols-4">

        {/* Logo */}
        <div className="space-y-4">
          <Link 
            to="/" 
            className="text-2xl font-bold text-white">
            KHADMA <span className="text-amber-500">HUB</span>
          </Link>

          <p className="text-gray-300 text-sm">
            Helping you find the right service, faster.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">
            Quick Links
          </h4>

          <div className="flex flex-col gap-2 text-sm">
            <Link className="hover:text-amber-400 transition">Home</Link>
            <Link className="hover:text-amber-400 transition">Services</Link>
            <Link className="hover:text-amber-400 transition">Profile</Link>
            <Link className="hover:text-amber-400 transition">Sign Up</Link>
          </div>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold mb-4 text-white">
            Support
          </h4>

          <div className="flex flex-col gap-2 text-sm">
            <Link className="hover:text-amber-400 transition">
              Privacy Policy
            </Link>
            <Link className="hover:text-amber-400 transition">
              FAQ
            </Link>
            <Link className="hover:text-amber-400 transition">
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Social */}
        <div className="flex justify-center sm:justify-start items-start gap-4 text-xl">
          <a className="hover:text-amber-400 transition cursor-pointer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>

          <a className="hover:text-amber-400 transition cursor-pointer">
            <FontAwesomeIcon icon={faSquareLinkedin} />
          </a>

          <a className="hover:text-amber-400 transition cursor-pointer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>

          <a className="hover:text-amber-400 transition cursor-pointer">
            <FontAwesomeIcon icon={faSquareTwitter} />
          </a>
        </div>

      </div>
    </div>

    {/* Bottom Bar */}
    <div className="
    bg-purple-800 dark:bg-gray-900
    text-center text-sm
    py-4
    border-t border-purple-700 dark:border-gray-800">
      © 2026 KHADMA HUB. All rights reserved.
    </div>

  </footer>
</>
  )
}
