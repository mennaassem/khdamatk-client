import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

const ITEMS_PER_PAGE = 6;

const StarRating = ({ rating }) => {
  return (
    <span style={{ color: '#f59e0b', fontSize: '13px' }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= Math.round(rating) ? '#f59e0b' : '#d1d5db' }}>★</span>
      ))}
    </span>
  );
};

export default function ServicesByCategory() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryName = searchParams.get('category') || 'Services';

  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [deliveryFilter, setDeliveryFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          `https://localhost:7210/api/Services/by-CategoryName/${categoryName}`,
          { headers: { 'X-API-Version': '1.0' } }
        );
        if (data.isSuccess) {
          setServices(data.data);
        } else {
          setError(data.message || 'Unexpected error.');
        }
      } catch (err) {
        setError(err.message || 'Failed to connect to server.');
      } finally {
        setIsLoading(false);
      }
    };
    if (categoryName) fetchServices();
  }, [categoryName]);

  useEffect(() => {
    let result = [...services];
    if (search.trim()) {
      result = result.filter(s => s.title?.toLowerCase().includes(search.toLowerCase()));
    }
    result = result.filter(s => s.price >= minPrice && s.price <= maxPrice);
    if (deliveryFilter === '1') result = result.filter(s => s.deliveryTimeInDays <= 1);
    else if (deliveryFilter === '3') result = result.filter(s => s.deliveryTimeInDays <= 3);
    else if (deliveryFilter === '7') result = result.filter(s => s.deliveryTimeInDays <= 7);
    if (ratingFilter > 0) result = result.filter(s => s.averageRating >= ratingFilter);
    if (verifiedOnly) result = result.filter(s => s.providerInfo?.isVerified);
    if (sortBy === 'Most Popular') result.sort((a, b) => (b.ordersCount || 0) - (a.ordersCount || 0));
    else if (sortBy === 'Highest Rated') result.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
    else if (sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);
    setFiltered(result);
    setCurrentPage(1);
  }, [services, search, minPrice, maxPrice, deliveryFilter, ratingFilter, verifiedOnly, sortBy]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const resetFilters = () => {
    setMinPrice(0); setMaxPrice(10000);
    setDeliveryFilter(''); setRatingFilter(0);
    setVerifiedOnly(false); setSearch('');
  };

  const deliveryOptions = [
    { label: 'Up to 24 hours', value: '1', count: services.filter(s=>s.deliveryTimeInDays<=1).length },
    { label: 'Up to 3 days',   value: '3', count: services.filter(s=>s.deliveryTimeInDays<=3).length },
    { label: 'Up to 7 days',   value: '7', count: services.filter(s=>s.deliveryTimeInDays<=7).length },
    { label: 'Anytime',        value: '',  count: services.length },
  ];
  const ratingOptions = [5,4,3,2];
  const verifiedCount = services.filter(s=>s.providerInfo?.isVerified).length;

  return (
    <div style={{ minHeight:'100vh', background:'#f8f9fa', fontFamily:"'Segoe UI',sans-serif", paddingTop:'80px' }}>

      {/* Header */}
      <div style={{ background:'#fff', borderBottom:'1px solid #eee', padding:'28px 40px' }}>
        <div style={{ maxWidth:'1200px', margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'20px' }}>
          <div style={{ maxWidth:'280px' }}>
            <h1 style={{ fontSize:'26px', fontWeight:'700', color:'#1a1a2e', margin:'0 0 6px' }}>{categoryName} Services</h1>
            <p style={{ fontSize:'13px', color:'#6b7280', margin:0, lineHeight:'1.5' }}>
              Discover high-quality {categoryName.toLowerCase()} services to make your brand stand out. Professional services starting at great prices.
            </p>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'12px', flex:'1', maxWidth:'400px', minWidth:'260px' }}>
            <div style={{ flex:1, display:'flex', alignItems:'center', background:'#f3f4f6', border:'1px solid #e5e7eb', borderRadius:'8px', padding:'0 12px', height:'44px' }}>
              <svg width="16" height="16" fill="none" stroke="#9ca3af" strokeWidth="2" viewBox="0 0 24 24" style={{marginRight:'8px',flexShrink:0}}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search services..."
                style={{ border:'none', background:'transparent', outline:'none', fontSize:'14px', width:'100%', color:'#374151' }}
              />
            </div>
            <button
              onClick={() => setCurrentPage(1)}
              style={{ background:'#5b21b6', color:'#fff', border:'none', borderRadius:'8px', padding:'0 22px', height:'44px', fontWeight:'600', fontSize:'14px', cursor:'pointer', whiteSpace:'nowrap' }}
            >
              Search
            </button>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'14px', background:'#f5f3ff', border:'1px solid #ede9fe', borderRadius:'12px', padding:'14px 20px' }}>
            <div style={{ background:'#5b21b6', borderRadius:'8px', width:'40px', height:'40px', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
            </div>
            <div>
              <div style={{ fontSize:'20px', fontWeight:'700', color:'#1a1a2e', lineHeight:1 }}>{services.length} Services</div>
              <div style={{ fontSize:'12px', color:'#6b7280', marginTop:'2px' }}>Available in this category</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ maxWidth:'1200px', margin:'0 auto', padding:'24px 20px', display:'flex', gap:'24px', alignItems:'flex-start' }}>

        {/* Sidebar */}
        <aside style={{ width:'220px', flexShrink:0, background:'#fff', borderRadius:'12px', padding:'20px', border:'1px solid #e5e7eb', position:'sticky', top:'90px' }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px' }}>
            <span style={{ fontWeight:'700', fontSize:'15px', color:'#1a1a2e' }}>Filter By</span>
            <svg width="16" height="16" fill="none" stroke="#5b21b6" strokeWidth="2" viewBox="0 0 24 24"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          </div>

          {/* Price Range */}
          <div style={{ marginBottom:'20px', borderBottom:'1px solid #f3f4f6', paddingBottom:'20px' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px' }}>
              <span style={{ fontWeight:'600', fontSize:'13px', color:'#374151', display:'flex', alignItems:'center', gap:'6px' }}>
                <svg width="13" height="13" fill="none" stroke="#5b21b6" strokeWidth="2" viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                Price Range
              </span>
              <svg width="12" height="12" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
            </div>
            <div style={{ display:'flex', gap:'8px', marginBottom:'10px' }}>
              <div>
                <div style={{ fontSize:'11px', color:'#6b7280', marginBottom:'3px' }}>Min Price</div>
                <input type="number" value={minPrice} onChange={e=>setMinPrice(Number(e.target.value))}
                  style={{ width:'80px', border:'1px solid #e5e7eb', borderRadius:'6px', padding:'5px 7px', fontSize:'12px', color:'#374151', outline:'none' }} />
              </div>
              <div>
                <div style={{ fontSize:'11px', color:'#6b7280', marginBottom:'3px' }}>Max Price</div>
                <input type="number" value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}
                  style={{ width:'80px', border:'1px solid #e5e7eb', borderRadius:'6px', padding:'5px 7px', fontSize:'12px', color:'#374151', outline:'none' }} />
              </div>
            </div>
            <input type="range" min={0} max={10000} value={maxPrice} onChange={e=>setMaxPrice(Number(e.target.value))}
              style={{ width:'100%', accentColor:'#5b21b6' }} />
          </div>

          {/* Delivery Time */}
          <div style={{ marginBottom:'20px', borderBottom:'1px solid #f3f4f6', paddingBottom:'20px' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px' }}>
              <span style={{ fontWeight:'600', fontSize:'13px', color:'#374151', display:'flex', alignItems:'center', gap:'6px' }}>
                <svg width="13" height="13" fill="none" stroke="#5b21b6" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Delivery Time
              </span>
              <svg width="12" height="12" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
            </div>
            {deliveryOptions.map(opt => (
              <label key={opt.value} style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'8px', cursor:'pointer' }}>
                <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                  <input type="checkbox" checked={deliveryFilter===opt.value} onChange={()=>setDeliveryFilter(deliveryFilter===opt.value?'':opt.value)}
                    style={{ accentColor:'#5b21b6', width:'14px', height:'14px' }} />
                  <span style={{ fontSize:'12px', color:'#374151' }}>{opt.label}</span>
                </div>
                <span style={{ fontSize:'11px', color:'#9ca3af' }}>{opt.count}</span>
              </label>
            ))}
          </div>

          {/* Rating */}
          <div style={{ marginBottom:'20px', borderBottom:'1px solid #f3f4f6', paddingBottom:'20px' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px' }}>
              <span style={{ fontWeight:'600', fontSize:'13px', color:'#374151', display:'flex', alignItems:'center', gap:'6px' }}>
                <svg width="13" height="13" fill="#f59e0b" viewBox="0 0 24 24"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                Rating
              </span>
              <svg width="12" height="12" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
            </div>
            {ratingOptions.map(r => (
              <label key={r} style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'8px', cursor:'pointer' }}>
                <input type="radio" name="rating" checked={ratingFilter===r} onChange={()=>setRatingFilter(ratingFilter===r?0:r)}
                  style={{ accentColor:'#5b21b6', width:'14px', height:'14px' }} />
                <StarRating rating={r} />
                <span style={{ fontSize:'12px', color:'#374151' }}>{r === 5 ? '5 Stars' : `${r} Stars & Up`}</span>
              </label>
            ))}
          </div>

          {/* Verified */}
          <div style={{ marginBottom:'20px' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'12px' }}>
              <span style={{ fontWeight:'600', fontSize:'13px', color:'#374151', display:'flex', alignItems:'center', gap:'6px' }}>
                <svg width="13" height="13" fill="none" stroke="#5b21b6" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Verified Freelancers
              </span>
              <svg width="12" height="12" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>
            </div>
            <label style={{ display:'flex', alignItems:'center', justifyContent:'space-between', cursor:'pointer' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                <input type="checkbox" checked={verifiedOnly} onChange={e=>setVerifiedOnly(e.target.checked)}
                  style={{ accentColor:'#5b21b6', width:'14px', height:'14px' }} />
                <span style={{ fontSize:'12px', color:'#374151' }}>Verified Only</span>
              </div>
              <span style={{ fontSize:'11px', color:'#9ca3af' }}>{verifiedCount}</span>
            </label>
          </div>

          <button onClick={resetFilters}
            style={{ width:'100%', border:'1.5px solid #5b21b6', background:'#fff', color:'#5b21b6', borderRadius:'8px', padding:'10px', fontWeight:'600', fontSize:'13px', cursor:'pointer', transition:'all .2s' }}
            onMouseEnter={e=>{ e.target.style.background='#5b21b6'; e.target.style.color='#fff'; }}
            onMouseLeave={e=>{ e.target.style.background='#fff'; e.target.style.color='#5b21b6'; }}
          >
            Reset Filters
          </button>
        </aside>

        {/* Content */}
        <div style={{ flex:1, minWidth:0 }}>
          {/* Toolbar */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px', flexWrap:'wrap', gap:'12px' }}>
            <span style={{ fontSize:'14px', color:'#374151', fontWeight:'500' }}>{filtered.length} Services Found</span>
            <div style={{ display:'flex', alignItems:'center', gap:'10px' }}>
              <span style={{ fontSize:'13px', color:'#6b7280' }}>Sort by:</span>
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
                style={{ border:'1px solid #e5e7eb', borderRadius:'8px', padding:'7px 12px', fontSize:'13px', color:'#374151', outline:'none', background:'#fff', cursor:'pointer' }}>
                <option>Most Popular</option>
                <option>Highest Rated</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Loading / Error */}
          {isLoading && (
            <div style={{ textAlign:'center', padding:'60px 0' }}>
              <div style={{ width:'40px', height:'40px', border:'3px solid #ede9fe', borderTopColor:'#5b21b6', borderRadius:'50%', animation:'spin 0.8s linear infinite', margin:'0 auto 16px' }}/>
              <p style={{ color:'#6b7280', fontSize:'14px' }}>Loading services...</p>
            </div>
          )}
          {!isLoading && error && (
            <div style={{ textAlign:'center', padding:'60px 0', color:'#ef4444' }}>{error}</div>
          )}
          {!isLoading && !error && filtered.length === 0 && (
            <div style={{ textAlign:'center', padding:'60px 0', color:'#6b7280' }}>No services found matching your filters.</div>
          )}

          {/* Grid */}
          {!isLoading && !error && filtered.length > 0 && (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'20px', marginBottom:'32px' }}>
              {paginated.map((service, idx) => {
                const isFeatured = service.ordersCount > 50 || idx === 0 || idx === 2;
                const providerName = service.providerInfo?.name || 'Freelancer';
                const rating = service.averageRating || 4.5;
                const reviewCount = service.reviewsCount || 0;
                const delivery = service.deliveryTimeInDays || 3;
                const price = service.price || 0;

                return (
                  <div key={service.id}
                    onClick={() => navigate(`/servicedetails/${service.id}`)}
                    style={{ background:'#fff', borderRadius:'12px', overflow:'hidden', border:'1px solid #e5e7eb', cursor:'pointer', transition:'transform .2s, box-shadow .2s', boxShadow:'0 1px 4px rgba(0,0,0,0.06)' }}
                    onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(91,33,182,0.12)'; }}
                    onMouseLeave={e=>{ e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='0 1px 4px rgba(0,0,0,0.06)'; }}
                  >
                    {/* Image */}
                    <div style={{ position:'relative', height:'180px', background:'#e5e7eb', overflow:'hidden' }}>
                      {service.mainImage ? (
                        <img src={`data:image/jpeg;base64,${service.mainImage}`} alt={service.title}
                          style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                      ) : (
                        <div style={{ width:'100%', height:'100%', background:'linear-gradient(135deg,#5b21b6,#7c3aed)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <svg width="48" height="48" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                        </div>
                      )}
                      {isFeatured && (
                        <div style={{ position:'absolute', top:'10px', left:'10px', background:'#f59e0b', color:'#fff', fontSize:'11px', fontWeight:'700', padding:'3px 10px', borderRadius:'20px', letterSpacing:'0.5px' }}>
                          Featured
                        </div>
                      )}
                      <button
                        onClick={e => e.stopPropagation()}
                        style={{ position:'absolute', top:'10px', right:'10px', background:'rgba(255,255,255,0.9)', border:'none', borderRadius:'50%', width:'30px', height:'30px', display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#6b7280', fontSize:'14px' }}
                      >
                        ♡
                      </button>
                    </div>

                    {/* Body */}
                    <div style={{ padding:'14px' }}>
                      <p style={{ fontSize:'13px', color:'#1a1a2e', fontWeight:'600', margin:'0 0 12px', lineHeight:'1.4', display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>
                        {service.title}
                      </p>

                      {/* Provider */}
                      <div style={{ display:'flex', alignItems:'center', gap:'8px', marginBottom:'10px' }}>
                        {service.providerInfo?.profileImage ? (
                          <img src={`data:image/jpeg;base64,${service.providerInfo.profileImage}`} alt={providerName}
                            style={{ width:'28px', height:'28px', borderRadius:'50%', objectFit:'cover' }} />
                        ) : (
                          <div style={{ width:'28px', height:'28px', borderRadius:'50%', background:'#ede9fe', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', color:'#5b21b6', fontWeight:'700' }}>
                            {providerName.charAt(0)}
                          </div>
                        )}
                        <span style={{ fontSize:'12px', fontWeight:'600', color:'#374151' }}>{providerName}</span>
                        {service.providerInfo?.isVerified && (
                          <svg width="13" height="13" fill="#3b82f6" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        )}
                      </div>

                      {/* Rating */}
                      <div style={{ display:'flex', alignItems:'center', gap:'5px', marginBottom:'12px' }}>
                        <StarRating rating={rating} />
                        <span style={{ fontSize:'12px', fontWeight:'600', color:'#374151' }}>{rating.toFixed(1)}</span>
                        <span style={{ fontSize:'11px', color:'#9ca3af' }}>({reviewCount})</span>
                      </div>

                      <hr style={{ border:'none', borderTop:'1px solid #f3f4f6', margin:'10px 0' }} />

                      {/* Footer */}
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                        <div style={{ display:'flex', alignItems:'center', gap:'5px', color:'#6b7280', fontSize:'12px' }}>
                          <svg width="13" height="13" fill="none" stroke="#6b7280" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                          {delivery} Days Delivery
                        </div>
                        <div style={{ textAlign:'right' }}>
                          <div style={{ fontSize:'10px', color:'#6b7280' }}>Starting From</div>
                          <div style={{ fontSize:'15px', fontWeight:'700', color:'#f59e0b' }}>{price} EGP</div>
                        </div>
                      </div>

                      <button
                        onClick={e => { e.stopPropagation(); navigate(`/servicedetails/${service.id}`); }}
                        style={{ marginTop:'12px', width:'100%', background:'#5b21b6', color:'#fff', border:'none', borderRadius:'8px', padding:'10px', fontWeight:'600', fontSize:'13px', cursor:'pointer', transition:'background .2s' }}
                        onMouseEnter={e=>e.target.style.background='#4c1d95'}
                        onMouseLeave={e=>e.target.style.background='#5b21b6'}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display:'flex', justifyContent:'center', alignItems:'center', gap:'8px' }}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                style={{ padding:'8px 14px', border:'1px solid #e5e7eb', borderRadius:'8px', background:'#fff', color: currentPage===1?'#d1d5db':'#374151', cursor: currentPage===1?'not-allowed':'pointer', fontSize:'13px', display:'flex', alignItems:'center', gap:'4px' }}
              >
                ← Previous
              </button>
              {Array.from({length: totalPages}, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setCurrentPage(p)}
                  style={{ width:'36px', height:'36px', borderRadius:'8px', border: p===currentPage?'none':'1px solid #e5e7eb', background: p===currentPage?'#5b21b6':'#fff', color: p===currentPage?'#fff':'#374151', fontWeight: p===currentPage?'700':'400', cursor:'pointer', fontSize:'13px' }}>
                  {p}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                style={{ padding:'8px 14px', border:'1px solid #e5e7eb', borderRadius:'8px', background:'#fff', color: currentPage===totalPages?'#d1d5db':'#374151', cursor: currentPage===totalPages?'not-allowed':'pointer', fontSize:'13px', display:'flex', alignItems:'center', gap:'4px' }}
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}