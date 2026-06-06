import { useState } from 'react';

interface Service {
  id: number;
  title: string;
  provider: string;
  rating: number;
  price: string;
  description: string;
  image: string;
  reviews: number;
}

export default function Services() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const services: Service[] = [
    {
      id: 1,
      title: 'Website Development',
      provider: 'Tech Solutions',
      rating: 4.9,
      price: '5,000 SAR',
      description: 'Professional website development with modern technologies',
      image: '🌐',
      reviews: 156,
    },
    {
      id: 2,
      title: 'Graphic Design',
      provider: 'Creative Studio',
      rating: 4.8,
      price: '2,000 SAR',
      description: 'Custom graphic design for your brand',
      image: '🎨',
      reviews: 89,
    },
    {
      id: 3,
      title: 'Digital Marketing',
      provider: 'Marketing Pro',
      rating: 4.7,
      price: '3,500 SAR',
      description: 'Complete digital marketing strategy and execution',
      image: '📱',
      reviews: 203,
    },
    {
      id: 4,
      title: 'Content Writing',
      provider: 'Writers Hub',
      rating: 4.6,
      price: '1,500 SAR',
      description: 'High-quality content for your website or blog',
      image: '✍️',
      reviews: 134,
    },
    {
      id: 5,
      title: 'Mobile App Development',
      provider: 'App Masters',
      rating: 4.9,
      price: '8,000 SAR',
      description: 'Custom iOS and Android applications',
      image: '📱',
      reviews: 267,
    },
    {
      id: 6,
      title: 'SEO Optimization',
      provider: 'SEO Experts',
      rating: 4.8,
      price: '2,500 SAR',
      description: 'Boost your website ranking on search engines',
      image: '🔍',
      reviews: 178,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-purple-700 text-white py-8 px-4">
        <h1 className="text-3xl font-bold text-center">Explore Services</h1>
        <p className="text-center text-purple-100 mt-2">Choose from our professional services</p>
      </div>

      {/* Search and Filter */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search services..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
          <select className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500">
            <option>Sort by</option>
            <option>Highest Rating</option>
            <option>Most Reviews</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-3 mb-8 flex-wrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Services
          </button>
          <button
            onClick={() => setSelectedCategory('design')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              selectedCategory === 'design'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Design
          </button>
          <button
            onClick={() => setSelectedCategory('development')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              selectedCategory === 'development'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Development
          </button>
          <button
            onClick={() => setSelectedCategory('marketing')}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              selectedCategory === 'marketing'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Marketing
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
              {/* Service Image */}
              <div className="bg-gradient-to-r from-purple-400 to-purple-600 h-32 flex items-center justify-center">
                <span className="text-6xl">{service.image}</span>
              </div>

              {/* Service Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{service.description}</p>
                <p className="text-purple-600 font-semibold mb-3 text-sm">{service.provider}</p>

                {/* Rating and Reviews */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center">
                    <span className="text-yellow-500">⭐</span>
                    <span className="ml-1 font-bold text-gray-800">{service.rating}</span>
                  </div>
                  <span className="text-gray-500 text-sm ml-2">({service.reviews} reviews)</span>
                </div>

                {/* Price and CTA */}
                <div className="mt-auto pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-purple-600">{service.price}</span>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition text-sm">
                      Hire Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
