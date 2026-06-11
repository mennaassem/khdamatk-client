// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  title?: string;
  userType: 'client' | 'freelancer';
  rating?: number;
  reviewsCount?: number;
  location?: string;
  bio?: string;
  skills?: string[];
  experience?: number;
}

// Job Types
export interface DeliveredFile {
  id: string;
  name: string;
  url: string;
  size: string;
  uploadedAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  category: string;
  budget: number;
  budgetType: 'fixed' | 'hourly';
  duration: string;
  experienceLevel: string;
  skills: string[];
  createdBy: User;
  status: 'open' | 'in-progress' | 'completed' | 'closed';
  createdAt: string;
  deadline: string;
  proposals?: Proposal[];
  selectedFreelancer?: User;
  deliveredFiles?: DeliveredFile[];
}

// Proposal Types
export interface Proposal {
  id: string;
  jobId: string;
  freelancer: User;
  bidAmount: number;
  bidDuration: string;
  experienceLevel: string;
  coverLetter: string;
  attachments?: string[];
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  createdAt: string;
  updatedAt?: string;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  recipientId: string;
  jobId: string;
  content: string;
  attachments?: string[];
  createdAt: string;
  isRead: boolean;
}

// Conversation Types
export interface Conversation {
  id: string;
  jobId: string;
  participants: User[];
  lastMessage?: Message;
  lastMessageTime?: string;
  unreadCount: number;
}

// Contract Types
export interface Contract {
  id: string;
  jobId: string;
  freelancerId: string;
  clientId: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: 'pending' | 'active' | 'completed' | 'disputed';
  description: string;
  milestones?: Milestone[];
}

export interface Milestone {
  id: string;
  contractId: string;
  title: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'completed' | 'approved';
}

// Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
