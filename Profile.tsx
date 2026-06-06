import { useState } from 'react';

interface UserProfile {
  name: string;
  title: string;
  rating: number;
  reviews: number;
  completedJobs: number;
  successRate: number;
  bio: string;
  skills: string[];
  hourlyRate: string;
}

export default function Profile() {
  const [activeTab, setActiveTab] = useState('about');

  const profile: UserProfile = {
    name: 'Ahmed Hassan',
    title: 'Full Stack Developer',
    rating: 4.9,
    reviews: 287,
    completedJobs: 156,
    successRate: 98,
    bio: 'Professional full-stack developer with 8+ years of experience in web and mobile development. Specialized in React, Node.js, and modern web technologies.',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'Firebase', 'AWS', 'Docker', 'Next.js'],
    hourlyRate: '150 SAR/hour',
  };

  const completedProjects = [
    { id: 1, title: 'E-Commerce Platform', client: 'Tech Store', rating: 5, budget: '15,000 SAR' },
    { id: 2, title: 'Mobile App', client: 'StartUp Co', rating: 4.8, budget: '20,000 SAR' },
    { id: 3, title: 'Dashboard System', client: 'Enterprise Inc', rating: 5, budget: '25,000 SAR' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-700 text-white py-6 px-4">
        <h1 className="text-3xl font-bold text-center">User Profile</h1>
      </div>

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          {/* Cover Image */}
          <div className="h-32 bg-gradient-to-r from-purple-500 to-purple-700"></div>

          {/* Profile Info */}
          <div className="px-6 py-6 flex flex-col md:flex-row items-start md:items-center gap-6">
            {/* Avatar */}
            <div className="relative -mt-16">
              <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-6xl border-4 border-white shadow">
                👨‍💻
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-gray-800">{profile.name}</h2>
              <p className="text-purple-600 text-lg font-semibold mb-3">{profile.title}</p>
              <div className="flex items-center gap-4 mb-4 flex-wrap text-sm md:text-base">
                <div className="flex items-center">
                  <span className="text-yellow-500">⭐</span>
                  <span className="ml-1 font-bold text-gray-800">{profile.rating}</span>
                  <span className="text-gray-600 ml-1">({profile.reviews} reviews)</span>
                </div>
                <div className="text-gray-700">✓ {profile.completedJobs} Jobs</div>
                <div className="text-green-600 font-semibold">✓ {profile.successRate}% Success</div>
              </div>
              <p className="text-purple-600 font-semibold text-lg">{profile.hourlyRate}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-col md:flex-row w-full md:w-auto">
              <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition">
                Edit Profile
              </button>
              <button className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-bold py-2 px-6 rounded-lg transition">
                Share Profile
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 py-4 font-semibold transition text-center ${
                activeTab === 'about'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex-1 py-4 font-semibold transition text-center ${
                activeTab === 'projects'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-4 font-semibold transition text-center ${
                activeTab === 'reviews'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Bio</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{profile.bio}</p>

                <h3 className="text-lg font-bold text-gray-800 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-3">
                  {profile.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Completed Projects</h3>
                {completedProjects.map((project) => (
                  <div key={project.id} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800">{project.title}</h4>
                        <p className="text-gray-600 text-sm">Client: {project.client}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center mb-2">
                          <span className="text-yellow-500">⭐</span>
                          <span className="ml-1 font-bold">{project.rating}</span>
                        </div>
                        <p className="text-purple-600 font-semibold">{project.budget}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Reviews</h3>
                {[1, 2, 3].map((review) => (
                  <div key={review} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">👤</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-gray-800">Client Name</h4>
                            <p className="text-gray-600 text-sm">Project: Web Development</p>
                          </div>
                          <div className="flex items-center">
                            <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm">
                          Excellent work! Very professional and delivered on time. Highly recommended!
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 text-sm mb-2 font-semibold">Jobs Completed</p>
            <p className="text-3xl font-bold text-purple-600">{profile.completedJobs}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 text-sm mb-2 font-semibold">Success Rate</p>
            <p className="text-3xl font-bold text-green-600">{profile.successRate}%</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 text-sm mb-2 font-semibold">Rating</p>
            <p className="text-3xl font-bold text-yellow-600">{profile.rating}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600 text-sm mb-2 font-semibold">Reviews</p>
            <p className="text-3xl font-bold text-blue-600">{profile.reviews}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
