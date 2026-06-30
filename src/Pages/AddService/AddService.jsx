import React, { useState, useEffect, useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Upload, Trash2, CheckCircle2, PenTool } from "lucide-react";
import { AuthContext } from '../../Components/Context/AuthContext';

export default function AddService() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    categoryName: "",
    shortDescription: "",
    detailDescription: "",
    price: "",
    deliveryTimeInDays: "",
    revisions: "1 Revision",
    whatsIncluded: ["", ""],
    optionalExtras: false
  });

  const [mainImage, setMainImage] = useState(null);
  const [serviceImages, setServiceImages] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get('https://localhost:7210/api/Home', {
          headers: { 'X-API-Version': '' }
        });
        if (data.isSuccess && data.data && data.data.servicesCategories) {
          setCategories(data.data.servicesCategories);
        } else {
          const fallbackData = data?.data || data || [];
          if (Array.isArray(fallbackData)) setCategories(fallbackData);
        }
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleIncludedChange = (index, value) => {
    const newIncluded = [...formData.whatsIncluded];
    newIncluded[index] = value;
    setFormData(prev => ({ ...prev, whatsIncluded: newIncluded }));
  };

  const addIncludedItem = () => {
    setFormData(prev => ({ ...prev, whatsIncluded: [...prev.whatsIncluded, ""] }));
  };

  const removeIncludedItem = (index) => {
    setFormData(prev => ({
      ...prev,
      whatsIncluded: prev.whatsIncluded.filter((_, i) => i !== index)
    }));
  };

  const handleMainImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setMainImage(e.target.files[0]);
    }
  };

  const handleServiceImagesChange = (e) => {
    if (e.target.files) {
      setServiceImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async () => {
    setSubmitError(null);

    // Check if user is logged in
    if (!token) {
      alert('You must be logged in to add a service.');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const payload = new FormData();
      payload.append('Title', formData.title);
      payload.append('CategoryName', formData.categoryName);
      payload.append('ShortDescription', formData.shortDescription);
      payload.append('DetailDescription', formData.detailDescription);
      payload.append('Price', formData.price);
      payload.append('DeliveryTimeInDays', formData.deliveryTimeInDays || '3');
      payload.append('Revisions', formData.revisions);
      formData.whatsIncluded.filter(Boolean).forEach((item, i) => {
        payload.append(`WhatsIncluded[${i}]`, item);
      });
      if (mainImage) payload.append('MainImage', mainImage);
      serviceImages.forEach((img, i) => payload.append('ServiceImages', img));

      const { data } = await axios.post(
        'https://localhost:7210/api/Services',
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-API-Version': '1.0',
          }
        }
      );

      if (data.isSuccess) {
        setSubmitSuccess(true);
        setTimeout(() => navigate('/servicespage'), 1500);
      } else {
        setSubmitError(data.message || 'Failed to add service.');
      }
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.title || err.message || 'An error occurred.';
      setSubmitError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-24 pb-20 font-sans text-gray-900">

      {/* Visual Stepper */}
      <div className="max-w-4xl mx-auto px-4 mb-10">
        <div className="flex items-center justify-center gap-4 text-sm font-semibold">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-800 text-white flex items-center justify-center">
              <CheckCircle2 size={16} />
            </div>
            <span className="text-gray-900">Basic Info</span>
          </div>
          <div className="w-16 h-px bg-purple-800"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-800 text-white flex items-center justify-center">2</div>
            <span className="text-purple-800">Details</span>
          </div>
          <div className="w-16 h-px bg-gray-300"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">3</div>
            <span className="text-gray-400">Pricing</span>
          </div>
          <div className="w-16 h-px bg-gray-300"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">4</div>
            <span className="text-gray-400">Samples</span>
          </div>
          <div className="w-16 h-px bg-gray-300"></div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center">5</div>
            <span className="text-gray-400">Review</span>
          </div>
        </div>
        <p className="text-center text-gray-500 mt-4 text-sm">Step 2 of 5 - Service Details</p>
      </div>

      <div className="max-w-4xl mx-auto px-4">

        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Basic Information</h2>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service Title</label>
            <input
              name="title" value={formData.title} onChange={handleInputChange}
              placeholder="e.g. I will create a professional logo design"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-purple-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
            <select
              name="categoryName" value={formData.categoryName} onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-purple-500"
            >
              <option value="">Select a category</option>
              {categories.map(c => {
                const name = c.name || c.categoryName || c;
                return <option key={name} value={name}>{name}</option>;
              })}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
            <input
              name="shortDescription" value={formData.shortDescription} onChange={handleInputChange}
              placeholder="Brief overview of your service (max 2 lines)"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Service envelope</label>
            <div className="border-2 border-dashed border-purple-200 rounded-xl p-8 text-center bg-purple-50 hover:bg-purple-100 transition relative">
              <input type="file" onChange={handleMainImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <Upload className="mx-auto text-purple-400 mb-3" size={32} />
              <p className="text-sm font-semibold text-gray-900">Drag and drop files or browse</p>
              <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, MP4 (Max 10MB)</p>
              {mainImage && <p className="text-xs text-purple-700 font-bold mt-2">{mainImage.name}</p>}
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Service Details</h2>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Description</label>
            <textarea
              name="detailDescription" value={formData.detailDescription} onChange={handleInputChange}
              placeholder="Provide a comprehensive description of your service, what you offer, your process, etc."
              rows="5"
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-purple-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">What's Included</label>
            <div className="space-y-3">
              {formData.whatsIncluded.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="text-gray-300 cursor-grab">⣿</div>
                  <input
                    value={item} onChange={(e) => handleIncludedChange(index, e.target.value)}
                    placeholder={index === 0 ? "e.g., 3 concept designs" : "e.g., Source files included"}
                    className="flex-1 border border-gray-300 rounded-lg p-3 outline-none focus:border-purple-500"
                  />
                  <button onClick={() => removeIncludedItem(index)} className="text-red-500 hover:text-red-600">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              <button onClick={addIncludedItem} className="text-purple-700 text-sm font-semibold flex items-center gap-1 mt-2">
                + Add item
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Number of Revisions</label>
            <select
              name="revisions" value={formData.revisions} onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-purple-500"
            >
              <option>1 Revision</option>
              <option>2 Revisions</option>
              <option>3 Revisions</option>
              <option>Unlimited</option>
            </select>
          </div>
        </div>

        {/* Pricing & Delivery */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Pricing & Delivery</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Price (EGP)</label>
              <input
                name="price" value={formData.price} onChange={handleInputChange} type="number"
                placeholder="EGP 50"
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Time</label>
              <select
                name="deliveryTimeInDays" value={formData.deliveryTimeInDays} onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-purple-500"
              >
                <option value="1">1 Day</option>
                <option value="3">3 Days</option>
                <option value="7">7 Days</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <h4 className="font-bold text-gray-900 text-sm">Optional Extras</h4>
              <p className="text-xs text-gray-500">Offer additional services</p>
            </div>
            {/* Toggle switch visual */}
            <div className={`w-10 h-5 rounded-full cursor-pointer relative transition-colors ${formData.optionalExtras ? 'bg-purple-600' : 'bg-gray-300'}`} onClick={() => setFormData(p => ({ ...p, optionalExtras: !p.optionalExtras }))}>
              <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-all ${formData.optionalExtras ? 'left-5' : 'left-0.5'}`}></div>
            </div>
          </div>
        </div>

        {/* Samples / Portfolio */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Samples / Portfolio</h2>
          <div className="border-2 border-dashed border-purple-200 rounded-xl p-8 text-center bg-purple-50 hover:bg-purple-100 transition relative mb-6">
            <input type="file" multiple onChange={handleServiceImagesChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <Upload className="mx-auto text-purple-400 mb-3" size={32} />
            <p className="text-sm font-semibold text-gray-900">Drag and drop files or browse</p>
            <p className="text-xs text-gray-500 mt-1">Supported formats: JPG, PNG, PDF (Max 10MB)</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {/* Dummy gallery images matching design */}
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-200">
              <img src="https://images.unsplash.com/photo-1542744094-24638ea0b3b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover" alt="Portfolio 1" />
            </div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-200">
              <img src="https://images.unsplash.com/photo-1572044162444-ad60f128bdea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" className="w-full h-full object-cover" alt="Portfolio 2" />
            </div>
          </div>
        </div>

        {/* Review & Publish */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Publish</h2>

          <div className="bg-purple-50 rounded-2xl border border-purple-100 p-8 relative">
            <div className="absolute top-6 right-6 text-purple-700 text-sm font-bold flex items-center gap-1 cursor-pointer">
              <PenTool size={14} /> Edit
            </div>
            {submitError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                ❌ {submitError}
              </div>
            )}
            {submitSuccess && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                ✅ Service submitted successfully! Redirecting...
              </div>
            )}

            <h3 className="text-xl font-extrabold text-gray-900 mb-1">{formData.title || "Professional Logo Design Service"}</h3>
            <p className="text-sm text-gray-500 mb-6">{formData.categoryName || "Graphic Design"} • {formData.revisions}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <span className="block text-xs text-gray-500 mb-1">Price</span>
                <span className="text-2xl font-black text-purple-800">${formData.price || "50"}</span>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-200">
                <span className="block text-xs text-gray-500 mb-1">Delivery Time</span>
                <span className="text-2xl font-black text-gray-900">{formData.deliveryTimeInDays || "3"} Days</span>
              </div>
            </div>

            <div>
              <span className="block text-sm font-bold text-gray-900 mb-3">What's included:</span>
              <ul className="space-y-2">
                {formData.whatsIncluded.filter(Boolean).map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 size={16} className="text-purple-600" />
                    {item}
                  </li>
                ))}
                {formData.whatsIncluded.filter(Boolean).length === 0 && (
                  <>
                    <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle2 size={16} className="text-purple-600" /> 3 concept designs</li>
                    <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle2 size={16} className="text-purple-600" /> Source files included</li>
                    <li className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle2 size={16} className="text-purple-600" /> Commercial use rights</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 bg-purple-900 text-white px-10 py-3 rounded-lg font-bold text-lg hover:bg-black transition shadow-lg w-full md:w-auto"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>

      </div>
    </div>
  );
}