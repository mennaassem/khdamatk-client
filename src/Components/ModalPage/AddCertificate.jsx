import React from 'react'

// export default function AddCertificate() {
//   return (
// <div className=" flex items-center justify-center z-50">
//       <div className="bg-gray-100   rounded-xl p-8  ">
//         <h2 className="text-2xl font-semibold mb-6">Add certificate</h2>

//         <form   className="space-y-6">

//           <input
//             type="text"
//             name="title"
//             placeholder="Title"
           
//             className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
//           />

//           <textarea
//             name="description"
//             placeholder="description"
//             rows="4"
            
//             className="w-full bg-gray-200 rounded-md p-4 focus:outline-none"
//           ></textarea>

//           <div>
//             <label className="block mb-2 text-sm">Issue Date</label>
//             <input
//               type="date"
//               name="issueDate"
             
//               className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
//             />
//           </div>

//           <div className="flex justify-end gap-6 pt-4">
//             <button type="submit" className="hover:text-purple-600">
//               Save
//             </button>
//             <button type="button " className="hover:text-red-500">
//               Close
//             </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
  
// }



export default function AddCertificate({ isOpen, onClose }) {

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-xl p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-8">
          Add Certificate
        </h2>

        <form className="space-y-6">

          {/* Title */}
          <input
            type="text"
            placeholder="Title"
            className="w-full border-b border-gray-400 outline-none py-2"
          />

          {/* Description */}
          <textarea
            placeholder="description"
            className="w-full h-32 bg-gray-200 p-3 outline-none resize-none"
          />

          {/* Date */}
          <div>
            <label className="block mb-2 text-sm">Issue Date</label>
            <input
              type="date"
              className="w-full border-b border-gray-400 outline-none py-2"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-6 pt-4">
            <button type="submit" className="font-medium">
              Save
            </button>

            <button 
              type="button"
              onClick={onClose}
              className="text-gray-600"
            >
              Close
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}