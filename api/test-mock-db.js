// Test mock database functionality
const { findUserByEmail, createUser } = require('./src/utils/mockDatabase');
const { hashPassword, comparePassword } = require('./src/utils/auth');

async function testMockDatabase() {
  console.log('Testing mock database...');
  
  // Test finding existing user
  console.log('\n1. Testing findUserByEmail:');
  const existingUser = findUserByEmail('aimi@example.com');
  console.log('Found user:', existingUser ? 'yes' : 'no');
  if (existingUser) {
    console.log('User email:', existingUser.email);
    console.log('User password hash exists:', !!existingUser.password_hash);
  }
  
  // Test password comparison
  console.log('\n2. Testing password comparison:');
  if (existingUser) {
    try {
      const isValid = await comparePassword('password', existingUser.password_hash);
      console.log('Password is valid:', isValid);
    } catch (error) {
      console.error('Error comparing password:', error);
    }
  }
  
  // Test creating new user
  console.log('\n3. Testing createUser:');
  try {
    const passwordHash = await hashPassword('test123');
    const newUser = createUser({
      username: 'testuser',
      email: 'test@example.com',
      password_hash: passwordHash,
    });
    console.log('Created new user:', newUser.id);
    
    // Test finding new user
    const foundNewUser = findUserByEmail('test@example.com');
    console.log('Found new user:', foundNewUser ? 'yes' : 'no');
  } catch (error) {
    console.error('Error creating user:', error);
  }
  
  console.log('\nMock database test completed!');
}

testMockDatabase();