import { useState } from 'react';

export default function PostJob() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    duration: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Job Posted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-700 text-white py-8 px-4">
        <h1 className="text-3xl font-bold text-center">Post Your Job</h1>
        <p className="text-center text-purple-100 mt-2">Get professional help for your next project</p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
          
          {/* Job Title */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Job Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., E-Commerce Website Development"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              required
            />
          </div>

          {/* Job Description */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Job Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your job requirements, scope, and expectations..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 h-32"
              required
            />
          </div>

          {/* Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                required
              >
                <option value="">Select a category</option>
                <option value="web">Web Development</option>
                <option value="mobile">Mobile Development</option>
                <option value="design">Design</option>
                <option value="marketing">Marketing</option>
                <option value="writing">Writing</option>
              </select>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Budget (SAR) *</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="e.g., 10000"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                required
              />
            </div>
          </div>

          {/* Duration */}
          <div className="mb-8">
            <label className="block text-gray-700 font-semibold mb-2">Project Duration *</label>
            <select
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              required
            >
              <option value="">Select duration</option>
              <option value="1week">1 Week</option>
              <option value="2weeks">2 Weeks</option>
              <option value="1month">1 Month</option>
              <option value="2months">2 Months</option>
              <option value="ongoing">Ongoing</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-200"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}
