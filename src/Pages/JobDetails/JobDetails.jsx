import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star } from "lucide-react";

export default function JobDetails() {
  const { id } = useParams(); // Get job ID from URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      const options = {
        method: 'GET',
        url: `https://localhost:7210/api/Jobs/${id || 1}`
      };

      try {
        const { data } = await axios.request(options);
        console.log(data);
        
        // Check if response is successful and has data
        if (data.isSuccess && data.data) {
          setJob(data.data); // data.data is now an object, not an array
        } else {
          setError('لم يتم العثور على الوظيفة');
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('فشل في تحميل تفاصيل الوظيفة');
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]); // Re-fetch when ID changes

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen pt-24">
  <div className="max-w-6xl mx-auto p-4 py-8">
    <div className="bg-white rounded-lg shadow p-6 text-center">
      <p className="text-xl">Loading job details...</p>
    </div>
  </div>
</div>
    );
  }

  // Error state
  if (error) {
    return (
     <div className="bg-gray-50 min-h-screen pt-24">
  <div className="max-w-6xl mx-auto p-4 py-8">
    <div className="bg-white rounded-lg shadow p-6 text-center">
      <p className="text-xl text-red-600">{error}</p>
    </div>
  </div>
</div>
    );
  }

  // No job data
  if (!job) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto p-4 py-8">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-xl">Job not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Purple Header with Job Title - Added padding-top for navbar */}
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-12 pt-24">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center">"{job.title}"</h1>
        </div>
      </div>

      {/* Main Content - Wider Container */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Job Details Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-3">JOB DETAILS</h2>
              <p className="text-gray-600 text-lg">Proposals: <span className="font-semibold">{job.offersCount}</span></p>
            </div>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-md hover:shadow-lg transition-all">
              Apply Now
            </button>
          </div>

          {/* Stats Grid - 3 Columns */}
          <div className="grid grid-cols-3 gap-6 mb-10 pb-8 border-b-2 border-gray-200">
            <div className="text-center">
              <p className="font-bold text-xl mb-2">{job.experienceLevel}</p>
              <p className="text-gray-600 text-base font-medium">Experience</p>
            </div>
            <div className="text-center border-x-2 border-gray-200">
              <p className="font-bold text-xl mb-2">{job.projectLength}</p>
              <p className="text-gray-600 text-base font-medium">Project Length</p>
            </div>
            <div className="text-center">
              <p className="font-bold text-xl mb-2">{job.budgetMin} - {job.budgetMax} EGP</p>
              <p className="text-gray-600 text-base font-medium">Budget</p>
            </div>
          </div>

          {/* Job Requirements */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-4">Job Requirements:</h3>
            <p className="text-gray-700 leading-relaxed text-base">
              {job.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
            </p>
          </div>

          {/* Skills */}
          <div className="mb-10">
            <h3 className="text-2xl font-bold mb-4">The Ideal Candidate Skills:</h3>
            <div className="flex flex-wrap gap-3">
              {job.requiredSkills && job.requiredSkills.length > 0 ? (
                job.requiredSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gray-200 text-gray-800 px-5 py-2.5 rounded-full text-base font-medium"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <>
                  <span className="bg-gray-200 text-gray-800 px-5 py-2.5 rounded-full text-base font-medium">Skills</span>
                  <span className="bg-gray-200 text-gray-800 px-5 py-2.5 rounded-full text-base font-medium">Skills</span>
                  <span className="bg-gray-200 text-gray-800 px-5 py-2.5 rounded-full text-base font-medium">Skills</span>
                  <span className="bg-gray-200 text-gray-800 px-5 py-2.5 rounded-full text-base font-medium">Skills</span>
                </>
              )}
            </div>
          </div>

          {/* Details Table */}
          <div className="space-y-0 border-t-2 border-gray-200">
            {/* Category */}
            <div className="flex justify-between items-center py-5 border-b border-gray-200">
              <span className="font-bold text-lg">Category</span>
              <span className="bg-purple-700 text-white px-8 py-2 rounded-md font-semibold text-base">
                {job.categoryName}
              </span>
            </div>

            {/* Time Commitment */}
            <div className="flex justify-between items-center py-5 border-b border-gray-200">
              <span className="font-bold text-lg">Time Commitment</span>
              <span className="bg-purple-700 text-white px-8 py-2 rounded-md font-semibold text-base">
                {job.timeCommitment}
              </span>
            </div>

            {/* Posted At */}
            <div className="flex justify-between items-center py-5 border-b border-gray-200">
              <span className="font-bold text-lg">Posted At</span>
              <span className="text-gray-800 font-semibold text-base">
                {new Date(job.createdAt).toLocaleString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: true
                }).toUpperCase()}
              </span>
            </div>

            {/* Job Deadline */}
            <div className="flex justify-between items-center py-5 border-b border-gray-200">
              <span className="font-bold text-lg">Job Deadline</span>
              <span className="text-gray-800 font-semibold text-base">
                {new Date(job.deadline).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                })}
              </span>
            </div>

            {/* Client's Review */}
            <div className="flex justify-between items-center py-5">
              <span className="font-bold text-lg">Client's Review</span>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className="text-gray-300"
                    strokeWidth={2}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
