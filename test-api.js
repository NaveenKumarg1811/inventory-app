const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

let authToken = '';
let userId = '';

const testAPI = async () => {
  try {
    console.log('🧪 Testing Inventory App API Endpoints\n');

    // Test 1: Register a new user
    console.log('1️⃣ Testing user registration...');
    try {
      const registerResponse = await axios.post(`${BASE_URL}/auth/register`, {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'customer'
      });
      
      authToken = registerResponse.data.token;
      userId = registerResponse.data.user.id;
      console.log('✅ Registration successful');
    } catch (error) {
      if (error.response?.data?.message === 'User already exists') {
        console.log('ℹ️ User already exists, trying login...');
        
        const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
          email: 'test@example.com',
          password: 'password123'
        });
        
        authToken = loginResponse.data.token;
        userId = loginResponse.data.user.id;
        console.log('✅ Login successful');
      } else {
        throw error;
      }
    }

    // Test 2: Test authentication
    console.log('\n2️⃣ Testing authentication...');
    const meResponse = await axios.get(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    console.log('✅ Authentication working');
    console.log(`   User: ${meResponse.data.user.name} (${meResponse.data.user.role})`);

    // Test 3: Get all products (public endpoint)
    console.log('\n3️⃣ Testing public product endpoint...');
    const productsResponse = await axios.get(`${BASE_URL}/products`);
    console.log('✅ Public products endpoint working');
    console.log(`   Found ${productsResponse.data.length} products`);

    // Test 4: Test admin login
    console.log('\n4️⃣ Testing admin login...');
    const adminLoginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'admin@demo.com',
      password: 'password123'
    });
    
    const adminToken = adminLoginResponse.data.token;
    console.log('✅ Admin login successful');

    // Test 5: Test admin-only endpoints
    console.log('\n5️⃣ Testing admin-only endpoints...');
    
    // Get all products (admin)
    const adminProductsResponse = await axios.get(`${BASE_URL}/products/admin/all`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('✅ Admin products endpoint working');
    console.log(`   Found ${adminProductsResponse.data.length} products (including inactive)`);

    // Get all users (admin)
    const usersResponse = await axios.get(`${BASE_URL}/users`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log('✅ Admin users endpoint working');
    console.log(`   Found ${usersResponse.data.length} users`);

    // Test 6: Test unauthorized access
    console.log('\n6️⃣ Testing unauthorized access...');
    try {
      await axios.get(`${BASE_URL}/users`, {
        headers: { Authorization: `Bearer ${authToken}` } // customer token
      });
      console.log('❌ Authorization failed - customer accessed admin endpoint');
    } catch (error) {
      if (error.response?.status === 403) {
        console.log('✅ Authorization working - customer blocked from admin endpoint');
      } else {
        throw error;
      }
    }

    console.log('\n🎉 All API tests passed successfully!');
    console.log('\n📊 Test Summary:');
    console.log('✅ User registration/login');
    console.log('✅ JWT authentication');
    console.log('✅ Public product access');
    console.log('✅ Admin authentication');
    console.log('✅ Admin-only endpoints');
    console.log('✅ Role-based authorization');

  } catch (error) {
    console.error('❌ API test failed:', error.response?.data || error.message);
    process.exit(1);
  }
};

// Check if server is running
const checkServer = async () => {
  try {
    await axios.get('http://localhost:5000');
    console.log('✅ Server is running on http://localhost:5000\n');
    return true;
  } catch (error) {
    console.log('❌ Server is not running. Please start the server first:');
    console.log('   npm run dev');
    return false;
  }
};

// Run tests
const runTests = async () => {
  const serverRunning = await checkServer();
  if (serverRunning) {
    await testAPI();
  }
};

runTests();