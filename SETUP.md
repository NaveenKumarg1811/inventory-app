# 🚀 Inventory App - Complete Setup Guide

This guide will walk you through setting up the Inventory App from scratch to a fully functional application.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one option:
  - Local MongoDB - [Download here](https://www.mongodb.com/try/download/community)
  - MongoDB Atlas (cloud) - [Sign up here](https://www.mongodb.com/atlas)
- **Git** - [Download here](https://git-scm.com/)

## 🔧 Quick Setup (Recommended)

### Step 1: Clone and Install
```bash
# Clone the repository
git clone <your-repo-url>
cd inventory-app

# Install dependencies and seed database
npm run setup
```

### Step 2: Configure Environment
```bash
# Copy environment template
cp .env .env.local

# Edit .env with your settings
nano .env
```

### Step 3: Start the Application
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### Step 4: Access the Application
Open your browser and navigate to: `http://localhost:5000`

---

## 📖 Detailed Setup Instructions

### 1. Database Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB (macOS with Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Verify installation
mongosh
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster
4. Get your connection string
5. Update `.env` file with your Atlas URI

### 2. Environment Configuration

Create your `.env` file:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/inventory-app
# For Atlas: mongodb+srv://username:password@cluster.mongodb.net/inventory-app

# Security
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Optional: Email configuration (future feature)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Seed the Database
```bash
npm run seed
```

This creates:
- Admin user: `admin@demo.com` / `password123`
- Customer user: `customer@demo.com` / `password123`
- 15 sample products across different categories

### 5. Test the Setup
```bash
# Start the server
npm run dev

# In another terminal, run API tests
npm test
```

---

## 🧪 Testing the Application

### Manual Testing
1. **Landing Page**: Visit `http://localhost:5000`
2. **Login as Customer**: 
   - Email: `customer@demo.com`
   - Password: `password123`
   - Should redirect to customer dashboard
3. **Login as Admin**:
   - Email: `admin@demo.com`
   - Password: `password123`
   - Should redirect to admin panel

### Automated Testing
```bash
npm test
```

This runs comprehensive API tests including:
- User registration/login
- JWT authentication
- Product endpoints
- Admin-only access
- Role-based authorization

---

## 🌐 Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment

#### Heroku Deployment
```bash
# Install Heroku CLI
npm install -g heroku

# Login to Heroku
heroku login

# Create Heroku app
heroku create your-inventory-app

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGO_URI=your_production_mongodb_uri
heroku config:set JWT_SECRET=your_production_jwt_secret

# Deploy
git push heroku main

# Seed production database
heroku run npm run seed
```

#### Railway Deployment
1. Connect your GitHub repository to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

#### DigitalOcean App Platform
1. Create new app from GitHub repository
2. Configure environment variables
3. Set build and run commands:
   - Build: `npm install`
   - Run: `npm start`

---

## 🛠️ Development Workflow

### File Structure Overview
```
inventory-app/
├── server/              # Backend code
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Authentication & validation
│   ├── seed.js         # Database seeding
│   └── server.js       # Main server file
├── public/             # Frontend code
│   ├── css/           # Custom styles
│   ├── js/            # JavaScript utilities
│   └── *.html         # HTML pages
├── .env               # Environment variables
├── package.json       # Dependencies & scripts
└── README.md          # Documentation
```

### Common Development Tasks

#### Adding New Products (via Admin Panel)
1. Login as admin
2. Go to Admin Panel → Products
3. Click "Add Product"
4. Fill in product details
5. Save

#### Creating New Users
1. Register via registration page, or
2. Admin Panel → Users → Add User

#### Modifying Styles
- Edit `public/css/styles.css`
- Uses CSS custom properties for theming
- Bootstrap 5 classes available

#### Adding New API Endpoints
1. Create route in appropriate file (`server/routes/`)
2. Add authentication middleware if needed
3. Test with Postman or API test script

---

## 🐛 Troubleshooting

### Common Issues

#### "Cannot connect to MongoDB"
```bash
# Check if MongoDB is running
mongosh

# For local MongoDB, start the service
brew services start mongodb-community  # macOS
sudo systemctl start mongod            # Linux
net start MongoDB                      # Windows
```

#### "JWT malformed" errors
- Check if JWT_SECRET is set in `.env`
- Clear browser localStorage and login again

#### Port 5000 already in use
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change port in .env
PORT=3000
```

#### Dependencies issues
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Debug Mode
```bash
# Enable debug logging
DEBUG=* npm run dev

# MongoDB debug logging
MONGO_DEBUG=true npm run dev
```

---

## 📚 Additional Resources

### API Documentation
- **Authentication**: JWT-based with Bearer tokens
- **Base URL**: `http://localhost:5000/api`
- **Content-Type**: `application/json`

### Frontend Libraries Used
- **Bootstrap 5**: UI framework
- **Bootstrap Icons**: Icon library
- **Google Fonts**: Inter font family

### Backend Libraries Used
- **Express.js**: Web framework
- **Mongoose**: MongoDB ODM
- **bcryptjs**: Password hashing
- **jsonwebtoken**: JWT implementation
- **cors**: Cross-origin resource sharing

---

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Make changes and test
4. Commit: `git commit -m "Add new feature"`
5. Push: `git push origin feature/new-feature`
6. Create Pull Request

### Code Style
- Use ES6+ features
- Follow REST API conventions
- Comment complex logic
- Write descriptive commit messages

---

## 🆘 Getting Help

If you encounter issues:

1. **Check the logs**: Look at terminal output for error messages
2. **Verify environment**: Ensure `.env` file is configured correctly
3. **Test API**: Use `npm test` to verify backend functionality
4. **Check dependencies**: Run `npm install` to ensure all packages are installed
5. **MongoDB connection**: Verify database is running and accessible

For additional support, please open an issue in the repository with:
- Error message (if any)
- Steps to reproduce
- Environment details (OS, Node version, etc.)

---

**Happy coding! 🎉**