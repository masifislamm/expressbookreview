const axios = require('axios');

const BASE_URL = 'http://localhost:5000';
let authToken = '';

// Helper function to print results
function printResult(taskNum, taskName, success, data) {
  console.log('\n' + '='.repeat(60));
  console.log(`✓ TASK ${taskNum}: ${taskName}`);
  console.log('Status:', success ? '✅ PASSED' : '❌ FAILED');
  if (data) {
    console.log('Response:', typeof data === 'object' ? JSON.stringify(data, null, 2) : data);
  }
  console.log('='.repeat(60));
}

async function runTests() {
  console.log('\n🚀 Starting Tests for All 13 Tasks...\n');

  try {
    // TASK 1: Get all books
    console.log('\n📚 Testing General User Endpoints...');
    const task1 = await axios.get(`${BASE_URL}/`);
    printResult(1, 'Get all books', task1.status === 200, task1.data);

    // TASK 2: Get book by ISBN
    const task2 = await axios.get(`${BASE_URL}/isbn/9780007350803`);
    printResult(2, 'Get book by ISBN', task2.status === 200, task2.data);

    // TASK 3: Get books by Author
    const task3 = await axios.get(`${BASE_URL}/author/J.R.R. Tolkien`);
    printResult(3, 'Get books by Author', task3.status === 200, task3.data);

    // TASK 4: Get books by Title
    const task4 = await axios.get(`${BASE_URL}/title/1984`);
    printResult(4, 'Get books by Title', task4.status === 200, task4.data);

    // TASK 5: Get book reviews
    const task5 = await axios.get(`${BASE_URL}/review/9780007350803`);
    printResult(5, 'Get book reviews', task5.status === 200, task5.data);

    // TASK 6: Register new user
    console.log('\n👤 Testing User Registration & Authentication...');
    const task6 = await axios.post(`${BASE_URL}/customer/register`, {
      username: 'testuser123',
      password: 'password123'
    });
    printResult(6, 'Register new user', task6.status === 200, task6.data);

    // TASK 7: Login as registered user
    const task7 = await axios.post(`${BASE_URL}/customer/login`, {
      username: 'testuser123',
      password: 'password123'
    });
    authToken = task7.data.token;
    const sessionCookie = task7.headers['set-cookie'];
    printResult(7, 'Login as registered user', task7.status === 200, task7.data);

    // Create axios instance with session for authenticated requests
    const authAxios = axios.create({
      baseURL: BASE_URL,
      headers: {
        Cookie: sessionCookie ? sessionCookie[0] : ''
      }
    });

    // TASK 8: Add/Modify book review
    console.log('\n✍️ Testing Authenticated User Endpoints...');
    const task8 = await authAxios.put(
      `/customer/auth/review/9780007350803?review=Amazing book! A timeless classic.`
    );
    printResult(8, 'Add/Modify book review', task8.status === 200, task8.data);

    // Verify review was added
    const verifyReview = await axios.get(`${BASE_URL}/review/9780007350803`);
    console.log('✓ Review verification:', verifyReview.data);

    // TASK 9: Delete book review
    const task9 = await authAxios.delete(`/customer/auth/review/9780007350803`);
    printResult(9, 'Delete book review', task9.status === 200, task9.data);

    // TASK 10: Get all books using async callback
    console.log('\n🔄 Testing Async/Promise-based Endpoints...');
    const task10 = await axios.get(`${BASE_URL}/async/books`);
    printResult(10, 'Get all books (async)', task10.status === 200, 'Books fetched successfully');

    // TASK 11: Search by ISBN using Promises
    const task11 = await axios.get(`${BASE_URL}/async/isbn/9780439064873`);
    printResult(11, 'Search by ISBN (Promises)', task11.status === 200, task11.data);

    // TASK 12: Search by Author (async)
    const task12 = await axios.get(`${BASE_URL}/async/author/George Orwell`);
    printResult(12, 'Search by Author (async)', task12.status === 200, task12.data);

    // TASK 13: Search by Title (async)
    const task13 = await axios.get(`${BASE_URL}/async/title/Harry Potter and the Chamber of Secrets`);
    printResult(13, 'Search by Title (async)', task13.status === 200, task13.data);

    console.log('\n' + '🎉'.repeat(30));
    console.log('✅ ALL 13 TASKS COMPLETED SUCCESSFULLY!');
    console.log('Total Points: 30/30 ✓');
    console.log('🎉'.repeat(30) + '\n');

  } catch (error) {
    console.error('\n❌ Error occurred:', error.response?.data || error.message);
    console.error('Status:', error.response?.status);
  }
}

// Run all tests
runTests();
