// API Test Suite
// Test file to verify all API endpoints are working correctly

import { mockApiHandler } from './src/mockApi';

console.log('🧪 Starting API Tests...\n');

// Test 1: GET /api/conversations
const testGetConversations = async () => {
  console.log('📋 Test 1: GET /api/conversations');
  try {
    const result = await mockApiHandler.getConversations();
    console.log('✅ Status:', result.status);
    console.log('✅ Data:', result.data);
    console.log('✅ Timestamp:', result.timestamp);
    console.log('✅ Total conversations:', result.data.length);
    return true;
  } catch (error) {
    console.error('❌ Error:', error);
    return false;
  }
};

// Test 2: GET /api/conversations/{id}
const testGetConversationById = async (id = 1) => {
  console.log(`\n📋 Test 2: GET /api/conversations/${id}`);
  try {
    const result = await mockApiHandler.getConversationById(id);
    console.log('✅ Status:', result.status);
    console.log('✅ Conversation ID:', result.data.id);
    console.log('✅ Name:', result.data.name);
    console.log('✅ Online:', result.data.online);
    console.log('✅ Messages count:', result.data.messages.length);
    return true;
  } catch (error) {
    console.error('❌ Error:', error);
    return false;
  }
};

// Test 3: GET /api/conversations/{id}/messages
const testGetConversationMessages = async (id = 1) => {
  console.log(`\n📋 Test 3: GET /api/conversations/${id}/messages`);
  try {
    const result = await mockApiHandler.getConversationMessages(id);
    console.log('✅ Status:', result.status);
    console.log('✅ Conversation ID:', result.data.conversationId);
    console.log('✅ Messages count:', result.data.count);
    console.log('✅ Messages:', result.data.messages.map(m => ({
      id: m.id,
      sender: m.sender,
      text: m.text.substring(0, 50) + '...',
      sent: m.sent
    })));
    return true;
  } catch (error) {
    console.error('❌ Error:', error);
    return false;
  }
};

// Test 4: POST /api/conversations/{id}/messages
const testSendMessage = async (id = 1) => {
  console.log(`\n📋 Test 4: POST /api/conversations/${id}/messages`);
  try {
    const result = await mockApiHandler.sendMessage(id, {
      sender: 'أنت',
      text: 'هذه رسالة اختبار من API test suite',
      sent: true
    });
    console.log('✅ Status:', result.status);
    console.log('✅ Message ID:', result.data.id);
    console.log('✅ Sender:', result.data.sender);
    console.log('✅ Text:', result.data.text);
    console.log('✅ Sent:', result.data.sent);
    return true;
  } catch (error) {
    console.error('❌ Error:', error);
    return false;
  }
};

// Test 5: Error handling - Invalid ID
const testErrorHandling = async () => {
  console.log('\n📋 Test 5: Error Handling - Invalid Conversation ID');
  try {
    await mockApiHandler.getConversationById(999);
    console.error('❌ Should have thrown an error');
    return false;
  } catch (error) {
    console.log('✅ Correctly caught error');
    console.log('✅ Error status:', error.status);
    console.log('✅ Error message:', error.message);
    console.log('✅ Error code:', error.code);
    console.log('✅ HTTP Status Code:', error.statusCode);
    return true;
  }
};

// Run all tests
const runAllTests = async () => {
  const results = [];
  
  results.push(await testGetConversations());
  results.push(await testGetConversationById(1));
  results.push(await testGetConversationMessages(1));
  results.push(await testSendMessage(1));
  results.push(await testErrorHandling());

  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Summary:');
  console.log(`✅ Passed: ${results.filter(r => r).length}/${results.length}`);
  console.log(`❌ Failed: ${results.filter(r => !r).length}/${results.length}`);
  console.log('='.repeat(50));

  if (results.every(r => r)) {
    console.log('\n🎉 All tests passed! API is working correctly.');
  } else {
    console.log('\n⚠️ Some tests failed. Please check the errors above.');
  }
};

// Export for use in Node or browser
export { testGetConversations, testGetConversationById, testGetConversationMessages, testSendMessage, testErrorHandling, runAllTests };

// Auto-run if in Node environment
if (typeof window === 'undefined') {
  runAllTests().catch(console.error);
}
