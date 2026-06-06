import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to KHADMA HUB</h1>
          <p className="text-xl text-purple-100 mb-8">
            Connect with skilled professionals and find the best services for your business
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/post-job"
              className="bg-white text-purple-600 hover:bg-purple-50 font-bold py-3 px-8 rounded-lg transition"
            >
              Post a Job
            </Link>
            <Link
              to="/job-matches"
              className="border-2 border-white text-white hover:bg-purple-700 font-bold py-3 px-8 rounded-lg transition"
            >
              Find Jobs
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">Why Choose KHADMA HUB?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">🌟</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Verified Professionals</h3>
            <p className="text-gray-600">
              All professionals on our platform are verified and rated by clients
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Payments</h3>
            <p className="text-gray-600">
              Safe and secure payment system to protect both clients and professionals
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-5xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Fast & Reliable</h3>
            <p className="text-gray-600">
              Quick project matching and reliable support throughout the process
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-purple-700 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold">5000+</p>
            <p className="text-purple-100 mt-2">Active Projects</p>
          </div>
          <div>
            <p className="text-4xl font-bold">3000+</p>
            <p className="text-purple-100 mt-2">Professionals</p>
          </div>
          <div>
            <p className="text-4xl font-bold">₨ 50M+</p>
            <p className="text-purple-100 mt-2">Projects Value</p>
          </div>
          <div>
            <p className="text-4xl font-bold">4.8⭐</p>
            <p className="text-purple-100 mt-2">Average Rating</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Ready to Get Started?</h2>
        <p className="text-xl text-gray-600 mb-8">
          Join thousands of professionals and clients using KHADMA HUB
        </p>
        <Link
          to="/job-matches"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-lg transition inline-block"
        >
          Explore Now
        </Link>
      </div>
    </div>
  );
}
