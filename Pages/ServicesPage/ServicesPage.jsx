import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Code,
  Palette,
  Video,
  Languages,
  PenTool,
  Share2,
  Megaphone,
  DollarSign,
  TrendingUp,
  PieChart,
  Briefcase,
  HardHat
} from "lucide-react";

const getCategoryDetails = (name) => {
  const n = name?.toLowerCase() || '';
  if (n.includes('develop') || n.includes('web')) return { icon: Code, desc: "Build websites, mobile apps, software solutions, and smart systems for modern businesses." };
  if (n.includes('design') || n.includes('ui')) return { icon: Palette, desc: "Create logos, branding, UI/UX designs, and visuals that attract customers professionally." };
  if (n.includes('media') || n.includes('video')) return { icon: Video, desc: "Media Production is creating videos, photos, and ads to promote ideas or brands in a professional way." };
  if (n.includes('translat')) return { icon: Languages, desc: "Convert content accurately between languages while keeping meaning, style, and context." };
  if (n.includes('writ')) return { icon: PenTool, desc: "Create articles, blogs, copywriting, and content that engages audiences and builds trust." };
  if (n.includes('digital')) return { icon: Share2, desc: "Promote brands online using SEO, social media, ads, and audience targeting strategies." };
  if (n.includes('marketing')) return { icon: Megaphone, desc: "Plan campaigns, understand customers, and create strategies that increase sales and visibility." };
  if (n.includes('sale')) return { icon: DollarSign, desc: "Improve customer relationships, close deals, and generate consistent business growth successfully." };
  if (n.includes('train')) return { icon: TrendingUp, desc: "Provide learning programs, workshops, and coaching to improve skills and performance levels." };
  if (n.includes('financ')) return { icon: PieChart, desc: "Manage budgets, accounting, financial planning, and reports for strong business stability." };
  if (n.includes('business')) return { icon: Briefcase, desc: "Develop ideas, operations, management strategies, and solutions for successful company growth." };
  if (n.includes('engineer')) return { icon: HardHat, desc: "Design technical solutions, projects, systems, and innovations for industries and infrastructure." };

  // Default
  return { icon: Briefcase, desc: "Professional services to help you achieve your goals and grow your business effectively." };
};

export default function ServicesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
          if (Array.isArray(fallbackData)) {
            setCategories(fallbackData);
          }
        }
      } catch (error) {
        console.error('Error fetching categories', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    navigate(`/service?category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <div className="bg-white min-h-screen pt-28 pb-20 font-sans text-gray-900">

      {/* Header Section */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-16">
        <h1 className="text-4xl font-bold text-purple-800 mb-4 tracking-wide">Our Services</h1>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          Construction sector is considered to be one of the main sources of national's economy and also country development.
        </p>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-6">
        {loading ? (
          <div className="text-center text-purple-600 font-semibold py-20">Loading services...</div>
        ) : categories.length === 0 ? (
          <div className="text-center text-gray-500 py-20">No categories found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16">
            {categories.map((category, idx) => {
              const catName = category.name || category.categoryName || category;
              const catId = category.id || category.categoryId || idx;
              const details = getCategoryDetails(catName);
              const Icon = details.icon;

              return (
                <div
                  key={catId}
                  onClick={() => handleCategoryClick(catName)}
                  className="group cursor-pointer flex flex-col items-center text-center p-4 rounded-xl hover:bg-purple-50 transition-colors duration-300"
                >
                  {/* Icon */}
                  <div className="mb-6 flex items-center justify-center">
                    <Icon strokeWidth={1.5} className="text-purple-800 w-12 h-12 group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 uppercase tracking-wider">
                    {catName}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-gray-500 leading-relaxed max-w-[250px]">
                    {details.desc}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
