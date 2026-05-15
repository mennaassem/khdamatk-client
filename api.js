// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Conversations API
export const conversationsAPI = {
  // Get all conversations
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/conversations`);
      if (!response.ok) throw new Error('Failed to fetch conversations');
      return await response.json();
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },

  // Get specific conversation by ID
  getById: async (conversationId) => {
    if (!conversationId) throw new Error('Conversation ID is required');
    
    try {
      const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}`);
      if (!response.ok) {
        if (response.status === 404) throw new Error('Conversation not found');
        throw new Error('Failed to fetch conversation');
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching conversation ${conversationId}:`, error);
      throw error;
    }
  },

  // Create new conversation
  create: async (conversationData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/conversations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(conversationData),
      });
      if (!response.ok) throw new Error('Failed to create conversation');
      return await response.json();
    } catch (error) {
      console.error('Error creating conversation:', error);
      throw error;
    }
  },

  // Update conversation
  update: async (conversationId, conversationData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(conversationData),
      });
      if (!response.ok) throw new Error('Failed to update conversation');
      return await response.json();
    } catch (error) {
      console.error('Error updating conversation:', error);
      throw error;
    }
  },

  // Delete conversation
  delete: async (conversationId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete conversation');
      return await response.json();
    } catch (error) {
      console.error('Error deleting conversation:', error);
      throw error;
    }
  },
};

// Messages API
export const messagesAPI = {
  // Get messages for a conversation
  getByConversation: async (conversationId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      return await response.json();
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  // Send message
  send: async (conversationId, messageData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/conversations/${conversationId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(messageData),
      });
      if (!response.ok) throw new Error('Failed to send message');
      return await response.json();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },
};
