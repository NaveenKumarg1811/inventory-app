# 📦 Inventory App - Modern Fullstack Inventory Management

A comprehensive inventory management application built with Node.js, Express, MongoDB, and Bootstrap 5. Features JWT authentication, role-based access control, and a responsive modern UI.

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication system
- Role-based access control (Admin & Customer)
- Secure password hashing with bcrypt
- Protected routes and middleware

### 👥 User Management
- Two user roles: **Admin** and **Customer**
- User registration and login
- Admin panel for user management
- Profile management

### 📋 Product Management
- Full CRUD operations for products
- Category-based organization
- Image support with URLs
- Stock quantity tracking
- Search and filter functionality

### 🎛️ Admin Panel
- Dashboard with statistics
- Product management interface
- User management system
- Analytics and reporting
- Real-time data updates

### 🛒 Customer Portal
- Browse product catalog
- Search and filter products
- Product detail views
- Responsive design
- Modern UI/UX

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inventory-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` with your configuration:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/inventory-app
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   
   # Or make sure your MongoDB Atlas connection is ready
   ```

5. **Run the application**
   ```bash
   # Development mode with auto-restart
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   ```
   http://localhost:5000
   ```

## 📁 Project Structure

```
inventory-app/
├── server/
│   ├── models/
│   │   ├── User.js          # User schema with authentication
│   │   └── Product.js       # Product schema for inventory
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── products.js      # Product management routes
│   │   └── users.js         # User management routes
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   └── server.js            # Express server configuration
├── public/
│   ├── css/
│   │   └── styles.css       # Custom styles
│   ├── js/
│   │   └── auth.js          # Frontend authentication utilities
│   ├── index.html           # Landing page
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   ├── home.html            # Customer dashboard
│   └── admin.html           # Admin panel
├── .env                     # Environment variables
├── package.json             # Dependencies and scripts
└── README.md               # Project documentation
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Products
- `GET /api/products` - Get all active products (public)
- `GET /api/products/:id` - Get product by ID (public)
- `GET /api/products/admin/all` - Get all products including inactive (admin only)
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

## 🎯 User Roles & Permissions

### 👤 Customer Role
- Browse product catalog
- Search and filter products
- View product details
- Access customer dashboard

### 🔧 Admin Role
- All customer permissions
- Access admin panel
- Manage products (CRUD operations)
- Manage users (CRUD operations)
- View analytics and statistics
- System administration

## 🎨 UI/UX Features

### Modern Design
- Bootstrap 5 framework
- Responsive layout for all devices
- Modern blue color scheme (`#3b82f6`)
- Clean and minimalistic interface

### Interactive Elements
- Toast notifications for user feedback
- Loading states and spinners
- Smooth animations and transitions
- Modal dialogs for forms

### Accessibility
- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader friendly

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling with custom variables
- **Bootstrap 5** - UI framework
- **Bootstrap Icons** - Icon library
- **Vanilla JavaScript** - Client-side logic
- **Google Fonts** - Typography (Inter)

## 🚀 Deployment

### Environment Setup
1. Set `NODE_ENV=production` in your `.env`
2. Update `MONGO_URI` to your production database
3. Generate a strong `JWT_SECRET`
4. Configure your web server to serve static files

### Recommended Platforms
- **Backend**: Heroku, Railway, DigitalOcean
- **Database**: MongoDB Atlas
- **Frontend**: Netlify, Vercel (if separated)

## 🧪 Demo Accounts

For testing purposes, you can create demo accounts:

**Admin Account:**
- Email: `admin@demo.com`
- Password: `password123`
- Role: Administrator

**Customer Account:**
- Email: `customer@demo.com`
- Password: `password123`
- Role: Customer

## 🔧 Development

### Available Scripts
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (placeholder)
```

### Adding New Features
1. Create new routes in appropriate files
2. Add corresponding frontend JavaScript
3. Update UI components as needed
4. Test thoroughly with different user roles

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
1. Check the documentation
2. Review the code comments
3. Open an issue on GitHub
4. Contact the development team

---

**Built with ❤️ using modern web technologies**