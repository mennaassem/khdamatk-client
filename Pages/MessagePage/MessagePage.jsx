 
import React, { useState } from "react";
import {
  Send,
  Search,
  MoreVertical,
  Phone,
  Video,
  Info,
  Smile,
  Paperclip,
  Mic,
} from "lucide-react";

export default function  MessagePage() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState({
    1: [
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
    ],
    2: [
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
    ],
    3: [
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
    ],
  });

  const chats = [
    {
      id: 1,
      name: "أحمد علي",
      lastMessage: "حوالي 3 إلى 4 أسابيع. هل هذا مناسب لك؟",
      time: "10:37",
      avatar: "🧑",
      unread: 0,
      online: true,
    },
    {
      id: 2,
      name: "منى حسن",
      lastMessage: "شكراً لاهتمامك! ما نوع المحتوى الذي تحتاجه؟",
      time: "09:20",
      avatar: "👩",
      unread: 2,
      online: false,
    },
    {
      id: 3,
      name: "علي محمود",
      lastMessage: "تطبيق إدارة المشاريع للفريق",
      time: "08:55",
      avatar: "🧑",
      unread: 1,
      online: true,
    },
    {
      id: 4,
      name: "سارة محمد",
      lastMessage: "شكراً على الاهتمام بالمشروع",
      time: "07:30",
      avatar: "👩",
      unread: 0,
      online: false,
    },
    {
      id: 5,
      name: "محمد أحمد",
      lastMessage: "هل انتهيت من التصميمات؟",
      time: "06:15",
      avatar: "🧑",
      unread: 0,
      online: true,
    },
  ];

  const currentChat = chats.find((c) => c.id === selectedChat);
  const currentMessages = messages[selectedChat] || [];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: currentMessages.length + 1,
        sender: "أنت",
        text: messageText,
        time: new Date().toLocaleTimeString("ar-EG", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        sent: true,
      };

      setMessages({
        ...messages,
        [selectedChat]: [...currentMessages, newMessage],
      });
      setMessageText("");
    }
  };

  return (
    <div dir="rtl" className="bg-white h-screen flex flex-col">
      {/* Main Chat Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Chat List */}
        <div className="w-80 border-l bg-gray-50 flex flex-col">
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="ابحث عن محادثة..."
                className="w-full pr-10 pl-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat.id)}
                className={`w-full px-4 py-3 border-b text-right transition flex items-center gap-3 ${
                  selectedChat === chat.id
                    ? "bg-purple-100 border-purple-300"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-2xl">
                    {chat.avatar}
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-gray-800">{chat.name}</h3>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage}
                  </p>
                </div>

                {chat.unread > 0 && (
                  <div className="w-5 h-5 bg-purple-700 text-white text-xs rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    {chat.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {currentChat ? (
            <>
              {/* Chat Header */}
              <div className="border-b bg-white px-6 py-4 flex items-center justify-between sticky top-0 z-40 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-xl">
                      {currentChat.avatar}
                    </div>
                    {currentChat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-800">
                      {currentChat.name}
                    </h2>
                    <p className="text-xs text-gray-500">
                      {currentChat.online ? "نشط الآن" : "غير متصل"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Phone size={18} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Video size={18} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Info size={18} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <MoreVertical size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50">
                {currentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.sent ? "justify-end" : "justify-start"}`}
                  >
                    {!msg.sent && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0 flex items-center justify-center text-sm">
                        {currentChat.avatar}
                      </div>
                    )}

                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sent
                          ? "bg-purple-700 text-white rounded-bl-none"
                          : "bg-white border border-gray-200 rounded-br-none"
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sent ? "text-purple-100" : "text-gray-500"
                        }`}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t bg-white px-6 py-4">
                <div className="flex gap-3 items-center">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Paperclip size={18} className="text-gray-600" />
                  </button>

                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && handleSendMessage()
                    }
                    placeholder="اكتب رسالتك..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />

                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Smile size={18} className="text-gray-600" />
                  </button>

                  <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                    <Mic size={18} className="text-gray-600" />
                  </button>

                  <button
                    onClick={handleSendMessage}
                    className="p-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500 text-lg">اختر محادثة لتبدأ</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

