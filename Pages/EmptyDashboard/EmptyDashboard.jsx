import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSyncAlt, 
    faFileAlt, 
    faHourglassHalf, 
    faBell, 
    faCommentAlt, 
    faUserCircle,
    faFileArrowDown
} from '@fortawesome/free-solid-svg-icons';
import { 
    faFacebookF, 
    faGoogle, 
    faApple 
} from '@fortawesome/free-brands-svg-icons';

export default function EmptyDashboard() {
    // حالة للتحكم في التبويب النشط
    const [activeTab, setActiveTab] = useState('waiting');

    // مصفوفة تحتوي على بيانات التبويبات لتسهيل العرض
    const tabs = [
        { id: 'processing', label: 'In Processing Proposals', icon: faSyncAlt },
        { id: 'accepted', label: 'Accepted Proposals', icon: faFileArrowDown },
        { id: 'archive', label: 'Proposals Archive', icon: faFileAlt },
        { id: 'waiting', label: 'Waiting list', icon: faHourglassHalf },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[#f4f6f8] font-sans">
            
            {/* --- Header Section --- */}
            <header className="bg-white py-3 px-[8%] flex justify-between items-center border-b border-gray-100">
                <div className="text-2xl font-bold text-[#4a348c]">
                    KHADMA <span className="text-[#f2a93b]">HUB</span>
                </div>
                <nav className="hidden md:flex gap-8">
                    <a href="#" className="text-sm font-medium text-gray-800 hover:text-purple-700">Services</a>
                    <a href="#" className="text-sm font-medium text-gray-800 hover:text-purple-700">About</a>
                    <a href="#" className="text-sm font-medium text-gray-800 hover:text-purple-700">Job</a>
                </nav>
                <div className="flex items-center gap-5 text-gray-500">
                    <FontAwesomeIcon icon={faCommentAlt} className="cursor-pointer text-lg" />
                    <FontAwesomeIcon icon={faBell} className="cursor-pointer text-lg" />
                    <span className="font-bold text-sm cursor-pointer text-gray-700">AR</span>
                    <FontAwesomeIcon icon={faUserCircle} className="text-3xl text-gray-300 cursor-pointer" />
                </div>
            </header>

            {/* --- Black Banner --- */}
            <div className="bg-Purple-500 text-white text-center pt-12 pb-24 text-3xl font-bold">
                Your proposals
            </div>

            {/* --- Main Content Card --- */}
            <main className="max-w-[1100px] w-[90%] mx-auto -mt-[60px] mb-10 bg-white rounded-sm shadow-lg min-h-[800px] flex flex-col">
                
                {/* --- Tabs Navigation --- */}
                <div className="flex border-b border-gray-100">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 py-5 px-2 flex items-center justify-center gap-2 text-[13.5px] transition-all duration-300 border-b-[3px] 
                                ${activeTab === tab.id 
                                    ? 'text-gray-900 border-[#f2a93b] font-bold' 
                                    : 'text-gray-400 border-transparent font-medium hover:text-gray-600'
                                }`}
                        >
                            <FontAwesomeIcon icon={tab.icon} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* --- Content Areas --- */}
                <div className="flex-1 flex flex-col items-center justify-center pb-24 text-center px-4">
                    
                    {/* Render Content based on activeTab */}
                    {activeTab === 'processing' && (
                        <div className="animate-fadeIn">
                            <FontAwesomeIcon icon={faSyncAlt} className="text-7xl text-gray-200 mb-5" />
                            <h3 className="text-xl text-gray-800 mb-2 font-semibold">No proposals found</h3>
                            <p className="text-gray-400 text-sm">You don't have any in-processing proposals.</p>
                        </div>
                    )}

                    {activeTab === 'accepted' && (
                        <div className="animate-fadeIn">
                            <div className="bg-[#4b4b4b] text-white p-4 rounded-lg flex items-center justify-center w-fit mx-auto mb-5">
                                <FontAwesomeIcon icon={faFileArrowDown} className="text-4xl" />
                            </div>
                            <h3 className="text-xl text-gray-800 mb-2 font-semibold">No proposals found</h3>
                            <p className="text-gray-400 text-sm">You don't have any accepted proposals yet.</p>
                        </div>
                    )}

                    {activeTab === 'archive' && (
                        <div className="animate-fadeIn">
                            <FontAwesomeIcon icon={faFileAlt} className="text-7xl text-gray-200 mb-5" />
                            <h3 className="text-xl text-gray-800 mb-2 font-semibold">No proposals found</h3>
                            <p className="text-gray-400 text-sm">You don't have any archived proposals.</p>
                        </div>
                    )}

                    {activeTab === 'waiting' && (
                        <div className="animate-fadeIn">
                            <FontAwesomeIcon icon={faFileAlt} className="text-7xl text-gray-200 mb-5" />
                            <h3 className="text-xl text-gray-800 mb-2 font-semibold">No proposals found</h3>
                            <p className="text-gray-400 text-sm">You don't have any rejected/waiting proposals.</p>
                        </div>
                    )}
                </div>
            </main>
 
        </div>
    );
}
