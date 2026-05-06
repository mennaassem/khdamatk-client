import { Link } from "react-router-dom";

// FreelancerProfileCard.jsx
export default function FreelancerProfileCard({ provider }) {
  
  console.log("provider =", provider);
  return (
    <div className="mb-6 rounded-2xl p-6 text-center shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-900 border border-gray-100">

      {/* Avatar */}
      <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>

      {/* Name */}
      <h3 className="font-semibold text-lg text-gray-800">{provider.userName}</h3>
      <p className="text-gray-500 text-sm mb-4">{provider.jobTitle}</p>

      {/* Hourly Rate */}
      <div className="flex justify-between bg-gray-50 rounded-lg px-4 py-2 text-sm text-gray-600 mb-4">
        <span>Hourly Rate</span>
        <span className="font-semibold text-gray-800">{provider.hourlyRate} EGP</span>
      </div>

      {/* Skills */}
      <div className="flex flex-wrap justify-center gap-2 mb-5">
        {provider.skills.map((skill, idx) => (
          <span key={idx} className="bg-gray-100 px-3 py-1 text-xs rounded-full">{skill}</span>
        ))}
      </div>

       
      <Link 
to={`/profile/565d8146-aa5c-48cf-b25f-5edf7db61f34`}
  className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition"
>
  View Profile
</Link>
    </div>
  );
}