 
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
//  
 
import React, { useState } from 'react'
import { sendDataToExperience } from '../../Services/api-profile'

export default function AddExperience({ isOpen, onClose, fetchProfile }) {

  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const payload = {
        title,
        companyName,
        description,
        startDate,
        endDate: endDate || null
      };

      await sendDataToExperience(payload);

      await fetchProfile();

      onClose();

      setTitle("");
      setCompanyName("");
      setDescription("");
      setStartDate("");
      setEndDate("");

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div
        className="bg-white w-full max-w-xl p-8 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >

        <h2 className="text-2xl font-semibold mb-8">
          Add Experience
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-b mb-4"
          />

          <input
            placeholder="Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full border-b mb-4"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-24 bg-gray-200 mb-4 p-2"
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full border-b mb-4"
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full border-b mb-6"
          />

          <div className="flex justify-end gap-4">

            <button type="submit">
              Save
            </button>

            <button type="button" onClick={onClose}>
              Close
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}