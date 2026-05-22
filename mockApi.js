// Mock API Server for development
// This simulates backend API responses

export const mockConversations = {
  1: {
    id: 1,
    name: "أحمد علي",
    lastMessage: "حوالي 3 إلى 4 أسابيع. هل هذا مناسب لك؟",
    time: "10:37",
    avatar: "🧑",
    unread: 0,
    online: true,
    messages: [
      {
        id: 1,
        sender: "أحمد علي",
        text: "مرحبا، هل أنت متاح لمشروع تصميم واجهة؟",
        time: "10:30",
        sent: false,
      },
      {
        id: 2,
        sender: "أنت",
        text: "أهلا وسهلا! نعم أنا متاح. كم تتوقع مدة المشروع؟",
        time: "10:35",
        sent: true,
      },
      {
        id: 3,
        sender: "أحمد علي",
        text: "حوالي 3 إلى 4 أسابيع. هل هذا مناسب لك؟",
        time: "10:37",
        sent: false,
      },
    ]
  },
  2: {
    id: 2,
    name: "منى حسن",
    lastMessage: "شكراً لاهتمامك! ما نوع المحتوى الذي تحتاجه؟",
    time: "09:20",
    avatar: "👩",
    unread: 2,
    online: false,
    messages: [
      {
        id: 1,
        sender: "منى حسن",
        text: "أنا مهتمة بخدماتك في كتابة المحتوى",
        time: "09:15",
        sent: false,
      },
      {
        id: 2,
        sender: "أنت",
        text: "شكراً لاهتمامك! ما نوع المحتوى الذي تحتاجه؟",
        time: "09:20",
        sent: true,
      },
    ]
  },
  3: {
    id: 3,
    name: "علي محمود",
    lastMessage: "تطبيق إدارة المشاريع للفريق",
    time: "08:55",
    avatar: "🧑",
    unread: 1,
    online: true,
    messages: [
      {
        id: 1,
        sender: "علي محمود",
        text: "هل يمكنك مساعدتي في تطوير تطبيق؟",
        time: "08:45",
        sent: false,
      },
      {
        id: 2,
        sender: "أنت",
        text: "بكل تأكيد! أخبرني عن المتطلبات",
        time: "08:50",
        sent: true,
      },
      {
        id: 3,
        sender: "علي محمود",
        text: "تطبيق إدارة المشاريع للفريق",
        time: "08:55",
        sent: false,
      },
    ]
  }
};

// Mock API Handler
export const mockApiHandler = {
  // GET /api/conversations
  getConversations: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const conversations = Object.values(mockConversations).map(conv => ({
          id: conv.id,
          name: conv.name,
          lastMessage: conv.lastMessage,
          time: conv.time,
          avatar: conv.avatar,
          unread: conv.unread,
          online: conv.online,
        }));
        resolve({
          status: 'success',
          data: conversations,
          timestamp: new Date().toISOString(),
        });
      }, 300);
    });
  },

  // GET /api/conversations/{id}
  getConversationById: (conversationId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const conversation = mockConversations[conversationId];
        if (!conversation) {
          reject({
            status: 'error',
            message: `Conversation with ID ${conversationId} not found`,
            code: 'NOT_FOUND',
            statusCode: 404,
          });
        } else {
          resolve({
            status: 'success',
            data: conversation,
            timestamp: new Date().toISOString(),
          });
        }
      }, 300);
    });
  },

  // GET /api/conversations/{id}/messages
  getConversationMessages: (conversationId) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const conversation = mockConversations[conversationId];
        if (!conversation) {
          reject({
            status: 'error',
            message: `Conversation with ID ${conversationId} not found`,
            code: 'NOT_FOUND',
            statusCode: 404,
          });
        } else {
          resolve({
            status: 'success',
            data: {
              conversationId,
              messages: conversation.messages,
              count: conversation.messages.length,
            },
            timestamp: new Date().toISOString(),
          });
        }
      }, 300);
    });
  },

  // POST /api/conversations/{id}/messages
  sendMessage: (conversationId, messageData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const conversation = mockConversations[conversationId];
        if (!conversation) {
          reject({
            status: 'error',
            message: `Conversation with ID ${conversationId} not found`,
            code: 'NOT_FOUND',
            statusCode: 404,
          });
        } else {
          const newMessage = {
            id: conversation.messages.length + 1,
            sender: messageData.sender,
            text: messageData.text,
            time: new Date().toLocaleTimeString("ar-EG", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            sent: messageData.sent || true,
          };
          conversation.messages.push(newMessage);
          resolve({
            status: 'success',
            data: newMessage,
            timestamp: new Date().toISOString(),
          });
        }
      }, 300);
    });
  },
};
