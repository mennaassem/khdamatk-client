import React from 'react'

export default function ImageProfileModal({ setShowEditModal }) {
  return (
<div className="fixed mt-3 z-50 flex items-center justify-center">
  
  <div className="bg-white border border-Purple-200 shadow p-5 w-[600px] rounded-2xl">
    
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
