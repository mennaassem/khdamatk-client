
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