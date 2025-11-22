const bcrypt = require('bcryptjs');

// Test the password hash from our mock data
const testPassword = async () => {
  const password = 'password';
  const hash = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
  
  console.log('Testing password comparison...');
  console.log('Password:', password);
  console.log('Hash:', hash);
  
  try {
    const isValid = await bcrypt.compare(password, hash);
    console.log('Password is valid:', isValid);
  } catch (error) {
    console.error('Error comparing password:', error);
  }
  
  // Test creating a new hash
  try {
    const newHash = await bcrypt.hash(password, 12);
    console.log('New hash:', newHash);
    const isNewValid = await bcrypt.compare(password, newHash);
    console.log('New password is valid:', isNewValid);
  } catch (error) {
    console.error('Error creating hash:', error);
  }
};

testPassword();