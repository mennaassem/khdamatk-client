  import React from 'react'
 
export default function DeletImageProfile({ setShowDeleteModal }) {
   return (
 
<div className=" fixed mt-3   z-50 flex items-center justify-center">
  <div className="bg-white border border-Purple-200 shadow p-5 w-[600px] rounded-2xl">
    
    {/* Content */}
    <div className="  text-center">
      <h2 className="text-[32px] font-bold text-red-500">
        Confirm?
      </h2>

      <p className="text-[24px] text-black mt-3 whitespace-nowrap">
        Are you sure that you want to delete the picture?
      </p>
    </div>

    {/* Footer */}
    <div className="px-8 pb-6 mt-5 flex justify-end gap-8">
      <button className="text-[24px] text-black hover:opacity-70">
        OK
      </button>

      <button
        onClick={() => setShowDeleteModal(false)}
        className="text-[24px] text-black hover:opacity-70"
      >
        Close
      </button>
    </div>
  </div>
</div>
 



  );
 }