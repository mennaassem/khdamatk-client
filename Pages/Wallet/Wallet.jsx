 
import React, { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
import {
  getWalletBalance,
  getWalletTransactions,
  topUpWallet,
  withdrawFromWallet,
  payFreelancer,
  getFreelancersForPayment,
} from '../../src/Services/api-wallet';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

const STATUS_STYLES = {
  Pending:  'bg-yellow-100 text-yellow-700 border border-yellow-200',
  Success:  'bg-green-100 text-green-700 border border-green-200',
  Failed:   'bg-red-100 text-red-500 border border-red-200',
  Completed:'bg-green-100 text-green-700 border border-green-200',
};

const TYPE_COLORS = {
  Withdrawal: 'text-orange-500',
  Payment:    'text-blue-500',
  TopUp:      'text-green-500',
};

const TYPE_ICONS = {
  Withdrawal: (
    <svg className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  ),
  Payment: (
    <svg className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
    </svg>
  ),
  TopUp: (
    <svg className="w-4 h-4 inline-block mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
  ),
};

function formatCurrency(value) {
  const num = Number(value);
  if (isNaN(num)) return '$0.00';
  return '$' + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

function getUserInitials(name) {
  if (!name) return 'S';
  const parts = name.trim().split(' ');
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : parts[0][0].toUpperCase();
}

// ─────────────────────────────────────────────
// Balance Card
// ─────────────────────────────────────────────

function BalanceCard({ label, amount, bgColor, iconBg, icon, loading }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center justify-between gap-4 flex-1 min-w-[180px]">
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        <div>
          <p className="text-[11px] text-gray-400 font-medium mb-0.5">{label}</p>
          {loading ? (
            <div className="h-6 w-24 bg-gray-100 rounded animate-pulse" />
          ) : (
            <p className="text-xl font-bold text-gray-900">{formatCurrency(amount)}</p>
          )}
        </div>
      </div>
      {/* Trend icon */}
      <svg className="w-7 h-7 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    </div>
  );
}

// ─────────────────────────────────────────────
// Modals
// ─────────────────────────────────────────────

function ModalWrapper({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 text-xl transition leading-none">✕</button>
        </div>
        <div className="px-7 py-6">{children}</div>
      </div>
    </div>
  );
}

function WithdrawModal({ withdrawableBalance, onClose }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!num || num < 10) {
      toast.error('Minimum withdrawal amount is $10.00');
      return;
    }
    if (num > withdrawableBalance) {
      toast.error('Amount exceeds your withdrawable balance');
      return;
    }
    setLoading(true);
    try {
      const res = await withdrawFromWallet(num);
      toast.success(res?.message || 'Withdrawal request sent! Check your email for details.');
      onClose(true);
    } catch (error) {
      const msg = error?.response?.data?.message || error?.response?.data?.title || 'Withdrawal failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper title="Withdraw Balance" onClose={() => onClose(false)}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <p className="text-xs text-gray-400 mb-1">Withdrawable Balance</p>
          <p className="text-2xl font-bold text-[#7B1FA2]">{formatCurrency(withdrawableBalance)}</p>
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">Amount</label>
          <div className="relative">
            <input
              type="number"
              min="10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="500"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#7B1FA2] focus:border-[#7B1FA2] pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">USD</span>
          </div>
          <p className="text-xs text-gray-400 mt-1.5">Minimum withdraw amount is $10.00</p>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => onClose(false)} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-[#7B1FA2] hover:bg-[#6a1b91] text-white text-sm font-bold transition disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}

function PayModal({ onClose }) {
  const [freelancers, setFreelancers] = useState([]);
  const [selectedFreelancer, setSelectedFreelancer] = useState('');
  const [amount, setAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingFreelancers, setFetchingFreelancers] = useState(true);
  const [search, setSearch] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    async function loadFreelancers() {
      try {
        const res = await getFreelancersForPayment();
        const list = res?.data || res || [];
        setFreelancers(Array.isArray(list) ? list : []);
      } catch {
        setFreelancers([]);
      } finally {
        setFetchingFreelancers(false);
      }
    }
    loadFreelancers();
  }, []);

  const filtered = freelancers.filter(f =>
    (f.name || f.userName || '').toLowerCase().includes(search.toLowerCase())
  );

  const selectedName = freelancers.find(f => (f.userId || f.id) === selectedFreelancer)?.name
    || freelancers.find(f => (f.userId || f.id) === selectedFreelancer)?.userName
    || '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFreelancer) { toast.error('Please select a freelancer'); return; }
    if (!amount || parseFloat(amount) <= 0) { toast.error('Please enter a valid amount'); return; }
    setLoading(true);
    try {
      const res = await payFreelancer(selectedFreelancer, parseFloat(amount), notes);
      toast.success(res?.message || 'Payment request sent successfully!');
      onClose(true);
    } catch (error) {
      const msg = error?.response?.data?.message || error?.response?.data?.title || 'Payment failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper title="Pay Balance" onClose={() => onClose(false)}>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Freelancer Selector */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">Select Freelancer</label>
          <div className="relative">
            <div
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm flex items-center justify-between cursor-pointer hover:border-[#7B1FA2] transition"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <span className={selectedName ? 'text-gray-800' : 'text-gray-400'}>
                  {selectedName || 'Search freelancer...'}
                </span>
              </div>
              <svg className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </div>
            {dropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 max-h-48 overflow-hidden">
                <div className="p-2 border-b border-gray-100">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full text-sm px-3 py-2 rounded-lg bg-gray-50 focus:outline-none"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
                <div className="overflow-y-auto max-h-36">
                  {fetchingFreelancers ? (
                    <p className="text-sm text-gray-400 text-center py-4">Loading...</p>
                  ) : filtered.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-4">No freelancers found</p>
                  ) : filtered.map(f => (
                    <div
                      key={f.userId || f.id}
                      className="px-4 py-2.5 text-sm hover:bg-purple-50 cursor-pointer flex items-center gap-3 transition"
                      onClick={() => { setSelectedFreelancer(f.userId || f.id); setDropdownOpen(false); }}
                    >
                      <div className="w-7 h-7 rounded-full bg-[#f3e8ff] text-[#7B1FA2] flex items-center justify-center text-xs font-bold shrink-0">
                        {getUserInitials(f.name || f.userName)}
                      </div>
                      <span className="font-medium text-gray-800">{f.name || f.userName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">Amount</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="250"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#7B1FA2] focus:border-[#7B1FA2] pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">USD</span>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write a note..."
            rows={3}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#7B1FA2] focus:border-[#7B1FA2] resize-none"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button type="button" onClick={() => onClose(false)} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-[#7B1FA2] hover:bg-[#6a1b91] text-white text-sm font-bold transition disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Sending...' : 'Send Request'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}

function TopUpModal({ onClose }) {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (!num || num <= 0) { toast.error('Please enter a valid amount'); return; }
    setLoading(true);
    try {
      const res = await topUpWallet(num);
      toast.success(res?.message || 'Top up initiated! Check your email for payment details.');
      onClose(true);
    } catch (error) {
      const msg = error?.response?.data?.message || error?.response?.data?.title || 'Top up failed. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalWrapper title="Top Up Wallet" onClose={() => onClose(false)}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-2">Amount</label>
          <div className="relative">
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="1000"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#7B1FA2] focus:border-[#7B1FA2] pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">USD</span>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <button type="button" onClick={() => onClose(false)} className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 py-3 rounded-xl bg-[#7B1FA2] hover:bg-[#6a1b91] text-white text-sm font-bold transition disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? 'Processing...' : 'Continue'}
          </button>
        </div>
      </form>
    </ModalWrapper>
  );
}

// ─────────────────────────────────────────────
// Pagination
// ─────────────────────────────────────────────

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];
  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1, 2);
    if (currentPage > 3) pages.push('...');
    if (currentPage > 2 && currentPage < totalPages - 1) pages.push(currentPage);
    if (currentPage < totalPages - 2) pages.push('...');
    pages.push(totalPages - 1, totalPages);
  }

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-[#7B1FA2] hover:text-[#7B1FA2] disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
      </button>
      {pages.map((p, i) => (
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="w-8 text-center text-gray-400 text-sm">...</span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-8 h-8 rounded-lg text-sm font-bold transition ${p === currentPage ? 'bg-[#7B1FA2] text-white' : 'border border-gray-200 text-gray-600 hover:border-[#7B1FA2] hover:text-[#7B1FA2]'}`}
          >
            {p}
          </button>
        )
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-[#7B1FA2] hover:text-[#7B1FA2] disabled:opacity-40 disabled:cursor-not-allowed transition"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main Wallet Page
// ─────────────────────────────────────────────

export default function Wallet() {
  // Balance state
  const [balance, setBalance] = useState(null);
  const [balanceLoading, setBalanceLoading] = useState(true);

  // Transactions state
  const [transactions, setTransactions] = useState([]);
  const [txLoading, setTxLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Filters
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [sortBy, setSortBy] = useState('date_desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Modal state
  const [openModal, setOpenModal] = useState(null); // 'withdraw' | 'pay' | 'topup'

  // ── Data Fetchers ──

  const fetchBalance = useCallback(async () => {
    setBalanceLoading(true);
    try {
      const res = await getWalletBalance();
      setBalance(res?.data || res);
    } catch {
      setBalance(null);
    } finally {
      setBalanceLoading(false);
    }
  }, []);

  const fetchTransactions = useCallback(async () => {
    setTxLoading(true);
    try {
      const params = {
        page: currentPage,
        pageSize,
        ...(filterType && { type: filterType }),
        ...(filterStatus && { status: filterStatus }),
        ...(search && { search }),
        ...(sortBy && { sortBy }),
      };
      const res = await getWalletTransactions(params);
      const list = res?.data?.items || res?.data || res?.items || res || [];
      setTransactions(Array.isArray(list) ? list : []);
      setTotalCount(res?.data?.totalCount || res?.totalCount || list.length);
    } catch {
      setTransactions([]);
    } finally {
      setTxLoading(false);
    }
  }, [currentPage, filterType, filterStatus, search, sortBy]);

  useEffect(() => { fetchBalance(); }, [fetchBalance]);
  useEffect(() => { fetchTransactions(); }, [fetchTransactions]);

  // ── Modal Close Handler ──
  const handleModalClose = (success) => {
    setOpenModal(null);
    if (success) {
      fetchBalance();
      fetchTransactions();
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Page Header ── */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Wallet</h1>
          <p className="text-sm text-gray-400 mt-0.5">Manage your balance and transactions</p>
        </div>

        {/* ── Balance Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <BalanceCard
            label="Total Balance"
            amount={balance?.totalBalance}
            loading={balanceLoading}
            iconBg="bg-[#7B1FA2]"
            icon={<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" /></svg>}
          />
          <BalanceCard
            label="Available Balance"
            amount={balance?.availableBalance}
            loading={balanceLoading}
            iconBg="bg-green-500"
            icon={<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" /></svg>}
          />
          <BalanceCard
            label="Pending Balance"
            amount={balance?.pendingBalance}
            loading={balanceLoading}
            iconBg="bg-[#FFC107]"
            icon={<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          />
          <BalanceCard
            label="Withdrawable Balance"
            amount={balance?.withdrawableBalance}
            loading={balanceLoading}
            iconBg="bg-blue-500"
            icon={<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" /></svg>}
          />
        </div>

        {/* ── Action Buttons ── */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setOpenModal('withdraw')}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#7B1FA2] hover:bg-[#6a1b91] text-white text-sm font-bold rounded-xl transition shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" /></svg>
            Withdraw Balance
          </button>
          <button
            onClick={() => setOpenModal('pay')}
            className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-[#7B1FA2] border border-[#7B1FA2] text-sm font-bold rounded-xl transition shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>
            Pay Balance
          </button>
          <button
            onClick={() => setOpenModal('topup')}
            className="flex items-center gap-2 px-5 py-2.5 bg-white hover:bg-gray-50 text-[#7B1FA2] border border-[#7B1FA2] text-sm font-bold rounded-xl transition shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
            Top Up Wallet
          </button>
        </div>

        {/* ── Transaction History ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

          {/* Table Header / Filters */}
          <div className="px-6 py-5 border-b border-gray-100 flex flex-col lg:flex-row items-start lg:items-center gap-3">
            <h2 className="text-base font-bold text-gray-900 whitespace-nowrap mr-auto">Transaction History</h2>

            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {/* Type Filter */}
              <select
                value={filterType}
                onChange={(e) => { setFilterType(e.target.value); setCurrentPage(1); }}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7B1FA2] text-gray-600 bg-white"
              >
                <option value="">All Types</option>
                <option value="TopUp">Top Up</option>
                <option value="Withdrawal">Withdrawal</option>
                <option value="Payment">Payment</option>
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7B1FA2] text-gray-600 bg-white"
              >
                <option value="">All Status</option>
                <option value="Success">Success</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>

              {/* Date Range */}
              <div className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 9v7.5" /></svg>
                <span>Select Date Range</span>
              </div>

              {/* Search */}
              <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 text-sm">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                <input
                  type="text"
                  placeholder="Search by ID or user..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                  className="outline-none w-40 text-sm text-gray-700 placeholder-gray-400"
                />
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#7B1FA2] text-gray-600 bg-white"
              >
                <option value="date_desc">Sort by: Newest</option>
                <option value="date_asc">Sort by: Oldest</option>
                <option value="amount_desc">Sort by: Amount ↓</option>
                <option value="amount_asc">Sort by: Amount ↑</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-gray-50">
                  <th className="px-6 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {txLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 7 }).map((__, j) => (
                        <td key={j} className="px-6 py-4">
                          <div className="h-4 bg-gray-100 rounded animate-pulse w-20" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center text-gray-400">
                      <div className="flex flex-col items-center gap-3">
                        <svg className="w-12 h-12 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25z" /></svg>
                        <p className="text-sm font-medium">No transactions found</p>
                        <p className="text-xs text-gray-300">Your transactions will appear here once you make any payments or top-ups.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  transactions.map((tx, idx) => {
                    const isPositive = tx.type === 'TopUp';
                    const displayUser = tx.userName || tx.user || 'Self';
                    const displayType = tx.type || '—';
                    const status = tx.status || 'Pending';

                    return (
                      <tr key={tx.id || tx.transactionId || idx} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                          {tx.transactionId || tx.id || `TX${1025 - idx}`}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-semibold flex items-center ${TYPE_COLORS[displayType] || 'text-gray-600'}`}>
                            {TYPE_ICONS[displayType] || null}
                            {displayType}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600 shrink-0">
                              {getUserInitials(displayUser)}
                            </div>
                            <span className="text-sm text-gray-700">{displayUser}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-sm font-bold ${isPositive ? 'text-green-600' : 'text-red-500'}`}>
                            {isPositive ? '+' : '-'}{formatCurrency(tx.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full ${STATUS_STYLES[status] || 'bg-gray-100 text-gray-500'}`}>
                            {status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {formatDate(tx.createdAt || tx.date)}
                        </td>
                        <td className="px-6 py-4">
                          <button className="text-gray-300 hover:text-gray-600 transition opacity-0 group-hover:opacity-100">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          {!txLoading && transactions.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <p className="text-sm text-gray-400">
                Showing {Math.min((currentPage - 1) * pageSize + 1, totalCount)} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} entries
              </p>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(p) => setCurrentPage(p)}
              />
            </div>
          )}
        </div>
      </div>

      {/* ── Modals ── */}
      {openModal === 'withdraw' && (
        <WithdrawModal
          withdrawableBalance={balance?.withdrawableBalance || 0}
          onClose={handleModalClose}
        />
      )}
      {openModal === 'pay' && (
        <PayModal onClose={handleModalClose} />
      )}
      {openModal === 'topup' && (
        <TopUpModal onClose={handleModalClose} />
      )}
    </div>
  )}