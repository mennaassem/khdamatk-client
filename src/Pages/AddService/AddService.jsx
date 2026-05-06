 
import React, { useState } from "react";
import {
  Plus,
  X,
  Upload,
  ArrowRight,
  FileText,
  Check,
  AlertCircle,
} from "lucide-react";

export default function AddService() {
  const [formData, setFormData] = useState({
    serviceName: "",
    description: "",
    category: "",
    basePrice: "",
    deliveryTime: "",
    revisions: "",
    tags: [],
  });

  const [currentTag, setCurrentTag] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const categories = [
    "تصميم الويب",
    "تطوير الويب",
    "تصميم جرافيك",
    "كتابة المحتوى",
    "إدارة وسائل التواصل",
    "RPM",
    "الترجمة",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addTag = () => {
    if (currentTag.trim() && formData.tags.length < 5) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()],
      });
      setCurrentTag("");
    }
  };

  const removeTag = (idx) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== idx),
    });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files].slice(0, 3));
  };

  const removeFile = (idx) => {
    setUploadedFiles(uploadedFiles.filter((_, i) => i !== idx));
  };

  const isFormValid =
    formData.serviceName &&
    formData.description &&
    formData.category &&
    formData.basePrice &&
    formData.deliveryTime;

  return (
    <div dir="rtl" className="bg-gray-100 min-h-screen mt-10 font-sans">
      {/* Content */}
      <div className="max-w-7xl mx-auto p-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* FORM */}
        <div className="lg:col-span-2 space-y-6">

          {/* Basic Info */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">معلومات الخدمة</h2>

            <input
              name="serviceName"
              value={formData.serviceName}
              onChange={handleInputChange}
              placeholder="اسم الخدمة"
              className="w-full mb-3 p-3 border rounded-lg"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full mb-3 p-3 border rounded-lg"
            >
              <option value="">اختر الفئة</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="الوصف"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Pricing */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-6">الأسعار</h2>

            <input
              name="basePrice"
              value={formData.basePrice}
              onChange={handleInputChange}
              placeholder="السعر"
              className="w-full mb-3 p-3 border rounded-lg"
            />

            <input
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleInputChange}
              placeholder="مدة التسليم"
              className="w-full p-3 border rounded-lg"
            />
          </div>

          {/* Files */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-2xl font-bold mb-4">المعرض</h2>

            <input type="file" multiple onChange={handleFileUpload} />

            {uploadedFiles.map((file, i) => (
              <div key={i} className="flex justify-between mt-2">
                <span>{file.name}</span>
                <button onClick={() => removeFile(i)}>X</button>
              </div>
            ))}
          </div>
        </div>

        {/* SUMMARY */}
        <div className="bg-white p-6 rounded-xl shadow h-fit sticky top-24">
          <h3 className="text-xl font-bold mb-4">ملخص الخدمة</h3>

          <p>{formData.serviceName || "اسم الخدمة"}</p>
          <p>{formData.category || "الفئة"}</p>
          <p>{formData.basePrice || "السعر"}</p>

          <div className="mt-4">
            {isFormValid ? (
              <p className="text-green-600 flex items-center gap-2">
                <Check /> جاهز للنشر
              </p>
            ) : (
              <p className="text-yellow-600 flex items-center gap-2">
                <AlertCircle /> اكمل البيانات
              </p>
            )}
          </div>

          <button
            disabled={!isFormValid}
            className={`w-full mt-4 p-3 rounded-lg text-white ${
              isFormValid ? "bg-purple-700" : "bg-gray-400"
            }`}
          >
            نشر الخدمة
          </button>
        </div>

      </div>
    </div>
  );
}