import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaFilter, FaTimes, FaStar, FaSort, FaSortAmountDown, FaSortAmountUp } from 'react-icons/fa';
import { getItems, getItemsByCategory } from '../services/itemService';
import { getFavorites, addFavorite, removeFavorite } from '../services/favoriteService';
import { useAuth } from '../context/AuthContext';
import ItemCard from '../components/ItemCard';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import '../assets/styles/items.css';

const Items = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Get search term from query params
  const searchParams = new URLSearchParams(location.search);
  const searchTermFromUrl = searchParams.get('search') || '';
  const categoryFromUrl = searchParams.get('category') || '';

  // Helper function to capitalize first letter
  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // State
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(searchTermFromUrl);
  const [filterOpen, setFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(9);
  
  // Filter and sort states
  const [filters, setFilters] = useState({
    category: categoryFromUrl,
    minPrice: '',
    maxPrice: '',
    minRating: 0,
  });
  
  const [sortOption, setSortOption] = useState('featured');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Categories for filter
  const categories = [
    'electronics', 'clothing', 'books', 'home', 
    'sports', 'other'
  ];

  // Use effect to handle URL params on component mount
  useEffect(() => {
    // Get query parameters
    const searchParams = new URLSearchParams(location.search);
    const searchFromUrl = searchParams.get('search') || '';
    const categoryFromUrl = searchParams.get('category') || '';
    
    console.log('URL params on mount:', { searchFromUrl, categoryFromUrl });
    
    // Set initial state from URL
    setSearchTerm(searchFromUrl);
    
    // Update filters if there's a category in the URL
    if (categoryFromUrl) {
      console.log(`Setting category filter to: ${categoryFromUrl}`);
      setFilters(prev => ({
        ...prev,
        category: categoryFromUrl
      }));
    }
    
    // Initial fetch will happen in the next useEffect when these state values change
  }, [location.search]);

  // Fetch items when search, filters, sort or pagination changes
  useEffect(() => {
    console.log('Fetching items with filters:', filters);
    fetchItems();
    
    // Update URL with search and category parameters
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (filters.category) params.set('category', filters.category);
    
    const newUrl = `${location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
    navigate(newUrl, { replace: true });
  }, [searchTerm, filters, sortOption, sortDirection, currentPage, location.pathname, navigate]);

  // Fetch user favorites if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [isAuthenticated]);

  // Fetch items from API
  const fetchItems = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Prepare query parameters
      const params = {
        page: currentPage,
        limit: itemsPerPage,
        sortBy: sortOption,
        order: sortDirection,
      };
      
      // Add search term if it exists
      if (searchTerm) {
        params.search = searchTerm;
      }
      
      // Add other filters (except category which is handled separately)
      if (filters.minPrice) params.minPrice = filters.minPrice;
      if (filters.maxPrice) params.maxPrice = filters.maxPrice;
      if (filters.minRating > 0) params.minRating = filters.minRating;
      
      let response;
      
      console.log('Category value:', filters.category);
      
      // Use dedicated category method if a category is specified
      if (filters.category) {
        console.log(`Fetching items for category: ${filters.category} with params:`, params);
        try {
          response = await getItemsByCategory(filters.category, params);
          console.log(`Category ${filters.category} response:`, response);
        } catch (err) {
          console.error(`Error fetching category ${filters.category}:`, err);
          throw err;
        }
      } else {
        console.log('Fetching all items with params:', params);
        response = await getItems(params);
      }
      
      console.log('API response:', response);
      
      if (response.data.success === false) {
        setError(response.data.message || 'Error fetching items');
        setItems([]);
        setTotalPages(1);
        return;
      }
      
      if (response.data.data) {
        console.log(`Received ${response.data.data.length} items`);
        setItems(response.data.data);
        setTotalPages(Math.ceil(response.data.totalPages || 1));
      } else {
        console.log('No items received in response');
        setItems([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error('Error fetching items:', err);
      setError('Failed to fetch items. Please try again later.');
      setItems([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user favorites
  const fetchFavorites = async () => {
    try {
      const response = await getFavorites();
      setFavorites(response.data.map(fav => fav.itemId));
    } catch (err) {
      console.error('Error fetching favorites:', err);
    }
  };

  // Handle favorite toggle
  const handleFavoriteToggle = async (itemId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      if (favorites.includes(itemId)) {
        await removeFavorite(itemId);
        setFavorites(favorites.filter(id => id !== itemId));
      } else {
        await addFavorite(itemId);
        setFavorites([...favorites, itemId]);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Handle rating filter click
  const handleRatingClick = (rating) => {
    setFilters({
      ...filters,
      minRating: filters.minRating === rating ? 0 : rating
    });
    setCurrentPage(1);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      category: '',
      minPrice: '',
      maxPrice: '',
      minRating: 0
    });
    setSearchTerm('');
    setSortOption('featured');
    setSortDirection('desc');
    setCurrentPage(1);
  };

  // Toggle sort direction
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Generate pagination
  const renderPagination = () => {
    const pages = [];
    
    // Previous button
    pages.push(
      <button 
        key="prev" 
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="pagination-btn"
      >
        Previous
      </button>
    );
    
    // Page numbers
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button 
          key={i} 
          onClick={() => setCurrentPage(i)}
          className={`pagination-btn ${currentPage === i ? 'active' : ''}`}
        >
          {i}
        </button>
      );
    }
    
    // Next button
    pages.push(
      <button 
        key="next" 
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="pagination-btn"
      >
        Next
      </button>
    );
    
    return pages;
  };

  return (
    <div className="container items-page">
      <div className="items-header">
        <h1 className="items-title">
          {filters.category ? capitalize(filters.category) : 'All Items'}
          {searchTerm && <span> matching "{searchTerm}"</span>}
        </h1>
        
        <div className="search-filter-container">
          <form className="items-search-form" onSubmit={handleSearchSubmit}>
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Search for items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">
                <FaSearch />
              </button>
            </div>
          </form>
          
          <button 
            className="filter-toggle-btn"
            onClick={() => setFilterOpen(!filterOpen)}
          >
            {filterOpen ? <FaTimes /> : <FaFilter />} 
            {filterOpen ? 'Close' : 'Filter'}
          </button>
        </div>
        
        {/* Filter panel */}
        {filterOpen && (
          <div className="filter-panel">
            <div className="filter-section">
              <h3>Categories</h3>
              <select 
                name="category" 
                value={filters.category} 
                onChange={handleFilterChange}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{capitalize(category)}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-section">
              <h3>Price Range</h3>
              <div className="price-range">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  value={filters.minPrice}
                  onChange={handleFilterChange}
                  className="price-input"
                  min="0"
                />
                <span>to</span>
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  value={filters.maxPrice}
                  onChange={handleFilterChange}
                  className="price-input"
                  min="0"
                />
              </div>
            </div>
            
            <div className="filter-section">
              <h3>Rating</h3>
              <div className="rating-filter">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div 
                    key={rating} 
                    className={`rating-option ${filters.minRating === rating ? 'active' : ''}`}
                    onClick={() => handleRatingClick(rating)}
                  >
                    {Array(rating).fill(0).map((_, i) => (
                      <FaStar key={i} className="star-icon" />
                    ))}
                    {Array(5 - rating).fill(0).map((_, i) => (
                      <FaStar key={i} className="star-icon empty" />
                    ))}
                    <span>& Up</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="filter-section">
              <h3>Sort By</h3>
              <div className="sort-container">
                <select 
                  value={sortOption} 
                  onChange={handleSortChange}
                  className="sort-select"
                >
                  <option value="featured">Featured</option>
                  <option value="price">Price</option>
                  <option value="rating">Rating</option>
                  <option value="newest">Newest</option>
                </select>
                
                <button 
                  className="sort-direction-btn"
                  onClick={toggleSortDirection}
                  title={sortDirection === 'asc' ? 'Ascending' : 'Descending'}
                >
                  {sortDirection === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                </button>
              </div>
            </div>
            
            <button className="reset-filters-btn" onClick={resetFilters}>
              Reset All Filters
            </button>
          </div>
        )}
      </div>
      
      {/* Error message */}
      {error && <Alert type="danger" message={error} dismissible={true} onClose={() => setError('')} />}
      
      {/* Loading spinner */}
      {loading ? (
        <Spinner size="large" text="Loading items..." />
      ) : (
        <div className="items-container">
          {!items || items.length === 0 ? (
            <div className="no-items-message">
              <h2>No items found</h2>
              <p>Try adjusting your search or filter criteria</p>
              <button className="reset-filters-btn" onClick={resetFilters}>
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="items-grid">
                {items.map(item => (
                  <ItemCard
                    key={item._id}
                    item={item}
                    isFavorite={favorites.includes(item._id)}
                    onFavoriteToggle={() => handleFavoriteToggle(item._id)}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="pagination">
                  {renderPagination()}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Items; 