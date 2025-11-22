const http = require('http');
const querystring = require('querystring');

// Test login endpoint with form data
const testLogin = () => {
  const postData = querystring.stringify({
    email: 'aimi@example.com',
    password: 'password'
  });

  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
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
    });
  });

  req.on('error', (e) => {
    console.error(`Login Test Error: ${e.message}`);
  });

  req.write(postData);
  req.end();
};

console.log('Testing login with form data...');
testLogin();