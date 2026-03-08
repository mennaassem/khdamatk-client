import React from 'react'

// export default function AddEducational({ closeModal }) {
//   return (
//     <div className=" flex items-center justify-center z-50">
//       <div className="bg-gray-100  rounded-xl p-8  ">
//         <h2 className="text-2xl font-semibold mb-6">Add educational</h2>

//         <form   className="space-y-6">
          
//           <input
//             type="text"
//             name="university"
//             placeholder="university"
            
//             className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
//           />

//           <input
//             type="text"
//             name="specialization"
//             placeholder="specialization"
         
//             className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
//           />

//           <input
//             type="text"
//             name="degree"
//             placeholder="degree"
           
//             className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
//           />

//           <textarea
//             name="description"
//             placeholder="description"
//             rows="4"
            
//             className="w-full bg-gray-200 rounded-md p-4 focus:outline-none"
//           ></textarea>

//           <div className="flex gap-6">
//             <div className="flex-1">
//               <label className="block mb-2 text-sm">From</label>
//               <input
//                 type="date"
//                 name="from"
              
//                 className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
//               />
//             </div>

//             <div className="flex-1">
//               <label className="block mb-2 text-sm">To</label>
//               <input
//                 type="date"
//                 name="to"
              
//                 className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
//               />
//             </div>
//           </div>

//           <div className="flex justify-end gap-6 pt-4">
//             <button type="submit" className="hover:text-purple-600">
//               Save
//             </button>
//               <button
//           type="button"
//           onClick={closeModal}
//           className="text-gray-600"
//         >
//           Close
//         </button>
//           </div>

//         </form>
//       </div>
//     </div>
//   );
// }
export default function AddEducational({ closeModal }) {

 return (

  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white rounded-xl p-8  shadow-lg">

      <h2 className="text-2xl font-semibold mb-6">
        Add educational
      </h2>

      <form className="space-y-6">

        <input
          type="text"
          name="university"
          placeholder="university"
          className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
        />

        <input
          type="text"
          name="specialization"
          placeholder="specialization"
          className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
        />

        <input
          type="text"
          name="degree"
          placeholder="degree"
          className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
        />

        <textarea
          name="description"
          placeholder="description"
          rows="4"
          className="w-full bg-gray-200 rounded-md p-4 focus:outline-none"
        ></textarea>

        <div className="flex gap-6">

          <div className="flex-1">
            <label className="block mb-2 text-sm">
              From
            </label>

            <input
              type="date"
              name="from"
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
            />
          </div>

          <div className="flex-1">
            <label className="block mb-2 text-sm">
              To
            </label>

            <input
              type="date"
              name="to"
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
            />
          </div>

        </div>

        <div className="flex justify-end gap-6 pt-4">

          <button
            type="submit"
            className="text-purple-600 font-medium"
          >
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