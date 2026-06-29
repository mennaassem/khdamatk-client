import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { submitVerificationRequest } from '../../src/Services/api-verification';
// import { submitVerificationRequest } from '../../Services/api-verification';

// ────────────────────────────────────────────────────────────
// Sub-components
// ────────────────────────────────────────────────────────────

function UploadZone({ label, description, file, onFileChange, accept = "image/jpeg,image/png", maxSizeMB = 5 }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (selectedFile) => {
    if (!selectedFile) return;
    if (!selectedFile.type.startsWith("image/")) {
      toast.error("يرجى رفع صورة بصيغة JPG أو PNG فقط");
      return;
    }
    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      toast.error(`حجم الملف يجب أن يكون أقل من ${maxSizeMB}MB`);
      return;
    }
    onFileChange(selectedFile);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
      {/* Upload Zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center w-full sm:w-44 h-32 rounded-xl border-2 border-dashed cursor-pointer transition-all select-none
          ${dragOver ? 'border-[#7B1FA2] bg-purple-50' : file ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-gray-50 hover:border-[#7B1FA2] hover:bg-purple-50/40'}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFile(e.target.files[0])}
        />
        {/* Upload Icon */}
        <svg className={`w-8 h-8 mb-2 transition-colors ${file ? 'text-green-500' : 'text-[#7B1FA2]'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
        </svg>
        <p className={`text-xs font-bold text-center ${file ? 'text-green-600' : 'text-gray-500'}`}>
          {file ? file.name.length > 16 ? file.name.substring(0, 16) + '...' : file.name : label}
        </p>
        <p className="text-[10px] text-gray-400 mt-0.5">JPG, PNG • Max {maxSizeMB}MB</p>
      </div>

      {/* Preview */}
      <div className="flex-1 min-w-0">
        {file ? (
          <div className="relative group w-full sm:w-48 h-32 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <img
              src={URL.createObjectURL(file)}
              alt={label}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onFileChange(null); }}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition"
            >✕</button>
          </div>
        ) : (
          <div className="w-full sm:w-48 h-32 rounded-xl border border-gray-200 bg-gray-100 flex items-center justify-center">
            <span className="text-gray-400 text-xs text-center px-4">صورة {label} ستظهر هنا بعد الرفع</span>
          </div>
        )}
        <div className="mt-2">
          <p className="font-bold text-gray-800 text-sm">{label}</p>
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

function SuccessPopup({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative shadow-2xl text-center">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl transition">✕</button>

        {/* Decorative dots */}
        <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-yellow-300 opacity-60"></div>
        <div className="absolute top-8 left-8 w-1.5 h-1.5 rounded-full bg-yellow-200 opacity-50"></div>
        <div className="absolute top-3 right-10 w-1 h-1 rounded-full bg-purple-300 opacity-60"></div>

        {/* Icon */}
        <div className="w-20 h-20 rounded-full border-4 border-[#7B1FA2] flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-[#7B1FA2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">Verification Request Submitted!</h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-1">Your verification request has been received and is currently under review.</p>
        <p className="text-sm text-gray-500 leading-relaxed mb-6">We will send you an email with the result.</p>

        <button
          onClick={onClose}
          className="w-full bg-[#FFC107] hover:bg-[#e6ac00] text-white font-bold py-3 rounded-xl transition shadow-md"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

function FailedPopup({ errors, onTryAgain }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full relative shadow-2xl text-center">
        <button onClick={onTryAgain} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl transition">✕</button>

        {/* Decorative dots */}
        <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-orange-300 opacity-60"></div>
        <div className="absolute top-8 left-8 w-1.5 h-1.5 rounded-full bg-orange-200 opacity-50"></div>

        {/* Icon */}
        <div className="w-20 h-20 rounded-full border-4 border-[#FFC107] flex items-center justify-center mx-auto mb-5">
          <svg className="w-10 h-10 text-[#FFC107]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h2 className="text-xl font-bold text-[#FFC107] mb-2">Verification Failed</h2>

        {errors && Object.keys(errors).length > 0 ? (
          <ul className="text-sm text-gray-600 leading-relaxed mb-4 text-right space-y-1">
            {Object.entries(errors).map(([field, msgs]) =>
              msgs.map((msg, i) => (
                <li key={`${field}-${i}`} className="text-red-500 text-xs">• {msg}</li>
              ))
            )}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 leading-relaxed mb-4">
            We couldn't verify your account because the images were unclear, incomplete, or didn't meet our requirements.
            Please upload clear images and try again.
          </p>
        )}

        <button
          onClick={onTryAgain}
          className="w-full bg-[#FFC107] hover:bg-[#e6ac00] text-white font-bold py-3 rounded-xl transition shadow-md"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Main Verification Page
// ────────────────────────────────────────────────────────────

export default function Verification() {
  const navigate = useNavigate();

  // Form state
  const [nationalNumber, setNationalNumber] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [selfieWithId, setSelfieWithId] = useState(null);

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [apiErrors, setApiErrors] = useState(null);

  // Validation
  const isFormValid = nationalNumber.trim() && country.trim() && city.trim() && idFront && idBack && selfieWithId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      toast.error("يرجى تعبئة جميع الحقول ورفع جميع الصور المطلوبة");
      return;
    }

    setIsSubmitting(true);
    setApiErrors(null);

    try {
      const formData = new FormData();
      formData.append('NationalNumber', nationalNumber.trim());
      formData.append('Country', country.trim());
      formData.append('City', city.trim());
      formData.append('IdFront', idFront);
      formData.append('IdBack', idBack);
      formData.append('SelfieWithId', selfieWithId);

      await submitVerificationRequest(formData);
      setShowSuccess(true);

    } catch (error) {
      const responseData = error?.response?.data;
      if (responseData?.errors) {
        setApiErrors(responseData.errors);
      }
      setShowFailed(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate(-1); // Go back to profile
  };

  const handleTryAgain = () => {
    setShowFailed(false);
    setApiErrors(null);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-20 pb-16">

      {/* Popups */}
      {showSuccess && <SuccessPopup onClose={handleSuccessClose} />}
      {showFailed && <FailedPopup errors={apiErrors} onTryAgain={handleTryAgain} />}

      <div className="max-w-2xl mx-auto px-4">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-[#7B1FA2] mb-6 text-sm font-medium transition group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Profile
        </button>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Header */}
          <div className="text-center pt-10 pb-6 px-6">
            {/* Shield Icon */}
            <div className="w-16 h-16 rounded-2xl bg-[#f3e8ff] flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-[#7B1FA2]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Account</h1>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md mx-auto">
              To increase the security of your account and unlock more features, please upload clear photos of your ID and a selfie holding your ID.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="px-6 sm:px-10 pb-10 space-y-8">

            {/* Personal Info Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="relative">
                <span className="absolute left-3 -top-2 bg-white px-1 text-[11px] font-medium text-gray-500 z-10">National Number</span>
                <input
                  type="text"
                  value={nationalNumber}
                  onChange={(e) => setNationalNumber(e.target.value)}
                  placeholder="14-digit ID number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#7B1FA2] focus:border-[#7B1FA2] text-sm transition bg-gray-50/50"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 -top-2 bg-white px-1 text-[11px] font-medium text-gray-500 z-10">Country</span>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="e.g. Egypt"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#7B1FA2] focus:border-[#7B1FA2] text-sm transition bg-gray-50/50"
                />
              </div>
              <div className="relative">
                <span className="absolute left-3 -top-2 bg-white px-1 text-[11px] font-medium text-gray-500 z-10">City</span>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Cairo"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#7B1FA2] focus:border-[#7B1FA2] text-sm transition bg-gray-50/50"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-100"></div>

            {/* Upload Zones */}
            <div className="space-y-6">
              <UploadZone
                label="ID Front"
                description="Please upload a clear photo of the front side of your ID."
                file={idFront}
                onFileChange={setIdFront}
              />
              <UploadZone
                label="ID Back"
                description="Please upload a clear photo of the back side of your ID."
                file={idBack}
                onFileChange={setIdBack}
              />
              <UploadZone
                label="Selfie with ID"
                description="Please upload a clear selfie holding your ID."
                file={selfieWithId}
                onFileChange={setSelfieWithId}
              />
            </div>

            {/* Warning Note */}
            <div className="flex items-start gap-3 bg-[#fff8e1] border border-[#ffe082] rounded-xl p-4">
              <svg className="w-5 h-5 text-[#FFC107] mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-[#8a6900] font-medium">
                Make sure all images are clear, unedited, and show all details.
              </p>
            </div>

            {/* Submit Button */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSubmitting || !isFormValid}
                className={`w-full py-4 rounded-xl font-bold text-base transition shadow-md
                  ${isSubmitting || !isFormValid
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#FFC107] hover:bg-[#e6ac00] text-white hover:shadow-lg active:scale-[0.99]'
                  }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : 'Verify Account'}
              </button>

              {/* Security Note */}
              <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
                Your data is encrypted and secure
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
