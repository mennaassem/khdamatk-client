import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSyncAlt,
  faFileAlt,
  faHourglassHalf,
  faBell,
  faCommentAlt,
  faUserCircle,
  faFileArrowDown,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

// Initial Mock Data
const initialMockProposals = {
  processing: [
    {
      id: 1,
      status: 'Pending',
      title: 'Create website',
      clientName: 'Sarah Chen',
      clientAvatar: 'https://i.pravatar.cc/150?img=1',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: '22/6/2026 08:10PM',
      price: '100$',
    },
  ],

  accepted: [
    {
      id: 2,
      status: 'Approval',
      title: 'Create website',
      clientName: 'Sarah Chen',
      clientAvatar: 'https://i.pravatar.cc/150?img=5',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: '22/6/2026 08:10PM',
      price: '100$',
    },
  ],

  archive: [
    {
      id: 3,
      status: 'Rejection',
      title: 'Create website',
      clientName: 'Sarah Chen',
      clientAvatar: 'https://i.pravatar.cc/150?img=3',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: '22/6/2026 08:10PM',
      price: '100$',
    },
  ],

  waiting: [
    {
      id: 4,
      status: 'Pending',
      title: 'Create website',
      clientName: 'Sarah Chen',
      clientAvatar: 'https://i.pravatar.cc/150?img=4',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      date: '22/6/2026 08:10PM',
      price: '100$',
    },
  ],
};

const ProposalCard = ({ proposal, tab, onApprove, onReject }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500 text-white';

      case 'Approval':
        return 'bg-blue-600 text-white';

      case 'Rejection':
        return 'bg-red-600 text-white';

      default:
        return 'bg-gray-400 text-white';
    }
  };

  const isWaiting = tab === 'waiting';

  const handleRowClick = () => {
    if (!isWaiting) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="border border-gray-200 rounded-md mb-4 w-full bg-white overflow-hidden shadow-sm">
      <div
        className={`flex justify-between items-center p-3 ${
          !isWaiting ? 'cursor-pointer hover:bg-gray-50' : ''
        }`}
        onClick={handleRowClick}
      >
        <div className="flex items-center gap-3 flex-wrap">
          <span
            className={`px-3 py-1 text-[11px] font-semibold rounded-md ${getStatusColor(
              proposal.status
            )}`}
          >
            {proposal.status}
          </span>

          <span className="font-medium text-gray-800 text-sm">
            {proposal.title}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/job-details/${proposal.id}`);
              }}
              className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-1 text-[11px] font-semibold rounded-md"
            >
              Job
            </button>

            {isWaiting && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onApprove(proposal.id);
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-[11px] font-semibold rounded-md"
                >
                  Approval
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReject(proposal.id);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 text-[11px] font-semibold rounded-md"
                >
                  Rejection
                </button>
              </>
            )}

            {tab === 'accepted' && (
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-1 text-[11px] font-semibold rounded-md">
                Chat
              </button>
            )}
          </div>

          {!isWaiting && (
            <FontAwesomeIcon
              icon={isOpen ? faChevronUp : faChevronDown}
              className="text-gray-600 text-xs"
            />
          )}
        </div>
      </div>

      {isOpen && !isWaiting && (
        <div className="p-5 border-t border-gray-200 bg-white">
          <div className="flex items-center gap-2 mb-4">
            <img
              src={proposal.clientAvatar}
              alt={proposal.clientName}
              className="w-8 h-8 rounded-full object-cover border"
            />

            <span className="font-medium text-xs text-gray-900">
              {proposal.clientName}
            </span>
          </div>

          <div className="mb-6">
            <h4 className="font-bold text-sm mb-2">Proposal</h4>

            <p className="text-sm text-gray-700 leading-relaxed">
              {proposal.description}
            </p>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Date</span>
              <span>{proposal.date}</span>
            </div>

            <div className="border-b"></div>

            <div className="flex justify-between">
              <span>Price</span>
              <span>{proposal.price}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function EmbtyDasheBoord() {
  const [activeTab, setActiveTab] = useState('waiting');
  const [proposalsState, setProposalsState] =
    useState(initialMockProposals);

  const tabs = [
    {
      id: 'processing',
      label: 'In Processing Proposals',
      icon: faSyncAlt,
    },
    {
      id: 'accepted',
      label: 'Accepted Proposals',
      icon: faFileArrowDown,
    },
    {
      id: 'archive',
      label: 'Proposals Archive',
      icon: faFileAlt,
    },
    {
      id: 'waiting',
      label: 'Waiting List',
      icon: faHourglassHalf,
    },
  ];

  const handleApprove = (id) => {
    setProposalsState((prev) => {
      const item = prev.waiting.find((p) => p.id === id);

      if (!item) return prev;

      return {
        ...prev,
        waiting: prev.waiting.filter((p) => p.id !== id),
        accepted: [...prev.accepted, { ...item, status: 'Approval' }],
      };
    });
  };

  const handleReject = (id) => {
    setProposalsState((prev) => {
      const item = prev.waiting.find((p) => p.id === id);

      if (!item) return prev;

      return {
        ...prev,
        waiting: prev.waiting.filter((p) => p.id !== id),
        archive: [...prev.archive, { ...item, status: 'Rejection' }],
      };
    });
  };

  const proposals = proposalsState[activeTab] || [];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white py-4 px-10 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold text-purple-700">
          KHADMA HUB
        </h1>

        <div className="flex items-center gap-5">
          <FontAwesomeIcon icon={faCommentAlt} className="text-lg" />
          <FontAwesomeIcon icon={faBell} className="text-lg" />
          <FontAwesomeIcon icon={faUserCircle} className="text-3xl" />
        </div>
      </header>

      {/* Banner */}
      <div className="bg-Purple-600 text-white text-center py-16 text-3xl font-bold">
        Your Proposals
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto -mt-10 bg-white rounded-lg shadow-lg p-8">
        {/* Tabs */}
        <div className="flex flex-wrap border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 flex justify-center items-center gap-2 border-b-4 transition ${
                activeTab === tab.id
                  ? 'border-yellow-500 font-bold text-black'
                  : 'border-transparent text-gray-500'
              }`}
            >
              <FontAwesomeIcon icon={tab.icon} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Section Title */}
        <div className="mt-8 flex items-center gap-3 text-purple-700">
          <FontAwesomeIcon
            icon={tabs.find((t) => t.id === activeTab)?.icon}
          />

          <h2 className="text-xl font-bold">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h2>
        </div>

        {/* Cards */}
        <div className="mt-6">
          {proposals.length === 0 ? (
            <div className="text-center py-16">
              <FontAwesomeIcon
                icon={faFileAlt}
                className="text-6xl text-gray-300 mb-4"
              />

              <h3 className="text-xl font-semibold text-gray-700">
                No proposals found
              </h3>

              <p className="text-gray-500">
                You don't have any proposals in this section.
              </p>
            </div>
          ) : (
            proposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                tab={activeTab}
                onApprove={handleApprove}
                onReject={handleReject}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}