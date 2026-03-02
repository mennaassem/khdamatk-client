
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function ProfileHeader() {

   

  return (
    <>
      <div>
        <div>

          {/* Cover */}
          <div className="h-28 bg-black relative">
            <button
             
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>

            <button
             
            >
              <FontAwesomeIcon icon={faPen} />
            </button>
          </div>

          {/* Profile Info */}
          <div className="relative  px-6 pb-6">
            {/* Avatar */}
            <div className="absolute -top-12 left-6 w-24 h-24 bg-gray-300 rounded-full border-4 border-white"></div>

            <div className="pt-16">
              <h2 className="text-xl font-semibold">Omnia Salah</h2>

              <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <span>Member since 2025 Nov</span>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon
                      key={i}
                      icon={faStar}
                      className="text-gray-400"
                    />
                  ))}
                </div>
                <span>(0)</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                <FontAwesomeIcon icon={faLocationDot} />
                <span>Cairo, Egypt</span>
              </div>

              <div className="flex justify-between mt-4 text-sm">
                <div>
                  <p className="font-medium">Software engineer</p>
                </div>
                <div className="text-right">
                  <p>2 years experience</p>
                  <p>Working 3 hours a week</p>
                </div>
              </div>

              <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700">
                Contact me
              </button>

              {/* Price Section */}
              <div className="mt-6 border-t pt-4 flex justify-between text-sm font-medium">
                <span>Average per hour</span>
                <span>50 EG/HR</span>
              </div>

              <p className="mt-3 text-sm text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>
            </div>
          </div>
        </div>
      </div>

     
      
    </>
  );
}