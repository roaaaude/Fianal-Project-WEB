# ShopEasy - E-commerce Platform by Roaa

A complete e-commerce web application built with React, Node.js, Express, and MongoDB. Founded in 2025 by Roaa, ShopEasy offers a simple, enjoyable, and accessible shopping experience for everyone.

## Project Description

ShopEasy allows users to browse, search, and purchase products across multiple categories. Users can register and log in to access additional features like saving favorite items, adding products to cart, and completing checkout. Admin users have additional capabilities to manage the product inventory.

The application includes:
- User authentication with JWT
- Role-based access control (regular users and admins)
- Product management with CRUD operations
- Shopping cart functionality
- Checkout process
- Contact form with validation
- Responsive design for all devices
- Search and filtering functionality
- Favorite item management
- Category-based product browsing

## Installation Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (local or Atlas)

### Setup Steps

1. Clone the repository:
```bash
git clone <repository-url>
cd roaa-final-project
```

2. Install dependencies for the entire project:
```bash
npm run install-all
```

This will install dependencies for:
- The root project
- The client (React frontend)
- The server (Node.js backend)

3. Set up environment variables:
- Create a `.env` file in the server directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/shopeasy
# For MongoDB Atlas use:
# MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/shopeasy
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

4. Run the development server:
```bash
npm run dev
```

This will start both the frontend (React) and backend (Node.js) concurrently.

- Frontend will run on: http://localhost:3000
- Backend will run on: http://localhost:5000

## Features

### User Authentication
- Registration with form validation
- Login with JWT authentication
- Protected routes based on authentication status

### User Roles
- Regular User: Can view products, search, filter, manage favorites, and place orders
- Admin User: Can perform all CRUD operations on products

### Product Management
- Browse product cards on the homepage
- View detailed product information on dedicated pages
- Search functionality to find specific products
- Filter products based on category, price, and other parameters
- Switch between different view modes (grid/list)

### Shopping Cart
- Add products to cart with quantity selection
- View cart contents
- Update quantities or remove items
- Persistent cart between sessions

### Checkout Process
- User information collection
- Shipping details
- Order summary
- Payment method selection

### Favorite Items
- Save products to favorites (authenticated users)
- View all favorite items on a dedicated page
- Remove items from favorites

### Contact System
- Contact form with validation
- Business information display
- Location information

### Admin Features
- Create new products
- Edit existing products
- Delete products
- Manage users

## Tech Stack

### Frontend
- React.js
- React Router for navigation
- Context API for state management
- Axios for API requests
- CSS for responsive design
- React Icons for iconography
- JWT for authentication

### Backend
- Node.js with Express.js
- MongoDB with Mongoose
- JWT for authentication
- Joi for validation
- Morgan for logging

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user
- GET /api/auth/profile - Get user profile

### Users
- GET /api/users - Get all users (admin only)
- GET /api/users/:id - Get a specific user
- PUT /api/users/:id - Update a user
- DELETE /api/users/:id - Delete a user (admin only)

### Products
- GET /api/items - Get all products
- GET /api/items/:id - Get a specific product
- GET /api/items?category=electronics - Get products by category
- POST /api/items - Create a new product (admin only)
- PUT /api/items/:id - Update a product (admin only)
- DELETE /api/items/:id - Delete a product (admin only)

### Favorites
- GET /api/favorites - Get user's favorite products
- POST /api/favorites/:itemId - Add a product to favorites
- DELETE /api/favorites/:itemId - Remove a product from favorites

### Orders (Coming Soon)
- GET /api/orders - Get user's orders
- POST /api/orders - Create a new order
- GET /api/orders/:id - Get a specific order

## Environment Setup

The `.env` file in the server directory contains sensitive configuration information:

- `PORT`: The port number for the backend server
- `MONGODB_URI`: The connection string for MongoDB
- `JWT_SECRET`: Secret key for JWT token generation
- `NODE_ENV`: Environment mode (development/production)

## Frontend-Backend Interaction

The frontend communicates with the backend through RESTful API endpoints using Axios.

- Authentication tokens are stored in localStorage
- Protected routes check for valid authentication
- API calls include authorization headers for authenticated requests
- Error handling provides feedback to users

## Directory Structure

```
roaa-final-project/
├── client/                   # Frontend React application
│   ├── public/               # Static files
│   └── src/                  # React source code
│       ├── assets/           # Images, styles, etc.
│       ├── components/       # Reusable components
│       ├── context/          # Context providers
│       ├── pages/            # Page components
│       └── services/         # API service functions
├── server/                   # Backend Node.js application
│   ├── src/                  # Server source code
│   │   ├── controllers/      # Route controllers
│   │   ├── middleware/       # Express middleware
│   │   ├── models/           # Mongoose models
│   │   └── routes/           # Express routes
│   └── .env                  # Environment variables
└── package.json              # Project configuration
```

## About the Developer

ShopEasy was founded in 2025 by Roaa, who personally oversees all aspects of the platform to ensure customers receive the best possible experience. From product selection to customer service, Roaa is committed to making online shopping easy and enjoyable for everyone.

## Contact Information

For any inquiries or assistance:
- Location: 123 Main Street, Ramat Gan, Israel
- Phone: 050-5551111
- Email: contact@shopeasy.com

## Development Notes

- Maintain code quality and organization
- Follow the established folder structure
- Document new features and API endpoints
- Test thoroughly before deployment 