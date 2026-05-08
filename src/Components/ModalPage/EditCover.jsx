import React from 'react'

export default function EditCover() {
  return (
     <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-[500px] bg-[#f3f3f3] rounded-md shadow-lg">
        
        {/* Upload Area */}
        <div className="p-8">
          <div className="bg-[#dddddd] h-[90px] rounded-sm flex items-center px-6">
            <button className="bg-white px-4 py-2 rounded-md border border-gray-300 flex items-center gap-2 hover:bg-gray-100 transition">
              <span>Choose images</span>

              {/* Upload Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-300 px-8 py-5 flex justify-end gap-6">
          <button className="text-black text-[22px] font-medium hover:opacity-70">
            Save
          </button>

          <button className="text-black text-[22px] font-medium hover:opacity-70">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
