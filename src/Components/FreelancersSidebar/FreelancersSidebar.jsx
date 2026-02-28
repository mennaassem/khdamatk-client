 import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode, faPalette, faPenNib, faChartLine, faDollarSign, faGraduationCap, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import { faUnity } from "@fortawesome/free-brands-svg-icons";
 
 
 
 
 export default function FreelancersSidebar() {
  return (
    <>
    <h2 className="text-lg font-semibold">Services</h2>
     <div className="bg-white   p-5 rounded-xl shadow-md w-64 mb-5 ">

       

      <ul className="space-y-3 text-gray-700">

        <li className="flex items-center gap-3 hover:text-purple-700 cursor-pointer">
          <FontAwesomeIcon icon={faCode} />
          Developers
        </li>

        <li className="flex items-center gap-3 hover:text-purple-700 cursor-pointer">
          <FontAwesomeIcon icon={faPalette} />
          Designers
        </li>

        <li className="flex items-center gap-3 hover:text-purple-700 cursor-pointer">
          <FontAwesomeIcon icon={faPenNib} />
          Writing
        </li>

        <li className="flex items-center gap-3 hover:text-purple-700 cursor-pointer">
          <FontAwesomeIcon icon={faChartLine} />
          Marketing
        </li>
          <li className="flex items-center gap-3 hover:text-purple-700 cursor-pointer">
         <FontAwesomeIcon icon={faDollarSign} />
          Sales
        </li>
          <li className="flex items-center gap-3 hover:text-purple-700 cursor-pointer">
        <FontAwesomeIcon icon={faGraduationCap} />
          Training
        </li>
          <li className="flex items-center gap-3 hover:text-purple-700 cursor-pointer">
       <FontAwesomeIcon icon={faChartLine} />
        Finance
        </li>
            <li className="flex items-center gap-3 hover:text-purple-700 cursor-pointer">
       <FontAwesomeIcon icon={faBriefcase} />
      Business
        </li>
             <li className="flex items-center gap-3 hover:text-purple-700 cursor-pointer">
     <FontAwesomeIcon icon={faUnity} />
     Engineers
        </li>

      </ul>

    </div>
      <h2 className="text-lg font-semibold ">Hourly Rate</h2>
     <div className="bg-white p-5 rounded-xl shadow-md w-64 mb-5">

     

      <ul className="space-y-3 text-gray-700">

        <li className="flex items-center gap-3 hover:text-purple-700 cursor-pointer">
           
         Below 50
        </li>

        <li className="flex items-center gap-3 hover:text-purple-700 cursor-pointer">
          
          50 to 100
        </li>

        <li className="flex items-center gap-3 hover:text-purple-700 cursor-pointer">
           
         100 to 150
        </li>

        <li className="flex items-center gap-3 hover:text-purple-700 cursor-pointer">
          
        above 150
        </li>
         

      </ul>

    </div>
    </>
  );
}