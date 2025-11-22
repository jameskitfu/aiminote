// Simple test script for API endpoints
const http = require('http');

// Test login endpoint
const testLogin = () => {
  const postData = JSON.stringify({
    email: 'aimi@example.com',
    password: 'password'
  });

  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    console.log(`Login Test - Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Response:', data);
      
      // Test articles endpoint
      testArticles();
    });
  });

  req.on('error', (e) => {
    console.error(`Login Test Error: ${e.message}`);
  });

  req.write(postData);
  req.end();
};

// Test articles endpoint
const testArticles = () => {
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/articles',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    console.log(`\nArticles Test - Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      try {
        const response = JSON.parse(data);
        console.log(`Found ${response.data.articles.length} articles`);
        if (response.data.articles.length > 0) {
          console.log('First article:', response.data.articles[0].title);
        }
      } catch (e) {
        console.log('Raw response:', data);
      }
    });
  });

  req.on('error', (e) => {
    console.error(`Articles Test Error: ${e.message}`);
  });

  req.end();
};

// Start tests
console.log('Starting API tests...');
testLogin();