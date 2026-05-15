import React, { useState, useEffect } from "react";
import {
  Star,
  MapPin,
  Briefcase,
  Calendar,
  DollarSign,
  Heart,
  Share2,
  MessageCircle,
  Download,
  CheckCircle,
  Award,
  TrendingUp,
  Clock,
  Users,
  Eye,
} from "lucide-react";

export default function SelectedFreelancer() {
  const [isSaved, setIsSaved] = useState(false);
  const [showFullBio, setShowFullBio] = useState(false);
  const [selectedTab, setSelectedTab] = useState("skills");
  const [freelancer, setFreelancer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب البيانات من API
  useEffect(() => {
    const fetchFreelancer = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/ServiceProvider/Freelancers");
        
        if (!response.ok) {
          throw new Error(`خطأ: ${response.status}`);
        }
        
        const data = await response.json();
        
        // معالجة البيانات المستقبلة
        const freelancerData = Array.isArray(data) ? data[0] : data;
        
        // ملء البيانات المفقودة ببيانات افتراضية إن لزم الأمر
        setFreelancer({
          id: freelancerData.id || 1,
          name: freelancerData.name || "غير محدد",
          title: freelancerData.title || "محترف",
          location: freelancerData.location || "غير محدد",
          rating: freelancerData.rating || 4.5,
          reviews: freelancerData.reviewCount || 0,
          completedProjects: freelancerData.completedProjects || 0,
          responseTime: freelancerData.responseTime || "غير محدد",
          joinDate: freelancerData.joinDate || new Date().toISOString(),
          hourlyRate: freelancerData.hourlyRate || 0,
          monthlyRate: freelancerData.monthlyRate || 0,
          availability: freelancerData.availability || "available",
          skills: freelancerData.skills || [],
          portfolio: freelancerData.portfolio || [],
          bio: freelancerData.bio || "لا توجد نبذة متاحة",
          reviews: freelancerData.reviews || [],
          stats: [
            { label: "المشاريع المكتملة", value: freelancerData.completedProjects || 0, icon: CheckCircle },
            { label: "تقييم العملاء", value: freelancerData.rating || 0, icon: Star },
            { label: "وقت الرد", value: freelancerData.responseTime || "غير محدد", icon: Clock },
            { label: "معدل النجاح", value: freelancerData.successRate || "0%", icon: TrendingUp },
          ],
        });
        
        setError(null);
      } catch (err) {
        console.error("خطأ في جلب البيانات:", err);
        setError(err.message);
        setFreelancer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancer();
  }, []);

  return (
    <div dir="rtl" className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold">
            <span className="text-purple-700">Khadma</span>{" "}
            <span className="text-yellow-500">Hub</span>
          </div>
          <button className="text-purple-700 font-semibold">رجوع</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-4 py-8">
        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <div className="inline-block">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700"></div>
            </div>
            <p className="text-gray-600 mt-4 font-semibold">جاري تحميل البيانات...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl shadow p-6 mb-6">
            <p className="text-red-800 font-semibold mb-2">حدث خطأ</p>
            <p className="text-red-700">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
            >
              إعادة محاولة
            </button>
          </div>
        )}

        {/* Success State - Show content only when freelancer data is loaded */}
        {!loading && !error && freelancer && (
          <>
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow p-8 mb-6">
          <div className="flex items-start gap-6 mb-6">
            {/* Profile Image */}
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 flex-shrink-0" />

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h1 className="text-3xl font-bold mb-1">{freelancer.name}</h1>
                  <p className="text-gray-600 text-lg mb-2">{freelancer.title}</p>
                  <p className="text-gray-500 flex items-center gap-1">
                    <MapPin size={16} /> {freelancer.location}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                      isSaved
                        ? "bg-red-100 text-red-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={isSaved ? "currentColor" : "none"}
                    />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    <Share2 size={18} />
                  </button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(freelancer.rating)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="font-semibold">{freelancer.rating}</span>
                  <span className="text-gray-600">
                    ({freelancer.reviews} تقييم)
                  </span>
                </div>
                <div className="h-6 w-px bg-gray-300" />
                <div className="flex items-center gap-2">
                  <Briefcase size={16} className="text-purple-700" />
                  <span className="font-semibold">
                    {freelancer.completedProjects} مشروع مكتمل
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-700 font-semibold">متاح للعمل الآن</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {freelancer.stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-xl shadow p-4 text-center">
                <Icon size={24} className="text-purple-700 mx-auto mb-2" />
                <p className="text-2xl font-bold text-purple-700">
                  {stat.value}
                </p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Bio */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">نبذة عني</h2>
          <p className="text-gray-700 mb-4 leading-relaxed">
            {showFullBio
              ? freelancer.bio
              : freelancer.bio.substring(0, 200) + "..."}
          </p>
          <button
            onClick={() => setShowFullBio(!showFullBio)}
            className="text-purple-700 font-semibold hover:text-purple-900"
          >
            {showFullBio ? "عرض أقل" : "عرض المزيد"}
          </button>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">المهارات</h2>
          <div className="flex flex-wrap gap-2">
            {freelancer.skills.map((skill, idx) => (
              <div
                key={idx}
                className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold text-sm"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">الأعمال السابقة</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {freelancer.portfolio.map((project, idx) => (
              <div
                key={idx}
                className="rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
              >
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 w-full h-32 flex items-center justify-center text-4xl">
                  {project.image}
                </div>
                <div className="bg-gray-50 p-3">
                  <p className="font-semibold text-sm mb-1">{project.title}</p>
                  <p className="text-xs text-gray-600">{project.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">تقييمات العملاء</h2>
          <div className="space-y-4">
            {freelancer.reviews.map((review, idx) => (
              <div key={idx} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold">{review.clientName}</p>
                    <p className="text-gray-600 text-sm">{review.date}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="bg-white rounded-xl shadow p-6 sticky bottom-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-gray-600 text-sm mb-1">السعر بالساعة</p>
              <p className="text-2xl font-bold text-purple-700">
                {freelancer.hourlyRate} EGP
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">السعر الشهري</p>
              <p className="text-2xl font-bold text-purple-700">
                {freelancer.monthlyRate} EGP
              </p>
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">وقت الرد</p>
              <p className="text-2xl font-bold text-purple-700">
                {freelancer.responseTime}
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-gradient-to-r from-purple-700 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition flex items-center justify-center gap-2">
              <MessageCircle size={18} /> تواصل الآن
            </button>
            <button className="flex-1 bg-yellow-500 text-white py-3 rounded-lg font-semibold hover:bg-yellow-600 transition">
              استأجر الآن
            </button>
          </div>
        </div>
          </>
        )}

        {/* No Data State */}
        {!loading && !error && !freelancer && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl shadow p-8 text-center">
            <p className="text-yellow-800 font-semibold">لم يتم العثور على بيانات</p>
          </div>
        )}
      </div>
    </div>
  );
}
