import React from 'react'

export default function AddPortfolio() {
  return (
    <div className=" flex items-center justify-center  ">
      <div className="bg-gray-100   rounded-xl p-8 ">
        <h2 className="text-2xl font-semibold mb-6">Add Portfolio</h2>

        <form   className="space-y-6">
          <input
            type="text"
            name="nickname"
            placeholder="nickname"
            
            className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
          />

          <input
            type="text"
            name="skills"
            placeholder="User skills"
            
            className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
          />

          <textarea
            name="description"
            placeholder="description"
            rows="4"
           
            className="w-full bg-gray-200 rounded-md p-4 focus:outline-none"
          ></textarea>

          <input
            type="text"
            name="link"
            placeholder="Freelancer_Page.scrLink"
           
            className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
          />

          <div className="bg-gray-200 rounded-md p-6">
            <label className="flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-md cursor-pointer w-fit shadow">
              Choose images
              <input
                type="file"
                multiple
                hidden
               
              />
            </label>
          </div>

          <div className="flex justify-end gap-6 pt-4">
            <button type="submit" className="hover:text-purple-600">
              Save
            </button>
            <button type="button"   className="hover:text-red-500">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

