import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import ComparisonModal from './ComparisonModal';
import { Button } from '@mui/material';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../user/firebase-config';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [searchInput, setSearchInput] = useState('');
  const [filterCategory, setFilterCategory] = useState(null);
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [showModal, setShowModal] = useState(false);
  
  useEffect(() => {
    fetch('backend/db.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);
  
  // Logic to get current products for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const filteredProducts = products.filter(product => {
    // Apply search filter
    return product.name.toLowerCase().includes(searchInput.toLowerCase());
  }).filter(product => {
    // Apply category filter
    if (filterCategory) {
      return product.category === filterCategory;
    }
    return true; // If no category filter selected, show all products
  });
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Function to handle page navigation
  const paginate = pageNumber => setCurrentPage(pageNumber);

  // Function to handle search
  const handleSearch = () => {
    setCurrentPage(1); // Reset pagination to first page when search is triggered
  };
  
  const handleToggleSelection = productId => {
    if (selectedProductIds.includes(productId)) {
      setSelectedProductIds(prevIds => prevIds.filter(id => id !== productId));
    } else {
      setSelectedProductIds(prevIds => [...prevIds, productId]);
    }
  };

  const handleCompareProducts = () => {
    const selectedProducts = products.filter(product => selectedProductIds.includes(product.id));
    // Handle the action to compare selected products (e.g., open a comparison modal)
    console.log('Selected products:', selectedProducts);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProductIds([]); // Reset selected products when modal is closed
  };

  return (
    <>
      {/* Search Input */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
      </div>
      {/* Filter Dropdown */}
      <div className="filter-dropdowns">
        <select
          value={filterCategory || 'all'}
          onChange={e => setFilterCategory(e.target.value === 'all' ? null : e.target.value)}
        >
          <option value="all">All</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>
      {/* Product List */}
      <div className="product-list">
        {currentProducts.map(product => (
      <ProductCard key={product.id} product={product} isSelected={selectedProductIds.includes(product.id)} onSelect={handleToggleSelection} />
        ))}
        <Button variant="contained" onClick={handleCompareProducts} disabled={selectedProductIds.length < 2}>Compare Selected</Button>
        <ComparisonModal
          open={showModal}
          onClose={handleCloseModal}
          products={products.filter(product => selectedProductIds.includes(product.id))}
        />
      </div>
      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, i) => (
          <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
            <a href="#" className="page-link" onClick={() => paginate(i + 1)}>
              {i + 1}
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductList;