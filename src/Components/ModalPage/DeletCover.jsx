import React from 'react'

export default function DeletCover({ setShowDelete }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-[480px] bg-[#f3f3f3] rounded-sm shadow-md">
        
        {/* Content */}
        <div className="px-8 pt-10 pb-8 text-center">
          <h2 className="text-[32px] font-bold text-black">
            Confirm?
          </h2>

          <p className="text-[30px] text-black mt-2">
            Are you sure that you want to delete the picture?
          </p>
        </div>

        {/* Footer */}
        <div className="px-8 pb-6 flex justify-end gap-8">
          <button className="text-[28px] text-black hover:opacity-70">
            OK
          </button>

        <button onClick={() => setShowDelete(false)}>
  Close
</button>
        </div>
      </div>
    </div>
  )
}
