import React from 'react'

export default function AddExperience() {
  return (
    <div className=" flex items-center justify-center z-50">
      
      <div className="bg-white   rounded-lg   p-8">

        <h2 className="text-2xl font-semibold mb-8">
          Add Experience
        </h2>

        {/* Title */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Title
          </label>

          <input
            type="text"
            className="w-full border-b border-gray-400 focus:outline-none focus:border-black py-2"
          />
        </div>

        {/* Description */}
        <div className="mb-8">
          <textarea
            placeholder="description"
            className="w-full bg-gray-200 p-4 rounded-md resize-none h-32 focus:outline-none"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-6">
          <button className="text-gray-700 hover:text-black">
            Save
          </button>

          <button
            
            className="text-gray-700 hover:text-black"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

