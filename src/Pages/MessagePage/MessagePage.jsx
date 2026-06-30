import React, { useState, useContext, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Send, Upload, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { AuthContext } from '../../Components/Context/AuthContext';
import { API_CONFIG } from '../../Config';

const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/jpg',
  'image/png',
];

const TIME_COMMITMENT_OPTIONS = ['Part-time', 'Full-time', 'Flexible'];
const EXPERIENCE_LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Expert'];

export default function MessagePage() {
  const { jobId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const passedState = location.state || {};
  const [jobTitle, setJobTitle] = useState(passedState.jobTitle || '');
  const [clientName, setClientName] = useState(passedState.clientName || '');
  const [pageLoading, setPageLoading] = useState(!passedState.jobData);

  const [formData, setFormData] = useState({
    ProviderServiceId: passedState.jobData?.providerServiceId || passedState.jobData?.serviceId || '',
    OfferAmount: '',
    Description: '',
    SimilarWorkExamplesURL: '',
    Deadline: '',
    Attachment: null,
    TimeCommitment: passedState.jobData?.timeCommitment || '',
    ExperienceLevel: passedState.jobData?.experienceLevel || '',
  });

  const [fileName, setFileName] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchJob = async () => {
      if (passedState.jobData) {
        setPageLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${API_CONFIG.baseURL}/api/Jobs/${jobId}`, {
          headers: { 'X-API-Version': '' },
        });

        if (data.isSuccess && data.data) {
          const job = data.data;
          setJobTitle(job.title || '');
          setClientName(job.clientName || job.userName || job.postedByName || 'Client');
          setFormData((prev) => ({
            ...prev,
            ProviderServiceId: job.providerServiceId || job.serviceId || '',
            TimeCommitment: job.timeCommitment || prev.TimeCommitment,
            ExperienceLevel: job.experienceLevel || prev.ExperienceLevel,
          }));
        } else {
          setError('Job not found');
        }
      } catch {
        setError('Failed to load job details');
      } finally {
        setPageLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId, passedState.jobData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must not exceed 5 MB');
      return;
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      setError('Unsupported file type. Allowed: PDF, DOC, DOCX, JPG, JPEG, PNG');
      return;
    }

    setError(null);
    setFormData((prev) => ({ ...prev, Attachment: file }));
    setFileName(file.name);
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, Attachment: null }));
    setFileName('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.OfferAmount || !formData.Description || !formData.Deadline || !formData.TimeCommitment || !formData.ExperienceLevel) {
      setError('Please fill in all required fields');
      return;
    }

    if (!termsAccepted || !privacyAccepted) {
      setError('You must accept the terms and conditions');
      return;
    }

    if (!token) {
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      let response;

      if (formData.Attachment) {
        const submitData = new FormData();
        submitData.append('ProviderServiceId', formData.ProviderServiceId || '');
        submitData.append('OfferAmount', formData.OfferAmount);
        submitData.append('Description', formData.Description);
        submitData.append('SimilarWorkExamplesURL', formData.SimilarWorkExamplesURL || '');
        submitData.append('Deadline', formData.Deadline);
        submitData.append('TimeCommitment', formData.TimeCommitment);
        submitData.append('ExperienceLevel', formData.ExperienceLevel);
        submitData.append('Attachment', formData.Attachment);

        response = await axios.post(
          `${API_CONFIG.baseURL}/api/JobOrder/Jobs/${jobId}/Offers`,
          submitData,
          {
            headers: {
              'X-API-Version': '',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        const encodedParams = new URLSearchParams();
        encodedParams.set('ProviderServiceId', formData.ProviderServiceId || '');
        encodedParams.set('OfferAmount', formData.OfferAmount);
        encodedParams.set('Description', formData.Description);
        encodedParams.set('SimilarWorkExamplesURL', formData.SimilarWorkExamplesURL || '');
        encodedParams.set('Deadline', formData.Deadline);
        encodedParams.set('TimeCommitment', formData.TimeCommitment);
        encodedParams.set('ExperienceLevel', formData.ExperienceLevel);
        encodedParams.set('Attachment', '');

        response = await axios.post(
          `${API_CONFIG.baseURL}/api/JobOrder/Jobs/${jobId}/Offers`,
          encodedParams,
          {
            headers: {
              'X-API-Version': '',
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      const { data } = response;

      if (data.isSuccess || data.status === 201) {
        toast.success(data.message || 'Proposal sent successfully!');
        navigate(`/git-job/${jobId}`);
      } else {
        setError(data.message || 'Failed to send proposal');
      }
    } catch (err) {
      console.error('Error sending proposal:', err);

      if (err.response?.status === 401) {
        setError('Session expired. Please log in again.');
      } else if (err.response?.status === 400) {
        setError(err.response?.data?.message || 'Invalid data. Please check your inputs.');
      } else {
        setError('Failed to send proposal. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-700" />
          <p className="text-gray-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-12 pt-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl font-bold">&quot;{jobTitle || 'Job Title'}&quot;</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 -mt-6">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-xl font-bold mb-6">
            Send Proposal to &apos;{clientName || 'Client'}&apos;
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-base font-semibold">
                  Price* <span className="text-gray-500 font-normal">EGP</span>
                </label>
                <input
                  type="number"
                  name="OfferAmount"
                  value={formData.OfferAmount}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full border-b-2 border-gray-300 py-2 outline-none focus:border-purple-700 transition"
                />
              </div>

              <div>
                <label className="block mb-2 text-base font-semibold">Deadline*</label>
                <input
                  type="date"
                  name="Deadline"
                  value={formData.Deadline}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border-b-2 border-gray-300 py-2 outline-none focus:border-purple-700 transition"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-base font-semibold">Time Commitment*</label>
                <select
                  name="TimeCommitment"
                  value={formData.TimeCommitment}
                  onChange={handleChange}
                  required
                  className="w-full border-b-2 border-gray-300 py-2 outline-none focus:border-purple-700 transition bg-transparent"
                >
                  <option value="">Select time commitment</option>
                  {TIME_COMMITMENT_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-base font-semibold">Experience level*</label>
                <select
                  name="ExperienceLevel"
                  value={formData.ExperienceLevel}
                  onChange={handleChange}
                  required
                  className="w-full border-b-2 border-gray-300 py-2 outline-none focus:border-purple-700 transition bg-transparent"
                >
                  <option value="">Select experience level</option>
                  {EXPERIENCE_LEVEL_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-base font-semibold">Message content / Proposal*</label>
              <textarea
                name="Description"
                value={formData.Description}
                onChange={handleChange}
                placeholder="Write your proposal and message to the client here..."
                required
                rows="6"
                className="w-full bg-gray-100 rounded-lg p-4 resize-none outline-none focus:ring-2 focus:ring-purple-700 transition"
              />
              <p className="text-sm text-gray-600 mt-2">
                Ask the client anything you want to know about this job. Posting external contact information is prohibited.
              </p>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-base font-semibold">Similar work URL</label>
              <input
                type="url"
                name="SimilarWorkExamplesURL"
                value={formData.SimilarWorkExamplesURL}
                onChange={handleChange}
                placeholder="https://example.com/portfolio"
                className="w-full border-b-2 border-gray-300 py-2 outline-none focus:border-purple-700 transition"
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-base font-semibold">Attachment</label>

              {!fileName ? (
                <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition">
                  <Upload className="text-purple-600 mb-2" size={32} />
                  <p className="text-gray-600 mb-1">
                    Drop here or <span className="text-purple-700 font-semibold">Browse file</span>
                  </p>
                  <p className="text-sm text-gray-500">Supported formats: PDF, DOCX, JPG, PNG (Max 5MB)</p>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="border-2 border-gray-300 rounded-lg p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Upload className="text-purple-600" size={20} />
                    <span className="text-gray-700">{fileName}</span>
                  </div>
                  <button type="button" onClick={removeFile} className="text-red-600 hover:text-red-800">
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            <div className="mb-6 space-y-3">
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-purple-700 cursor-pointer"
                />
                <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                  This message does not contain any external contact information and I am sending it because I want to submit a proposal for the job offered.
                </label>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="privacy"
                  checked={privacyAccepted}
                  onChange={(e) => setPrivacyAccepted(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-purple-700 cursor-pointer"
                />
                <label htmlFor="privacy" className="text-sm text-gray-700 cursor-pointer">
                  I have reviewed the terms and conditions of the{' '}
                  <span className="text-purple-700 font-semibold">KHDAMATK</span> website and this message does not violate them in any way.
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !termsAccepted || !privacyAccepted}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Proposal
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
