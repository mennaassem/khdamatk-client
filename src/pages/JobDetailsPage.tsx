import React, { useState, useEffect, useRef } from 'react';
import {
  Container,
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  Typography,
  Button,
  TextField,
  Stack,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Paper,
  InputAdornment,
  Tabs,
  Tab,
  Rating,
} from '@mui/material';
import {
  Send as SendIcon,
  Download as DownloadIcon,
  AttachFile as AttachFileIcon,
  EmojiEmotions as EmojiEmotionsIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { jobsApi, messagesApi, usersApi } from '../services/api';
import { Job, Message, User } from '../types/index';
// @ts-ignore

const JobDetailsPage: React.FC = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState<Job | null>(null);
  const [freelancer, setFreelancer] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [tabValue, setTabValue] = useState<'job' | 'communication' | 'files'>('job');

  useEffect(() => {
    fetchJobDetails();
    fetchCurrentUser();
  }, [jobId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (job?.selectedFreelancer && tabValue === 'communication') {
      fetchMessages();
      // Poll for new messages
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [job?.selectedFreelancer, tabValue]);

  const fetchJobDetails = async () => {
    if (!jobId) return;
    setLoading(true);
    try {
      const jobData = await jobsApi.getById(jobId);
      setJob(jobData);

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

  const fetchCurrentUser = async () => {
    try {
      const user = await usersApi.getCurrentUser();
      setCurrentUser(user);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const fetchMessages = async () => {
    if (!job?.id) return;
    try {
      const msgs = await messagesApi.getConversation(job.id);
      setMessages(msgs);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !job || !freelancer || !currentUser) return;

    setSending(true);
    try {
      await messagesApi.sendMessage({
        jobId: job.id,
        senderId: currentUser.id,
        content: newMessage,
      });
      setNewMessage('');
      await fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setSending(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadFile = (fileUrl: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    link.click();
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!job) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">Job not found</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, color: '#1a1a1a' }}>
          {job.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Chip label={`Post Job`} color="primary" variant="outlined" />
          <Chip label={`Receive Proposals`} color="primary" variant="outlined" />
          {job.selectedFreelancer && <Chip label={`In Progress`} color="success" />}
        </Box>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue === 'job' ? 0 : tabValue === 'communication' ? 1 : 2} onChange={(e: React.SyntheticEvent, newValue: number) => {
          setTabValue(newValue === 0 ? 'job' : newValue === 1 ? 'communication' : 'files');
        }}>
          <Tab label="Job Details" />
          <Tab label="Communication" />
          <Tab label="Delivered Files" />
        </Tabs>
      </Box>

      {/* Job Details Tab */}
      {tabValue === 'job' && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Job Description</Typography>
                <Typography color="textSecondary" sx={{ whiteSpace: 'pre-wrap' }}>
                  {job.description}
                </Typography>
              </CardContent>
            </Card>

            {job.selectedFreelancer && freelancer && (
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    Selected Freelancer
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Avatar src={freelancer.avatar} sx={{ width: 60, height: 60 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {freelancer.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Rating value={freelancer.rating || 0} readOnly size="small" />
                        <Typography variant="caption">({freelancer.reviewsCount} reviews)</Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="textSecondary">Budget</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#7C3AED' }}>
                      ${job.budget}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="textSecondary">Deadline</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <ScheduleIcon sx={{ fontSize: 18, color: '#666' }} />
                      <Typography variant="body2">{job.deadline}</Typography>
                    </Box>
                  </Box>
                  <Divider />
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Skills Required</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {job.skills?.map((skill: string) => (
                      <Chip key={skill} label={skill} />
                    ))}
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {/* Communication Tab */}
      {tabValue === 'communication' && job.selectedFreelancer && freelancer && (
        <Card>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, pb: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Avatar src={freelancer.avatar} sx={{ width: 50, height: 50 }} />
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  Chat with {freelancer.name}
                </Typography>
                <Typography variant="caption" color="textSecondary">Online</Typography>
              </Box>
            </Box>

            {/* Messages */}
            <Box sx={{ maxHeight: 400, overflowY: 'auto', mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
              <Stack spacing={2}>
                {messages.map((message: Message) => (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: message.senderId === currentUser?.id ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: '70%',
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: message.senderId === currentUser?.id ? '#7C3AED' : '#fff',
                        color: message.senderId === currentUser?.id ? '#fff' : '#000',
                        boxShadow: 1,
                      }}
                    >
                      <Typography variant="body2">{message.content}</Typography>
                      <Typography variant="caption" sx={{ opacity: 0.7 }}>
                        {new Date(message.createdAt).toLocaleTimeString()}
                      </Typography>
                    </Box>
                  </Box>
                ))}
                <Box ref={messagesEndRef} sx={{ height: 0 }} />
              </Stack>
            </Box>

            {/* Message Input */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage(e.target.value)}
                disabled={sending}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <EmojiEmotionsIcon sx={{ cursor: 'pointer', color: '#7C3AED' }} />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                onClick={handleSendMessage}
                disabled={sending || !newMessage.trim()}
                sx={{ backgroundColor: '#7C3AED' }}
              >
                {sending ? <CircularProgress size={24} /> : <SendIcon />}
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Files Tab */}
      {tabValue === 'files' && (
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>Delivered Files</Typography>
            {job.deliveredFiles && job.deliveredFiles.length > 0 ? (
              <Stack spacing={2}>
                {job.deliveredFiles.map((file: any) => (
                  <Paper key={file.id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                        {file.name}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {file.size} • {new Date(file.uploadedAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Button
                      startIcon={<DownloadIcon />}
                      onClick={() => handleDownloadFile(file.url, file.name)}
                    >
                      Download
                    </Button>
                  </Paper>
                ))}
              </Stack>
            ) : (
              <Alert severity="info">No files delivered yet</Alert>
            )}
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default JobDetailsPage;
