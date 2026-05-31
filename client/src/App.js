import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Cart from './components/Cart';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Items from './pages/Items';
import ItemDetail from './pages/ItemDetail';
import Checkout from './pages/Checkout';
import Favorites from './pages/Favorites';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import AddItem from './pages/AddItem';
import EditItem from './pages/EditItem';
import './assets/styles/global.css';

function App() {
  return (
    <LanguageProvider>
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
            <Header />
            <Cart />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/items" element={<Items />} />
                <Route path="/items/:id" element={<ItemDetail />} />
                <Route path="/checkout" element={<Checkout />} />
                
                {/* Protected Routes */}
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/favorites" 
                  element={
                    <ProtectedRoute>
                      <Favorites />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Admin Routes */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <Admin />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/add-item" 
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <AddItem />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/admin/edit-item/:id" 
                  element={
                    <ProtectedRoute adminOnly={true}>
                      <EditItem />
                    </ProtectedRoute>
                  } 
                />
                
                {/* 404 route */}
                <Route 
                  path="*" 
                  element={
                    <div className="not-found">
                      <h1 style={{ color: 'var(--primary-color)' }}>404</h1>
                      <p>الصفحة غير موجودة / Page Not Found</p>
                    </div>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
