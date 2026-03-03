import React from 'react'

export default function AddCertificate() {
  return (
<div className=" flex items-center justify-center z-50">
      <div className="bg-gray-100   rounded-xl p-8  ">
        <h2 className="text-2xl font-semibold mb-6">Add certificate</h2>

        <form   className="space-y-6">

          <input
            type="text"
            name="title"
            placeholder="Title"
           
            className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
          />

          <textarea
            name="description"
            placeholder="description"
            rows="4"
            
            className="w-full bg-gray-200 rounded-md p-4 focus:outline-none"
          ></textarea>

          <div>
            <label className="block mb-2 text-sm">Issue Date</label>
            <input
              type="date"
              name="issueDate"
             
              className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
            />
          </div>

          <div className="flex justify-end gap-6 pt-4">
            <button type="submit" className="hover:text-purple-600">
              Save
            </button>
            <button type="button " className="hover:text-red-500">
              Close
            </button>
          </div>

        </form>
      </div>
    </div>
  );
  
}
