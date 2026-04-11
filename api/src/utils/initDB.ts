import { sequelize } from './database';
import { User } from '../models';

export const initializeDatabase = async () => {
  try {
    // Test connection
    await sequelize.authenticate();
    console.log('✅ Database connection established.');

    // Sync all models
    await sequelize.sync({ force: false, alter: true });
    console.log('✅ All models synchronized.');

    // Create default admin user if not exists
    const adminUser = await User.findOne({ where: { email: 'admin@aiminote.com' } });
    
    if (!adminUser) {
      const bcrypt = await import('bcryptjs');
      const hashedPassword = await bcrypt.hash('admin123', 12);
      
      await User.create({
        username: 'aimi',
        email: 'admin@aiminote.com',
        password_hash: hashedPassword,
      });
      
      console.log('✅ Default admin user created.');
      console.log('   Username: aimi');
      console.log('   Email: admin@aiminote.com');
      console.log('   Password: admin123');
    }

    console.log('🎉 Database initialization completed!');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

// Run initialization if this file is executed directly
if (require.main === module) {
  initializeDatabase()
    .then(() => {
      console.log('Database setup completed successfully.');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Database setup failed:', error);
      process.exit(1);
    });
}
