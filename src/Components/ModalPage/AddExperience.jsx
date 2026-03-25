 
// export default function AddExperience() {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//       <div className="bg-white w-full max-w-lg p-6 shadow-md">

//         {/* Title */}
//         <h2 className="text-xl font-semibold mb-6">
//           Add Experience
//         </h2>

//         {/* Input */}
//         <input
//           type="text"
//           placeholder="Title"
//           className="w-full border-b mb-6 outline-none py-2"
//         />

//         {/* Textarea */}
//         <textarea
//           placeholder="description"
//           className="w-full h-28 bg-gray-100 p-3 mb-6 outline-none resize-none"
//         />

//         {/* Buttons */}
//         <div className="flex justify-end gap-6">
//           <button className="font-medium">
//             Save
//           </button>

//           <button className="text-gray-500">
//             Close
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// }
 
export default function AddExperience({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      
      <div 
        className="bg-white w-full max-w-xl p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Title */}
        <h2 className="text-2xl font-semibold mb-8">
          Add Experience
        </h2>

        {/* Title Input */}
        <div className="mb-6">
          <label className="block text-sm mb-1">Title</label>
          <input
            type="text"
            className="w-full border-b border-gray-400 outline-none py-1"
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <textarea
            placeholder="description"
            className="w-full h-32 bg-gray-200 p-3 outline-none resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-6">
          <button className="font-medium">
            Save
          </button>

          <button 
            onClick={onClose}
            className="text-gray-600"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
