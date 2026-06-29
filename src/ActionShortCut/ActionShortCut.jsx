 import { faBriefcase, faCreditCard, faEnvelopeOpen, faScrewdriverWrench, faShield } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useNavigate } from 'react-router-dom';
 
 export default function ActionShortCut() {
      const navigate = useNavigate();
   return (
     <>
     
     <div className="container border-t py-5 bg-white mb-5 flex items-center justify-center gap-3">
        {/* EmbtyDasheBoord */}
       <div
      onClick={() => navigate("/emptydashboard")}
      className="w-28 h-28 bg-white border border-gray-200 rounded-xl shadow-md flex flex-col items-center justify-center gap-2 hover:shadow-xl transition cursor-pointer"
    >
      {/* Icon Circle */}
      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={faBriefcase} className="text-purple-600 text-xl" />
      </div>

      {/* Text */}
      <p className="text-sm font-bold text-gray-700">My Jobs</p>
    </div>
  
    {/* myServices */}
        <div
      onClick={() => navigate("/my-jobs")}
      className="w-28 h-28 bg-white border border-gray-200 rounded-xl shadow-md flex flex-col items-center justify-center gap-2 hover:shadow-xl transition cursor-pointer"
    >
      {/* Icon Circle */}
      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={faScrewdriverWrench} className="text-purple-600 text-xl" />
        
      </div>

      {/* Text */}
      <p className="text-sm font-bold text-gray-700">My Services</p>
    </div>
    {/* Wallet Balance */}
        <div
      onClick={() => navigate("/wallet")}
      className="w-28 h-28 bg-white border border-gray-200 rounded-xl shadow-md flex flex-col items-center justify-center gap-2 hover:shadow-xl transition cursor-pointer"
    >
      {/* Icon Circle */}
      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={faCreditCard} className="text-purple-600 text-xl" />
        
      </div>

      {/* Text */}
      <p className="text-sm font-bold text-gray-700">Wallet Balance</p>
    </div>
     {/* Verification */}
        <div
      onClick={() => navigate("/verification")}
      className="w-28 h-28 bg-white border border-gray-200 rounded-xl shadow-md flex flex-col items-center justify-center gap-2 hover:shadow-xl transition cursor-pointer"
    >
      
      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
        <FontAwesomeIcon icon={faShield} className="text-purple-600 text-xl" />
    
      </div>

      {/* Text */}
      <p className="text-sm font-bold text-gray-700">Verification</p>
    </div>
     </div>
     
     
     
     
     
     
     
     </>
   )
 }
 