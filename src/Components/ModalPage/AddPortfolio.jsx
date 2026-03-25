 
// export default function AddPortfolio({ closeModal }) {

//   return (

//     <div className="fixed  left-0 right-0 bottom-0 bg-black/40 flex items-center justify-center z-40">

//   <div className="bg-white rounded-xl p-8 w-[500px] max-h-[90vh] overflow-y-auto">

//     <h2 className="text-2xl font-semibold mb-8">
//       Add Portfolio
//     </h2>

//     <form className="space-y-6">

//       <input
//         type="text"
//         placeholder="nickname"
//         className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
//       />

//       <input
//         type="text"
//         placeholder="User skills"
//         className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
//       />

//       <textarea
//         placeholder="description"
//         rows="4"
//         className="w-full bg-gray-200 rounded-md p-4 focus:outline-none"
//       />

//       <input
//         type="text"
//         placeholder="Freelancer_Page.scrLink"
//         className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
//       />

//       <div className="bg-gray-200 rounded-md p-6">
//         <label className="flex items-center justify-center bg-white px-4 py-2 rounded-md cursor-pointer w-fit shadow">
//           Choose images
//           <input type="file" multiple hidden />
//         </label>
//       </div>

//       <div className="flex justify-end gap-6 pt-6">
//         <button type="submit" className="text-purple-600 font-medium">
//           Save
//         </button>

//         <button
//           type="button"
//           onClick={closeModal}
//           className="text-gray-600"
//         >
//           Close
//         </button>
//       </div>

//     </form>

//   </div>

// </div>
//   )
// }




export default function AddPortfolio({ closeModal }) {

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={closeModal}
    >

      <div 
        className="bg-white w-full max-w-xl p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >

        <h2 className="text-2xl font-semibold mb-8">
          Add Portfolio
        </h2>

        <form className="space-y-6">

          <input
            type="text"
            placeholder="nickname"
            className="w-full border-b border-gray-400 outline-none py-2"
          />

          <input
            type="text"
            placeholder="User skills"
            className="w-full border-b border-gray-400 outline-none py-2"
          />

          <textarea
            placeholder="description"
            className="w-full h-32 bg-gray-200 p-3 outline-none resize-none"
          />

          <input
            type="text"
            placeholder="Freelancer_Page.scrLink"
            className="w-full border-b border-gray-400 outline-none py-2"
          />

          {/* Upload */}
          <div className="bg-gray-200 p-6">
            <label className="bg-white px-4 py-2 cursor-pointer shadow">
              Choose images
              <input type="file" multiple hidden />
            </label>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-6 pt-4">
            <button type="submit" className="font-medium">
              Save
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="text-gray-600"
            >
              Close
            </button>
          </div>

        </form>

      </div>
    </div>
  )
}