import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Star } from "lucide-react";

export default function ServiceDetails() {
  const { id } = useParams();
  const serviceId = id || 1; // Fallback to 1 if no id is provided in the route

  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      const baseUrl = import.meta.env.VITE_BASE_URL || 'https://localhost:7210';
      const token = localStorage.getItem("token");

      const options = {
        method: 'GET',
        url: `${baseUrl}/api/Services/${serviceId}`,
        headers: {
          'X-API-Version': '',
          'Authorization': token ? `Bearer ${token}` : '' // إرسال التوكن
        }
      };

      try {
        setLoading(true);
        const { data } = await axios.request(options);
        if (data.isSuccess) {
          setServiceData(data.data);
        } else {
          setError(data.message || "Failed to load service details.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching service details.");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-semibold text-gray-600">Loading...</div>;
  }

  if (error || !serviceData) {
    return <div className="min-h-screen flex items-center justify-center text-red-600 text-xl font-semibold">{error || "Service not found"}</div>;
  }

  // Helper to determine if image string already has data URI prefix
  const getImageSrc = (imgStr) => {
    if (!imgStr) return "https://via.placeholder.com/800x450?text=No+Image";
    if (imgStr.startsWith("data:image")) return imgStr;
    return `data:image/jpeg;base64,${imgStr}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-left pt-20" dir="ltr">
      <div className="max-w-7xl mx-auto p-4 py-8">
        {/* Title and Contact Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 sm:mb-0">
            &ldquo;{serviceData.serviceTitle}&rdquo;
          </h1>
          <button className="bg-[#4a148c] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#380b6b] transition">
            Contact Me
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image */}
            <div className="rounded-xl overflow-hidden shadow-sm bg-white border border-gray-200 aspect-[16/9]">
              {serviceData.mainImage ? (
                <img
                  src={getImageSrc(serviceData.mainImage)}
                  alt={serviceData.serviceTitle}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/800x450?text=Error+Loading+Image" }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                  No Image Available
                </div>
              )}
            </div>

            {/* Service Details */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 border-b-2 border-gray-300 pb-2 inline-block">
                Service details
              </h2>
              <p className="text-gray-700 leading-relaxed mt-2 whitespace-pre-wrap">
                {serviceData.detailDescription}
              </p>
            </div>

            {/* Requirements / Details */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-2 border-b-2 border-gray-300 pb-2 inline-block">
                Requirements / Details
              </h2>
              <p className="text-gray-700 leading-relaxed mt-2 whitespace-pre-wrap">
                {serviceData.shortDescription}
              </p>
            </div>

            {/* Business Exhibition */}
            {Array.isArray(serviceData.serviceImages) && serviceData.serviceImages.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-2 border-b-2 border-gray-300 pb-2 inline-block">
                  Business Exhibition
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {serviceData.serviceImages.map((img, idx) => (
                    <div key={idx} className="rounded-xl overflow-hidden shadow-sm border border-gray-200 aspect-video">
                      <img
                        src={getImageSrc(img)}
                        alt={`Exhibition ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/400x225?text=Error" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Buying the service */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2 inline-block">
                Buying the service
              </h3>

              <div className="flex justify-between items-center mt-2 mb-6">
                <span className="text-gray-700 font-medium">Price</span>
                <span className="text-gray-900 font-bold">{serviceData.price} EGP</span>
              </div>

              {Array.isArray(serviceData.concepts) && serviceData.concepts.length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1 inline-block">
                    Optional Extras
                  </h4>
                  <ul className="space-y-2 mt-2">
                    {serviceData.concepts.map((concept, idx) => (
                      <li key={idx} className="text-gray-600 text-sm flex items-center">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                        {concept}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Service card */}
            {serviceData.providerServiceInfo && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-6 border-b-2 border-gray-300 pb-2 inline-block">
                  Service card
                </h3>

                <div className="flex items-center gap-4 mt-2 mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex-shrink-0">
                    {serviceData.providerServiceInfo.image ? (
                      <img
                        src={getImageSrc(serviceData.providerServiceInfo.image)}
                        alt={serviceData.providerServiceInfo.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = "https://via.placeholder.com/64?text=U" }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">U</div>
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      {serviceData.providerServiceInfo.name}
                    </h4>
                    <p className="text-gray-500 text-sm">
                      {serviceData.providerServiceInfo.jobTitle}
                    </p>
                    <div className="flex items-center mt-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill={i < Math.round(serviceData.providerServiceInfo.averageRating || 0) ? "currentColor" : "none"}
                            className={i < Math.round(serviceData.providerServiceInfo.averageRating || 0) ? "" : "text-gray-300"}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 ml-2">
                        {serviceData.providerServiceInfo.averageRating} ({serviceData.ordersCount} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-700 text-sm">Average response speed</span>
                    <span className="text-gray-900 text-sm font-medium">{serviceData.providerServiceInfo.averageResponseTime} hour</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-700 text-sm">Orders in progress</span>
                    <span className="text-gray-900 text-sm font-medium">{serviceData.providerServiceInfo.totalOrdersInProgress}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                    <span className="text-gray-700 text-sm">Number of requests</span>
                    <span className="text-gray-900 text-sm font-medium">{serviceData.ordersCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 text-sm">Delivery time</span>
                    <span className="text-gray-900 text-sm font-medium">{serviceData.deliveryTimeInDays} Days</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
