import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  Typography,
  Button,
  Rating,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tab,
  Tabs,
  CircularProgress,
  LinearProgress,
  Alert,
  Paper,
  FormControlLabel,
  Checkbox,
  TextField,
} from '@mui/material';
import {
  Send as SendIcon,
  Download as DownloadIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { jobsApi, usersApi } from '../services/api';
import { Job, User } from '../types/index';
// @ts-ignore

const SelectedFreelancerPage: React.FC = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [freelancer, setFreelancer] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [messageContent, setMessageContent] = useState('');

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    if (!jobId) return;
    setLoading(true);
    try {
      const jobData = await jobsApi.getById(jobId);
      setJob(jobData);

      // Fetch selected freelancer details
      if (jobData.selectedFreelancer) {
        const freelancerData = await usersApi.getById(jobData.selectedFreelancer.id);
        setFreelancer(freelancerData);
      }
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    // TODO: Implement message sending
    setMessageContent('');
    setMessageDialogOpen(false);
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!job || !freelancer) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography color="error">Selected freelancer not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Success Message */}
      <Card sx={{ mb: 3, backgroundColor: '#E8F5E9', borderLeft: '4px solid #4CAF50' }}>
        <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 32 }} />
          <Box>
            <Typography sx={{ fontWeight: 'bold', color: '#2E7D32' }}>
              Freelancer Successfully Selected!
            </Typography>
            <Typography variant="body2" color="textSecondary">
              You have selected {freelancer.name} for your project. You can now communicate and
              collaborate on this project.
            </Typography>
          </Box>
        </CardContent>
      </Card>

      {/* Header with Timeline */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#1a1a1a' }}>
          {job.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Chip label={`Post Job`} icon={<CheckCircleIcon />} />
          <Chip label={`Receive Proposals`} icon={<CheckCircleIcon />} />
          <Chip label={`Select Freelancer`} icon={<CheckCircleIcon />} color="primary" />
          <Chip label={`In Progress`} />
        </Box>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column - Freelancer Details */}
        <Grid item xs={12} md={4}>
          {/* Freelancer Card */}
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar
                src={freelancer.avatar}
                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
              />
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                {freelancer.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                {freelancer.title}
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.5, mb: 2 }}>
                <Rating value={freelancer.rating || 0} readOnly />
              </Box>

              <Typography variant="caption" color="textSecondary">
                {freelancer.rating} ({freelancer.reviewsCount} reviews)
              </Typography>

              <Stack spacing={2} sx={{ mt: 3 }}>
                <Button
                  variant="contained"
                  startIcon={<SendIcon />}
                  onClick={() => setMessageDialogOpen(true)}
                  sx={{ backgroundColor: '#7C3AED' }}
                  fullWidth
                >
                  Message Freelancer
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Job Summary */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Job Summary</Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="caption" color="textSecondary">Budget</Typography>
                  <Typography variant="h6" sx={{ color: '#7C3AED', fontWeight: 'bold' }}>
                    ${job.budget}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary">Deadline</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ScheduleIcon sx={{ fontSize: 18 }} />
                    <Typography variant="body2">{job.deadline}</Typography>
                  </Box>
                </Box>
                <Box>
                  <Typography variant="caption" color="textSecondary">Status</Typography>
                  <Chip label="In Progress" color="primary" size="small" />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Right Column - Project Details */}
        <Grid item xs={12} md={8}>
          {/* Tabs */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tabValue} onChange={(e: React.SyntheticEvent, newValue: number) => setTabValue(newValue)}>
              <Tab label="Job Details" />
              <Tab label="Communication" />
              <Tab label="Deliverables" />
            </Tabs>
          </Box>

          {/* Tab 0: Job Details */}
          {tabValue === 0 && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Project Description
                </Typography>
                <Typography color="textSecondary" sx={{ mb: 3, whiteSpace: 'pre-wrap' }}>
                  {job.description}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Milestones
                </Typography>
                <Stack spacing={2}>
                  <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <TrendingUpIcon sx={{ color: '#7C3AED' }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          Initial Design Mockups
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Due in 2 weeks
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                  <Paper sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <TrendingUpIcon sx={{ color: '#7C3AED' }} />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          Frontend Development
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Due in 4 weeks
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Stack>
              </CardContent>
            </Card>
          )}

          {/* Tab 1: Communication */}
          {tabValue === 1 && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Chat with {freelancer.name}
                </Typography>
                <Alert severity="info" sx={{ mb: 3 }}>
                  Start discussing the project details and requirements with your selected freelancer.
                </Alert>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => setMessageDialogOpen(true)}
                  sx={{ backgroundColor: '#7C3AED' }}
                >
                  Send Message
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Tab 2: Deliverables */}
          {tabValue === 2 && (
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
                  Expected Deliverables
                </Typography>
                <Stack spacing={2}>
                  <Paper sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          homepage-mockup-v2.fig
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          2.5 MB • Figma File
                        </Typography>
                      </Box>
                      <Chip label="Approved" color="success" />
                    </Box>
                  </Paper>
                  <Paper sx={{ p: 2, backgroundColor: '#f9f9f9' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                          frontend-code-v1.zip
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          1.2 MB • ZIP Archive
                        </Typography>
                      </Box>
                      <Chip label="Pending Review" color="warning" />
                    </Box>
                  </Paper>
                </Stack>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>

      {/* Message Dialog */}
      <Dialog open={messageDialogOpen} onClose={() => setMessageDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Send Message to {freelancer.name}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={5}
            placeholder="Type your message..."
            value={messageContent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMessageContent(e.target.value)}
            sx={{ mt: 2 }}
          />
          <FormControlLabel
            control={<Checkbox />}
            label="This message does not contain any external contact information and I am sending it because I want to purchase the service offered."
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMessageDialogOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleSendMessage}
            sx={{ backgroundColor: '#7C3AED' }}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SelectedFreelancerPage;
