import React from 'react'

export default function ImageProfileModal({ setShowEditModal }) {
  return (
<div className="relative top-30 h-screen flex items-center justify-center">
  
  <div className="w-[520px] bg-[#f3f3f3] rounded-sm shadow-lg">
    
    <div className="p-8">
      <div className="bg-[#dddddd] h-[90px] rounded-sm flex items-center px-6">
        
        <button className="bg-white px-4 py-2 rounded-md border border-gray-300 flex items-center gap-2">
          <span>Choose images</span>
        </button>

      </div>
    </div>

    <div className="border-t border-gray-300 px-8 py-5 flex justify-end gap-6">
      
      <button className="text-black text-[18px] font-medium">
        Save
      </button>

      <button
        onClick={() => setShowEditModal(false)}
        className="text-[28px] text-black hover:opacity-70"
      >
        Close
      </button>

    </div>
  </div>

</div>
  );
}
