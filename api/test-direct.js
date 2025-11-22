const http = require('http');

// Test login endpoint directly without validation middleware
const testDirectLogin = () => {
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
    console.log(`Direct Login Test - Status: ${res.statusCode}`);
    
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('Response:', data);
      process.exit(0);
    });
  });

  req.on('error', (e) => {
    console.error(`Direct Login Test Error: ${e.message}`);
    process.exit(1);
  });

  req.write(postData);
  req.end();
};

console.log('Testing direct login...');
testDirectLogin();