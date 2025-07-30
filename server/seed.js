const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');
const Product = require('./models/Product');

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@demo.com',
      password: 'password123',
      role: 'admin'
    });
    await adminUser.save();

    // Create customer user
    const customerUser = new User({
      name: 'John Customer',
      email: 'customer@demo.com',
      password: 'password123',
      role: 'customer'
    });
    await customerUser.save();

    console.log('Created demo users');

    // Create sample products
    const sampleProducts = [
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
        price: 149.99,
        category: 'Electronics',
        quantity: 25,
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
      },
      {
        name: 'Gaming Mechanical Keyboard',
        description: 'RGB backlit mechanical keyboard with blue switches, perfect for gaming and typing. Durable aluminum frame.',
        price: 89.99,
        category: 'Electronics',
        quantity: 15,
        imageUrl: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=300&h=300&fit=crop'
      },
      {
        name: 'Smart Fitness Tracker',
        description: 'Track your health and fitness with heart rate monitoring, GPS, and 7-day battery life. Water resistant design.',
        price: 199.99,
        category: 'Health & Fitness',
        quantity: 30,
        imageUrl: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=300&h=300&fit=crop'
      },
      {
        name: 'Organic Coffee Beans - Premium Blend',
        description: 'Single-origin organic coffee beans with rich flavor notes. Freshly roasted and ethically sourced.',
        price: 24.99,
        category: 'Food & Beverage',
        quantity: 50,
        imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=300&h=300&fit=crop'
      },
      {
        name: 'Ergonomic Office Chair',
        description: 'Comfortable ergonomic office chair with lumbar support, adjustable height, and breathable mesh back.',
        price: 299.99,
        category: 'Furniture',
        quantity: 8,
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop'
      },
      {
        name: 'Portable Phone Charger',
        description: '10,000mAh portable battery pack with fast charging technology. Compatible with all devices.',
        price: 39.99,
        category: 'Electronics',
        quantity: 40,
        imageUrl: 'https://images.unsplash.com/photo-1609592909929-bfeab0d26e1d?w=300&h=300&fit=crop'
      },
      {
        name: 'Yoga Mat - Premium Quality',
        description: 'Non-slip yoga mat made from eco-friendly materials. Extra thick for comfort and stability.',
        price: 49.99,
        category: 'Health & Fitness',
        quantity: 20,
        imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop'
      },
      {
        name: 'Stainless Steel Water Bottle',
        description: 'Insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours.',
        price: 29.99,
        category: 'Health & Fitness',
        quantity: 35,
        imageUrl: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300&h=300&fit=crop'
      },
      {
        name: 'Desk Lamp - LED with USB Charging',
        description: 'Modern LED desk lamp with adjustable brightness, USB charging port, and touch controls.',
        price: 69.99,
        category: 'Furniture',
        quantity: 12,
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop'
      },
      {
        name: 'Wireless Mouse - Ergonomic Design',
        description: 'Comfortable wireless mouse with precision tracking and long battery life. Perfect for work and gaming.',
        price: 34.99,
        category: 'Electronics',
        quantity: 28,
        imageUrl: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop'
      },
      {
        name: 'Plant-Based Protein Powder',
        description: 'Organic plant-based protein powder with vanilla flavor. 25g protein per serving, vegan-friendly.',
        price: 44.99,
        category: 'Health & Fitness',
        quantity: 18,
        imageUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=300&h=300&fit=crop'
      },
      {
        name: 'Ceramic Coffee Mug Set',
        description: 'Set of 4 handcrafted ceramic coffee mugs with unique glazed finish. Microwave and dishwasher safe.',
        price: 39.99,
        category: 'Food & Beverage',
        quantity: 22,
        imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=300&h=300&fit=crop'
      },
      {
        name: 'Bluetooth Speaker - Waterproof',
        description: 'Compact waterproof Bluetooth speaker with 360-degree sound and 12-hour battery life.',
        price: 79.99,
        category: 'Electronics',
        quantity: 16,
        imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop'
      },
      {
        name: 'Reading Pillow with Arms',
        description: 'Comfortable reading pillow with supportive arms and pockets. Perfect for bed or couch reading.',
        price: 54.99,
        category: 'Furniture',
        quantity: 10,
        imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop'
      },
      {
        name: 'Green Tea Collection - Assorted',
        description: 'Premium green tea collection with 6 different flavors. Antioxidant-rich and naturally caffeinated.',
        price: 32.99,
        category: 'Food & Beverage',
        quantity: 25,
        imageUrl: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop'
      }
    ];

    await Product.insertMany(sampleProducts);
    console.log('Created sample products');

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log('- 2 demo users created (admin@demo.com, customer@demo.com)');
    console.log('- 15 sample products created across multiple categories');
    console.log('- Password for both demo accounts: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData();