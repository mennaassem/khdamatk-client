interface Job {
  id: number;
  title: string;
  description: string;
  budget: string;
  category: string;
  rating: number;
  clientName: string;
  clientImage: string;
  proposals?: number;
}

export default function JobMatches() {
  const jobs: Job[] = [
    {
      id: 1,
      title: 'E-Commerce Website Development',
      description: 'Need a modern e-commerce platform with payment integration. Must include product catalog, shopping cart, and payment gateway.',
      budget: '10,000 - 15,000 SAR',
      category: 'Web Development',
      rating: 4.8,
      clientName: 'Ahmed Hassan',
      clientImage: '👨‍💼',
      proposals: 12,
    },
    {
      id: 2,
      title: 'Mobile App UI/UX Design',
      description: 'Design beautiful UI for iOS and Android applications. Include wireframes and interactive prototypes.',
      budget: '5,000 - 8,000 SAR',
      category: 'Design',
      rating: 4.9,
      clientName: 'Fatima Al-Rashid',
      clientImage: '👩‍💼',
      proposals: 8,
    },
    {
      id: 3,
      title: 'Content Writing for Blog',
      description: 'Write 10 SEO-optimized blog posts about technology, each 1500+ words. Topics include AI, cloud computing, and cybersecurity.',
      budget: '2,000 - 3,500 SAR',
      category: 'Writing',
      rating: 4.7,
      clientName: 'Mohammed Karim',
      clientImage: '👨‍💼',
      proposals: 15,
    },
    {
      id: 4,
      title: 'Digital Marketing Campaign',
      description: 'Create and manage social media marketing campaign for 3 months across Facebook, Instagram, and LinkedIn.',
      budget: '8,000 - 12,000 SAR',
      category: 'Marketing',
      rating: 4.6,
      clientName: 'Saira Khan',
      clientImage: '👩‍💼',
      proposals: 6,
    },
    {
      id: 5,
      title: 'Logo Design & Branding',
      description: 'Professional logo design for tech startup. Include multiple concepts and unlimited revisions.',
      budget: '3,000 - 5,000 SAR',
      category: 'Design',
      rating: 4.8,
      clientName: 'Hassan Ahmed',
      clientImage: '👨‍💼',
      proposals: 22,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-700 text-white py-8 px-4">
        <h1 className="text-3xl font-bold text-center">Job Matches</h1>
        <p className="text-center text-purple-100 mt-2">Find the perfect job opportunities</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white shadow-sm px-4 py-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex gap-3 flex-wrap">
          <button className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 font-semibold">All</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 font-semibold">Web Dev</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 font-semibold">Design</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 font-semibold">Marketing</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 font-semibold">Writing</button>
        </div>
      </div>

      {/* Jobs List */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow hover:shadow-md transition overflow-hidden">
              <div className="p-6">
                {/* Job Header */}
                <div className="flex justify-between items-start gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                        {job.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{job.description}</p>
                  </div>
                </div>

                {/* Job Details */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 py-4 border-t border-b border-gray-200">
                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase">Budget</p>
                    <p className="text-lg font-bold text-purple-600 mt-1">{job.budget}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase">Rating</p>
                    <div className="flex items-center mt-1">
                      <span className="text-yellow-500">⭐</span>
                      <span className="ml-1 font-bold text-gray-800">{job.rating}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase">Client</p>
                    <p className="font-semibold text-gray-800 mt-1">{job.clientName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase">Proposals</p>
                    <p className="text-lg font-bold text-gray-800 mt-1">{job.proposals}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs font-semibold uppercase">Status</p>
                    <p className="text-green-600 font-bold mt-1">✓ Open</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-3">
                  <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition">
                    View Details
                  </button>
                  <button className="flex-1 border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-bold py-2 rounded-lg transition">
                    Save Job
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition">
            Load More Jobs
          </button>
        </div>
      </div>
    </div>
  );
}
