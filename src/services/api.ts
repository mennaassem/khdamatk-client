import axios, { AxiosInstance } from 'axios';
import { Job, Proposal, Message, Conversation, User, ApiResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Jobs API
export const jobsApi = {
  getAll: async (filters?: any): Promise<Job[]> => {
    const response = await api.get<ApiResponse<Job[]>>('/jobs', { params: filters });
    return response.data.data || [];
  },

  getById: async (jobId: string): Promise<Job> => {
    const response = await api.get<ApiResponse<Job>>(`/jobs/${jobId}`);
    return response.data.data!;
  },

  create: async (jobData: Partial<Job>): Promise<Job> => {
    const response = await api.post<ApiResponse<Job>>('/jobs', jobData);
    return response.data.data!;
  },

  update: async (jobId: string, jobData: Partial<Job>): Promise<Job> => {
    const response = await api.put<ApiResponse<Job>>(`/jobs/${jobId}`, jobData);
    return response.data.data!;
  },

  delete: async (jobId: string): Promise<void> => {
    await api.delete(`/jobs/${jobId}`);
  },

  getProposals: async (jobId: string): Promise<Proposal[]> => {
    const response = await api.get<ApiResponse<Proposal[]>>(`/jobs/${jobId}/proposals`);
    return response.data.data || [];
  },
};

// Proposals API
export const proposalsApi = {
  getAll: async (jobId?: string): Promise<Proposal[]> => {
    const response = await api.get<ApiResponse<Proposal[]>>('/proposals', {
      params: { jobId },
    });
    return response.data.data || [];
  },

  create: async (proposalData: Partial<Proposal>): Promise<Proposal> => {
    const response = await api.post<ApiResponse<Proposal>>('/proposals', proposalData);
    return response.data.data!;
  },

  update: async (proposalId: string, proposalData: Partial<Proposal>): Promise<Proposal> => {
    const response = await api.put<ApiResponse<Proposal>>(`/proposals/${proposalId}`, proposalData);
    return response.data.data!;
  },

  accept: async (proposalId: string): Promise<Proposal> => {
    const response = await api.post<ApiResponse<Proposal>>(`/proposals/${proposalId}/accept`);
    return response.data.data!;
  },

  reject: async (proposalId: string): Promise<void> => {
    await api.post(`/proposals/${proposalId}/reject`);
  },

  withdraw: async (proposalId: string): Promise<void> => {
    await api.post(`/proposals/${proposalId}/withdraw`);
  },
};

// Messages API
export const messagesApi = {
  getConversation: async (jobId: string): Promise<Message[]> => {
    try {
      const response = await api.get<ApiResponse<Message[]>>(`/conversations/${jobId}/messages`);
      return response.data.data || [];
    } catch (error) {
      // Return mock data in case of error
      return [];
    }
  },

  sendMessage: async (messageData: Partial<Message>): Promise<Message> => {
    try {
      const response = await api.post<ApiResponse<Message>>('/messages', messageData);
      return response.data.data!;
    } catch (error) {
      // Return mock message in case of error
      return { id: '1', senderId: '', recipientId: '', jobId: '', content: '', createdAt: new Date().toISOString(), isRead: false } as Message;
    }
  },

  getConversations: async (): Promise<Conversation[]> => {
    try {
      const response = await api.get<ApiResponse<Conversation[]>>('/conversations');
      return response.data.data || [];
    } catch (error) {
      return [];
    }
  },

  markAsRead: async (messageId: string): Promise<void> => {
    try {
      await api.put(`/messages/${messageId}/read`);
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  },
};

// Users API
export const usersApi = {
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/users/me');
    return response.data.data!;
  },

  getById: async (userId: string): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/${userId}`);
    return response.data.data!;
  },

  updateProfile: async (userData: Partial<User>): Promise<User> => {
    const response = await api.put<ApiResponse<User>>('/users/me', userData);
    return response.data.data!;
  },

  getFreelancerDetail: async (freelancerId: string): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/${freelancerId}`);
    return response.data.data!;
  },
};

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
    const response = await api.post('/auth/login', { email, password });
    return response.data.data;
  },

  register: async (userData: any): Promise<{ token: string; user: User }> => {
    const response = await api.post('/auth/register', userData);
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },
};

export default api;
