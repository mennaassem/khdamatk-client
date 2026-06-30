 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const getUserIdFromToken = (token) => {
  if (!token) return '';

  try {
    const decoded = jwtDecode(token);
    return (
      decoded?.userId ||
      decoded?.UserId ||
      decoded?.id ||
      decoded?.sub ||
      decoded?.nameid ||
      decoded?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] ||
      ''
    );
  } catch (error) {
    console.error('Error decoding token:', error);
    return '';
  }
};

export default function PostJop() {
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem('token');
  const userId = getUserIdFromToken(token);
  const [formData, setFormData] = useState({
    UserId: userId,
    Title: '',
    CategoryName: '',
    Description: '',
    Skills: '',
    BudgetMin: '',
    BudgetMax: '',
    TimeCommitment: '',
    ExperienceLevel: '',
    Media: '',
    Deadline: ''
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      UserId: userId
    }));
  }, [userId]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('https://localhost:7210/api/Home', {
          headers: { 'X-API-Version': '' }
        });
        if (data.isSuccess && data.data && data.data.servicesCategories) {
          setCategories(data.data.servicesCategories);
        }
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert('يجب تسجيل الدخول أولاً لنشر وظيفة');
      return;
    }

    const finalFormData = {
      ...formData,
      UserId: formData.UserId || userId || ''
    };

    if (!finalFormData.UserId) {
      alert('لم يتم العثور على معرف المستخدم. يرجى تسجيل الدخول مرة أخرى');
      return;
    }

    const encodedParams = new URLSearchParams();
    Object.keys(finalFormData).forEach(key => {
      encodedParams.set(key, finalFormData[key]);
    });

    try {
      const { data } = await axios.post('https://localhost:7210/api/JobOrder/Jobs', encodedParams, {
        headers: {
          'X-API-Version': '',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${token}`
        }
      });
      
      console.log('Success:', data);
      if (data.isSuccess || data.status === 201) {
        alert('Job posted successfully!');
        // Optional: Reset form or navigate away
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post the job. Please check the console for more details.');
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen transition-colors duration-300">

      {/* Black Banner */}
      <div className="bg-black text-white text-center p-10 text-3xl font-medium">
        Post your jobs for free to receive professional proposals Now!
      </div>

      {/* Card Wrapper */}
      <div className="max-w-5xl mx-auto -mt-8 mb-20 px-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-black dark:text-white">

          <h2 className="text-2xl font-semibold mb-12">
            Post Your Job
          </h2>
          
          <form onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div className="grid md:grid-cols-2 gap-14 mb-10">
              <div>
                <label className="block mb-3 text-lg">Service Category*</label>
                <select 
                  name="CategoryName"
                  value={formData.CategoryName}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-400 py-3 outline-none bg-transparent"
                >
                  <option value="" className="text-black">Select a category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category} className="text-black">
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-3 text-lg">Job Title*</label>
                <input
                  type="text"
                  name="Title"
                  value={formData.Title}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-400 py-3 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mb-12">
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Description"
                required
                rows="6"
                className="w-full bg-gray-200 dark:bg-gray-700 dark:text-white rounded-md p-8 resize-none outline-none text-black"
              ></textarea>
            </div>

            {/* Skills */}
            <div className="mb-10">
              <label className="block mb-3 text-lg">Skills</label>
              <input
                type="text"
                name="Skills"
                value={formData.Skills}
                onChange={handleChange}
                placeholder="e.g. React, UI/UX"
                className="w-full border-b border-gray-400 py-3 outline-none bg-transparent"
              />
            </div>

            {/* Budget */}
            <div className="grid md:grid-cols-2 gap-14 mb-10">
              <div>
                <label className="block mb-3 text-lg">Budget From *</label>
                <input 
                  type="number"
                  name="BudgetMin"
                  value={formData.BudgetMin}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full border-b border-gray-400 py-3 outline-none bg-transparent"
                />
              </div>

              <div>
                <label className="block mb-3 text-lg">Budget To *</label>
                <input 
                  type="number"
                  name="BudgetMax"
                  value={formData.BudgetMax}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full border-b border-gray-400 py-3 outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Duration */}
            <div className="grid md:grid-cols-2 gap-14 mb-10">
              <div>
                {/* Note: Keeping this for UI, but it's not present in your requested API payload */}
                <label className="block mb-3 text-lg">Duration *</label>
                <input 
                  type="text"
                  placeholder="e.g. 1 Month"
                  className="w-full border-b border-gray-400 py-3 outline-none bg-transparent"
                />
              </div>

              <div>
                <label className="block mb-3 text-lg">Time Commitment *</label>
                <select 
                  name="TimeCommitment"
                  value={formData.TimeCommitment}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-400 py-3 outline-none bg-transparent"
                >
                  <option value="" className="text-black">Select Time Commitment</option>
                  <option value="0" className="text-black">Part Time</option>
                  <option value="1" className="text-black">Full Time</option>
                  <option value="2" className="text-black">Hourly</option>
                  <option value="3" className="text-black">Flexible</option>
                </select>
              </div>
            </div>

            {/* Experience & Deadline */}
            <div className="grid md:grid-cols-2 gap-14 mb-14">
              <div>
                <label className="block mb-3 text-lg">Experience *</label>
                <select 
                  name="ExperienceLevel"
                  value={formData.ExperienceLevel}
                  onChange={handleChange}
                  required
                  className="w-full border-b border-gray-400 py-3 outline-none bg-transparent"
                >
                  <option value="" className="text-black">Select Experience Level</option>
                  <option value="1" className="text-black">Entry</option>
                  <option value="2" className="text-black">Intermediate</option>
                  <option value="3" className="text-black">Expert</option>
                </select>
              </div>
           <div>

              <div>

              <div>
                <label className="block mb-3 text-lg">Job Deadline</label>
                <div className="flex items-center border-b border-gray-400 py-3">
                  <input
                    type="date"
                    name="Deadline"
                    value={formData.Deadline}
                    onChange={handleChange}
                    className="w-full outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Button */}
            <button 
              type="submit"
              className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition"
            >
              Post
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
