A fullstack web application called "Inventory App" using:

✅ *Frontend*: HTML, CSS, Bootstrap 5 (No React)  
✅ *Backend*: Node.js, Express.js, MongoDB (Mongoose), JWT Authentication

---

### 🎯 Features:

- Two user roles: admin and customer
- JWT-based login and registration
- Frontend: Simple Bootstrap HTML pages (no React)
- Admin panel to manage users and products
- Customer portal to browse and order products

---

### 📁 Project Structure:

- server/
  - models/User.js → User schema with hashed passwords
  - routes/auth.js → Login and register endpoints
  - middleware/auth.js → JWT auth + role middleware
  - server.js → Express server setup
- public/
  - login.html, register.html, home.html, admin.html
  - css/ → Custom styles
  - js/ → auth.js, login.js, register.js, home.js
  - Bootstrap 5 CDN included in HTML

---

### 🔐 Auth Endpoints:

- POST /api/auth/register → Register a new user (default role: customer)
- POST /api/auth/login → Authenticate and return a JWT
- Middleware to protect routes and validate role access

---

### 🧠 JWT Auth Flow:

1. Register/Login returns JWT
2. Store token in localStorage
3. On each protected page, check localStorage.token and validate with /api/me
4. If valid, show user-specific content

---

### ✨ Bonus (Optional):

- Responsive Bootstrap layout
- Navbar that shows “Login | Register” or “Welcome, Logout”
- Toasts for success/error messages
- Admin-only and customer-only pages
- Minimalistic modern UI (you can use my favorite color: [your color here])

---

### 🛠 .env Example:

PORT=5000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret

---
Please scaffold this project accordingly, with all backend and frontend files included.
