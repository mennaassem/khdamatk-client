 
 import React from "react";
import {
  Code2,
  Palette,
  Video,
  Languages,
  FileText,
  Zap,
  TrendingUp,
  DollarSign,
  BookOpen,
  PieChart,
  Briefcase,
  Users,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      id: 1,
      name: "DEVELOPERS",
      description: "Web & Mobile Development",
      icon: Code2,
      color: "from-blue-400 to-blue-600",
      details: "عمل تطبيقات ويب و موبايل احترافية",
    },
    {
      id: 2,
      name: "DESIGNERS",
      description: "UI/UX & Graphic Design",
      icon: Palette,
      color: "from-purple-400 to-purple-600",
      details: "تصميم واجهات احترافية وهويات بصرية",
    },
    {
      id: 3,
      name: "MEDIA PRODUCTION",
      description: "Video & Photo Production",
      icon: Video,
      color: "from-red-400 to-red-600",
      details: "إنتاج محتوى بصري عالي الجودة",
    },
    {
      id: 4,
      name: "TRANSLATION",
      description: "Professional Translation Services",
      icon: Languages,
      color: "from-green-400 to-green-600",
      details: "ترجمة احترافية لعدة لغات",
    },
    {
      id: 5,
      name: "WRITING",
      description: "Content & Copywriting",
      icon: FileText,
      color: "from-yellow-400 to-yellow-600",
      details: "كتابة محتوى احترافي وجذاب",
    },
    {
      id: 6,
      name: "DIGITAL MARKETING",
      description: "SEO, SEM & Social Media",
      icon: Zap,
      color: "from-pink-400 to-pink-600",
      details: "تسويق رقمي وإدارة وسائل التواصل",
    },
    {
      id: 7,
      name: "MARKETING",
      description: "Brand & Marketing Strategy",
      icon: TrendingUp,
      color: "from-indigo-400 to-indigo-600",
      details: "استراتيجيات تسويقية متكاملة",
    },
    {
      id: 8,
      name: "SALES",
      description: "Sales Consulting & Strategy",
      icon: DollarSign,
      color: "from-orange-400 to-orange-600",
      details: "استشارات مبيعات واستراتيجيات نمو",
    },
    {
      id: 9,
      name: "TRAINING",
      description: "Professional Training & Courses",
      icon: BookOpen,
      color: "from-cyan-400 to-cyan-600",
      details: "تدريب احترافي وورش عمل",
    },
    {
      id: 10,
      name: "FINANCE",
      description: "Financial Consulting",
      icon: PieChart,
      color: "from-emerald-400 to-emerald-600",
      details: "استشارات مالية واستثمارية",
    },
    {
      id: 11,
      name: "BUSINESS",
      description: "Business Consulting",
      icon: Briefcase,
      color: "from-violet-400 to-violet-600",
      details: "استشارات الأعمال والإدارة",
    },
    {
      id: 12,
      name: "ENGINEERS",
      description: "Engineering & Technical Services",
      icon: Users,
      color: "from-lime-400 to-lime-600",
      details: "خدمات هندسية وتقنية متخصصة",
    },
  ];

  return (
    <div dir="rtl" className="bg-gray-100 mt-10 min-h-screen font-sans">
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-purple-50 to-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            خدماتنا
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            اختر من بين مجموعة واسعة من الخدمات المتخصصة
          </p>
          <p className="text-gray-500">
            نوفر خدمات احترافية في مختلف المجالات لتحقيق أهدافك
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer group"
              >
                {/* Icon Background */}
                <div
                  className={`bg-gradient-to-br ${service.color} p-8 flex items-center justify-center group-hover:scale-105 transition`}
                >
                  <Icon size={48} className="text-white" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {service.description}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed mb-4">
                    {service.details}
                  </p>
                  <button className="w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition font-semibold text-sm">
                    استكشف الخدمة
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-purple-700 py-12 my-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            هل تحتاج خدمة محددة؟
          </h2>
          <p className="text-purple-100 mb-6">
            تواصل معنا الآن وسنساعدك في إيجاد الفريق المناسب لمشروعك
          </p>
          <button className="bg-white text-purple-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            ابدأ الآن
          </button>
        </div>
      </div>

     
    </div>
  );
}
