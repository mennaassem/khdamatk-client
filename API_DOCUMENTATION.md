# 📚 API Documentation - Khadma Hub

## 📌 نظرة عامة

هذا المستند يوضح جميع endpoints التي توفرها Khadma Hub API للتعامل مع المحادثات والرسائل.

## 🔧 Base URL

```
http://localhost:3001/api
```

## 📋 Endpoints

### 1️⃣ **الحصول على جميع المحادثات**

```
GET /api/conversations
```

**الوصف:** الحصول على قائمة بجميع المحادثات

**الاستجابة الناجحة (200):**
```json
{
  "status": "success",
  "data": [
    {
      "id": 1,
      "name": "أحمد علي",
      "lastMessage": "حوالي 3 إلى 4 أسابيع",
      "time": "10:37",
      "avatar": "🧑",
      "unread": 0,
      "online": true
    }
  ],
  "timestamp": "2026-05-15T10:37:00.000Z"
}
```

---

### 2️⃣ **الحصول على محادثة محددة**

```
GET /api/conversations/{conversationId}
```

**المعاملات:**
- `conversationId` (required): معرف المحادثة

**الوصف:** الحصول على تفاصيل محادثة محددة بما فيها الرسائل

**مثال على الطلب:**
```
GET /api/conversations/1
```

**الاستجابة الناجحة (200):**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "أحمد علي",
    "lastMessage": "حوالي 3 إلى 4 أسابيع",
    "time": "10:37",
    "avatar": "🧑",
    "unread": 0,
    "online": true,
    "messages": [
      {
        "id": 1,
        "sender": "أحمد علي",
        "text": "مرحبا، هل أنت متاح؟",
        "time": "10:30",
        "sent": false
      }
    ]
  },
  "timestamp": "2026-05-15T10:37:00.000Z"
}
```

**الاستجابة عند الفشل (404):**
```json
{
  "status": "error",
  "message": "Conversation with ID 999 not found",
  "code": "NOT_FOUND",
  "statusCode": 404
}
```

---

### 3️⃣ **الحصول على رسائل محادثة**

```
GET /api/conversations/{conversationId}/messages
```

**المعاملات:**
- `conversationId` (required): معرف المحادثة

**الوصف:** الحصول على جميع الرسائل في محادثة محددة

**مثال على الطلب:**
```
GET /api/conversations/1/messages
```

**الاستجابة الناجحة (200):**
```json
{
  "status": "success",
  "data": {
    "conversationId": 1,
    "messages": [
      {
        "id": 1,
        "sender": "أحمد علي",
        "text": "مرحبا، هل أنت متاح؟",
        "time": "10:30",
        "sent": false
      },
      {
        "id": 2,
        "sender": "أنت",
        "text": "نعم أنا متاح",
        "time": "10:35",
        "sent": true
      }
    ],
    "count": 2
  },
  "timestamp": "2026-05-15T10:37:00.000Z"
}
```

---

### 4️⃣ **إرسال رسالة**

```
POST /api/conversations/{conversationId}/messages
```

**المعاملات:**
- `conversationId` (required): معرف المحادثة

**متن الطلب:**
```json
{
  "sender": "أنت",
  "text": "رسالة جديدة",
  "sent": true
}
```

**مثال على الطلب:**
```bash
curl -X POST http://localhost:3001/api/conversations/1/messages \
  -H "Content-Type: application/json" \
  -d '{
    "sender": "أنت",
    "text": "كيف حالك؟",
    "sent": true
  }'
```

**الاستجابة الناجحة (201):**
```json
{
  "status": "success",
  "data": {
    "id": 4,
    "sender": "أنت",
    "text": "كيف حالك؟",
    "time": "10:40",
    "sent": true
  },
  "timestamp": "2026-05-15T10:40:00.000Z"
}
```

---

## 🧪 اختبار الـ API

### في المتصفح (Developer Console):

```javascript
// Test 1: جميع المحادثات
fetch('http://localhost:3001/api/conversations')
  .then(res => res.json())
  .then(data => console.log('✅ Success:', data))
  .catch(err => console.error('❌ Error:', err));

// Test 2: محادثة محددة
fetch('http://localhost:3001/api/conversations/1')
  .then(res => res.json())
  .then(data => console.log('✅ Success:', data))
  .catch(err => console.error('❌ Error:', err));

// Test 3: الرسائل
fetch('http://localhost:3001/api/conversations/1/messages')
  .then(res => res.json())
  .then(data => console.log('✅ Success:', data))
  .catch(err => console.error('❌ Error:', err));

// Test 4: إرسال رسالة
fetch('http://localhost:3001/api/conversations/1/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    sender: 'أنت',
    text: 'رسالة اختبار',
    sent: true
  })
})
  .then(res => res.json())
  .then(data => console.log('✅ Success:', data))
  .catch(err => console.error('❌ Error:', err));
```

---

## 📝 رموز الأخطاء

| الرمز | الوصف |
|------|-------|
| `NOT_FOUND` | المحادثة أو الرسالة غير موجودة |
| `VALIDATION_ERROR` | خطأ في البيانات المرسلة |
| `UNAUTHORIZED` | عدم التفويض |
| `SERVER_ERROR` | خطأ في الخادم |

---

## ⏱️ أوقات الاستجابة

جميع الـ endpoints تستغرق حوالي **300ms** للاستجابة (محاكاة)

---

## 🔒 الأمان

- جميع الطلبات يجب أن تكون عبر HTTPS في الإنتاج
- يجب التحقق من البيانات المرسلة
- استخدم authentication tokens في الإنتاج

---

## 📞 الدعم والتطوير

للمزيد من المعلومات أو للإبلاغ عن مشاكل، يرجى الاتصال بفريق التطوير.

---

**آخر تحديث:** 2026-05-15
