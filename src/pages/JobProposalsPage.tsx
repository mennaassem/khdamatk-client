import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  Grid,
  Chip,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Rating,
  Avatar,
  Typography,
  Stack,
  Tab,
  Tabs,
  Dialog,
  CircularProgress,
  Alert,
  Pagination,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  AttachMoney as AttachMoneyIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { proposalsApi } from '../services/api';
import { Proposal } from '../types/index';
// @ts-ignore

interface JobDetailsModalProps {
  open: boolean;
  onClose: () => void;
  proposal: Proposal | null;
  onSelectFreelancer: (freelancerId: string) => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  open,
  onClose,
  proposal,
  onSelectFreelancer,
}: JobDetailsModalProps) => {
  const [loading, setLoading] = useState(false);

  const handleAcceptProposal = async () => {
    if (!proposal) return;
    setLoading(true);
    try {
      await proposalsApi.accept(proposal.id);
      onSelectFreelancer(proposal.freelancer.id);
      onClose();
    } catch (error) {
      console.error('Error accepting proposal:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!proposal) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar src={proposal.freelancer.avatar} sx={{ width: 60, height: 60 }} />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{proposal.freelancer.name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Rating value={proposal.freelancer.rating || 0} readOnly size="small" />
              <Typography variant="caption">({proposal.freelancer.reviewsCount} reviews)</Typography>
            </Box>
          </Box>
        </Box>

        <Stack spacing={2} sx={{ my: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Bid Amount:</Typography>
            <Typography variant="h6" sx={{ color: '#7C3AED' }}>${proposal.bidAmount}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography>Delivery Time:</Typography>
            <Typography>{proposal.bidDuration}</Typography>
          </Box>
          <Box>
            <Typography gutterBottom>Cover Letter:</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ p: 1, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              {proposal.coverLetter}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button variant="outlined" onClick={onClose}>Reject</Button>
          <Button 
            variant="contained" 
            onClick={handleAcceptProposal} 
            disabled={loading}
            sx={{ backgroundColor: '#7C3AED' }}
          >
            {loading ? <CircularProgress size={24} /> : 'Accept'}
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
};

const JobProposalsPage: React.FC = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [priceFilter, setPriceFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [page, setPage] = useState(1);
  const proposalsPerPage = 5;

  useEffect(() => {
    fetchProposals();
  }, [jobId]);

  const fetchProposals = async () => {
    if (!jobId) return;
    setLoading(true);
    try {
      const data = await proposalsApi.getAll(jobId);
      setProposals(data);
    } catch (error) {
      console.error('Error fetching proposals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectFreelancer = (freelancerId: string) => {
    navigate(`/freelancer/${freelancerId}`);
    setModalOpen(false);
  };

  const filteredProposals = proposals.filter((proposal: Proposal) => {
    if (priceFilter === 'under-500' && proposal.bidAmount >= 500) return false;
    if (priceFilter === '500-1000' && (proposal.bidAmount < 500 || proposal.bidAmount >= 1000)) return false;
    if (priceFilter === 'over-1000' && proposal.bidAmount < 1000) return false;

    if (ratingFilter && proposal.freelancer.rating! < parseInt(ratingFilter)) return false;

    return true;
  });

  const paginatedProposals = filteredProposals.slice((page - 1) * proposalsPerPage, page * proposalsPerPage);
  const totalPages = Math.ceil(filteredProposals.length / proposalsPerPage);

  if (loading) {
    return (
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, color: '#1a1a1a' }}>
          Job Proposals
        </Typography>
        <Typography color="textSecondary">
          Full Stack Web Development • Budget: $5,000 - $8,000 • Posted: 3 days ago
        </Typography>
      </Box>

      {/* Filters */}
      <Card sx={{ mb: 4, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Filters</Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Price Range</InputLabel>
              <Select value={priceFilter} onChange={(e: any) => { setPriceFilter(e.target.value); setPage(1); }} label="Price Range">
                <MenuItem value="">All Prices</MenuItem>
                <MenuItem value="under-500">Under $500</MenuItem>
                <MenuItem value="500-1000">$500 - $1,000</MenuItem>
                <MenuItem value="over-1000">$1,000+</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Minimum Rating</InputLabel>
              <Select value={ratingFilter} onChange={(e: any) => { setRatingFilter(e.target.value); setPage(1); }} label="Minimum Rating">
                <MenuItem value="">Any Rating</MenuItem>
                <MenuItem value="3">3+ Stars</MenuItem>
                <MenuItem value="4">4+ Stars</MenuItem>
                <MenuItem value="5">5 Stars</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      {/* Proposals List */}
      <Stack spacing={2}>
        {paginatedProposals.length > 0 ? (
          paginatedProposals.map((proposal: Proposal) => (
            <Card key={proposal.id} sx={{ cursor: 'pointer', '&:hover': { boxShadow: 3 } }}>
              <CardContent sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                {/* Freelancer Avatar */}
                <Avatar src={proposal.freelancer.avatar} sx={{ width: 80, height: 80 }} />

                {/* Freelancer Info */}
                <Box sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                      {proposal.freelancer.name}
                    </Typography>
                    <Chip label={`Freelancer`} size="small" variant="outlined" />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                    <Rating value={proposal.freelancer.rating || 0} readOnly size="small" />
                    <Typography variant="caption" color="textSecondary">
                      {proposal.freelancer.rating} ({proposal.freelancer.reviewsCount} reviews)
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                    {proposal.freelancer.location} • {proposal.freelancer.experience}+ years
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#666' }}>
                    {proposal.coverLetter.substring(0, 150)}...
                  </Typography>
                </Box>

                {/* Proposal Details */}
                <Box sx={{ textAlign: 'right', minWidth: 150 }}>
                  <Typography variant="h6" sx={{ color: '#7C3AED', fontWeight: 'bold', mb: 1 }}>
                    ${proposal.bidAmount}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1, justifyContent: 'flex-end' }}>
                    <ScheduleIcon sx={{ fontSize: 18, color: '#666' }} />
                    <Typography variant="caption">{proposal.bidDuration}</Typography>
                  </Box>

                  <Button
                    variant="contained"
                    sx={{ backgroundColor: '#7C3AED', width: '100%' }}
                    onClick={() => {
                      setSelectedProposal(proposal);
                      setModalOpen(true);
                    }}
                  >
                    View Profile
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))
        ) : (
          <Alert severity="info">No proposals found matching your filters</Alert>
        )}
      </Stack>

      {/* Pagination */}
      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination count={totalPages} page={page} onChange={(e: any, value: number) => setPage(value)} />
        </Box>
      )}

      {/* Job Details Modal */}
      <JobDetailsModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        proposal={selectedProposal}
        onSelectFreelancer={handleSelectFreelancer}
      />
    </Container>
  );
};

export default JobProposalsPage;
