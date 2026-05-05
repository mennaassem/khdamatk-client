import React, { useState } from "react";
import {
  Plus,
  X,
  Upload,
  ArrowRight,
  DollarSign,
  Calendar,
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
    "و RPM",
    "الترجمة",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
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
    setUploadedFiles([...uploadedFiles, ...files.slice(0, 3)].slice(0, 3));
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
    <div dir="rtl" className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold">
            <span className="text-purple-700">Khadma</span>{" "}
            <span className="text-yellow-500">Hub</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800">إضافة خدمة جديدة</h2>
          <button className="text-purple-700 font-semibold">رجوع</button>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {[
              { step: 1, label: "معلومات الخدمة", status: "active" },
              { step: 2, label: "الأسعار والمدة", status: "pending" },
              { step: 3, label: "المعرض والعينات", status: "pending" },
              { step: 4, label: "النشر", status: "pending" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    item.status === "active"
                      ? "bg-purple-700 text-white"
                      : item.status === "completed"
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {item.step}
                </div>
                <p className="ml-2 text-sm font-semibold">{item.label}</p>
                {idx < 3 && <ArrowRight className="ml-4 text-gray-400" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-2xl font-bold mb-6">معلومات الخدمة</h2>

              <div className="space-y-4">
                {/* Service Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    اسم الخدمة *
                  </label>
                  <input
                    type="text"
                    name="serviceName"
                    value={formData.serviceName}
                    onChange={handleInputChange}
                    placeholder="مثال: تصميم شعار احترافي"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الفئة *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="">اختر الفئة</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    وصف الخدمة *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="صف خدمتك بالتفصيل..."
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                  />
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    الكلمات المفتاحية (حتى 5)
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addTag()}
                      placeholder="أضف كلمة مفتاحية"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      onClick={addTag}
                      className="px-6 py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, idx) => (
                      <div
                        key={idx}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        {tag}
                        <button onClick={() => removeTag(idx)}>
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Duration */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-2xl font-bold mb-6">الأسعار والمدة</h2>

              <div className="space-y-4">
                {/* Base Price */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    السعر الأساسي (EGP) *
                  </label>
                  <input
                    type="number"
                    name="basePrice"
                    value={formData.basePrice}
                    onChange={handleInputChange}
                    placeholder="500"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Delivery Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    مدة التسليم (أيام) *
                  </label>
                  <input
                    type="number"
                    name="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={handleInputChange}
                    placeholder="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Revisions */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    عدد التعديلات المضمونة
                  </label>
                  <input
                    type="number"
                    name="revisions"
                    value={formData.revisions}
                    onChange={handleInputChange}
                    placeholder="2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Portfolio & Samples */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-2xl font-bold mb-6">المعرض والعينات</h2>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  أضف صور أو ملفات (حتى 3 ملفات)
                </label>
                <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center cursor-pointer hover:bg-purple-50 transition relative">
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <div className="flex flex-col items-center pointer-events-none">
                    <Upload size={32} className="text-purple-700 mb-2" />
                    <p className="text-gray-700 font-semibold">انقر للتحميل</p>
                    <p className="text-xs text-gray-500 mt-1">أو اسحب وأسقط الملفات</p>
                  </div>
                </div>

                {/* Uploaded Files */}
                {uploadedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {uploadedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-purple-50 p-3 rounded-lg border border-purple-200"
                      >
                        <div className="flex items-center gap-2 flex-1">
                          <FileText size={18} className="text-purple-700" />
                          <div>
                            <p className="text-sm font-semibold text-gray-800 truncate">
                              {file.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {(file.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFile(idx)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="space-y-6">
            {/* Form Summary */}
            <div className="bg-white rounded-xl shadow p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">ملخص الخدمة</h3>

              <div className="space-y-4 mb-6 pb-6 border-b">
                <div>
                  <p className="text-xs text-gray-600 mb-1">اسم الخدمة</p>
                  <p className="font-semibold text-gray-800">
                    {formData.serviceName || "لم يتم إدخال اسم"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-1">الفئة</p>
                  <p className="font-semibold text-gray-800">
                    {formData.category || "لم يتم الاختيار"}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-600 mb-1">السعر الأساسي</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {formData.basePrice ? `${formData.basePrice} EGP` : "—"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">مدة التسليم</p>
                    <p className="font-semibold text-gray-800">
                      {formData.deliveryTime ? `${formData.deliveryTime} أيام` : "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">التعديلات</p>
                    <p className="font-semibold text-gray-800">
                      {formData.revisions || "0"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Indicator */}
              {isFormValid ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                  <Check className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-sm font-semibold text-green-700">
                      النموذج كامل
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                      جميع الحقول المطلوبة مملوءة
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                  <AlertCircle
                    className="text-yellow-600 flex-shrink-0 mt-0.5"
                    size={18}
                  />
                  <div>
                    <p className="text-sm font-semibold text-yellow-700">
                      حقول مطلوبة
                    </p>
                    <p className="text-xs text-yellow-600 mt-1">
                      الرجاء ملء جميع الحقول المشار إليها بـ *
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <button
                  disabled={!isFormValid}
                  className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition ${
                    isFormValid
                      ? "bg-gradient-to-r from-purple-700 to-purple-600 text-white hover:shadow-lg"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  <Plus size={18} /> حفظ واستمرار
                </button>

                <button className="w-full py-3 rounded-lg font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 transition">
                  حفظ كمسودة
                </button>
              </div>

              {/* Help Text */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-700 font-semibold mb-2">
                  💡 نصيحة
                </p>
                <p className="text-xs text-blue-600 leading-relaxed">
                  وضح تفاصيل خدمتك بشكل دقيق واختر سعراً تنافسياً لجذب المزيد من
                  العملاء
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow p-6 space-y-3">
              <button
                disabled={!isFormValid}
                className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition ${
                  isFormValid
                    ? "bg-gradient-to-r from-purple-700 to-purple-600 hover:shadow-lg"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                <Check size={18} /> الخطوة التالية
              </button>

              <button className="w-full py-3 rounded-lg font-semibold text-gray-700 border border-gray-300 hover:bg-gray-50 transition">
                حفظ كمسودة
              </button>
            </div>

            {/* Help Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex gap-3">
                <AlertCircle size={20} className="text-blue-600 flex-shrink-0" />
                <div className="text-sm text-blue-700">
                  <p className="font-semibold mb-1">نصيحة</p>
                  <p>اختر وصف واضح وشامل لخدمتك لجذب المزيد من العملاء</p>
                </div>
              </div>
            </div>

