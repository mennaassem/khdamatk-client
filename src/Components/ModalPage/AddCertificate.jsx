
import React, { useState } from 'react'

import { sendDataToCertificate } from "../../Services/api-profile";

export default function AddCertificate({
  isOpen,
  onClose,
  fetchProfile
}) {

  const [title, setTitle] = useState("");
  const [issuer, setIssuer] = useState("");
  const [type, setType] = useState("");
  const [yearAcquired, setYearAcquired] = useState("");

  if (!isOpen) return null;

  async function handleSubmit(e) {

    e.preventDefault();

    try {

      const payload = {
        title,
        issuer,
        type,
        yearAcquired: Number(yearAcquired),
      };

      console.log(payload);

      await sendDataToCertificate(payload);

      await fetchProfile();

      onClose();

      setTitle("");
      setIssuer("");
      setType("");
      setYearAcquired("");

    } catch (error) {

      console.log(error);

    }
  }

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

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border-b border-gray-400 outline-none py-2"
          />

          <input
            type="text"
            placeholder="Issuer"
            value={issuer}
            onChange={(e) => setIssuer(e.target.value)}
            className="w-full border-b border-gray-400 outline-none py-2"
          />

          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border-b border-gray-400 outline-none py-2"
          />

          <input
            type="number"
            placeholder="Year Acquired"
            value={yearAcquired}
            onChange={(e) => setYearAcquired(e.target.value)}
            className="w-full border-b border-gray-400 outline-none py-2"
          />

          <div className="flex justify-end gap-6 pt-4">

            <button
              type="submit"
              className="font-medium"
            >
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