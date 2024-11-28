import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

function ProductCard({ isSelected, onSelect, product }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1); // Initialize quantity state with 1
  const history = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    // Reset quantity to 1 after adding to cart
    setQuantity(1);
  };

  const handleViewDetails = () => {
    
    history(`/${product.id}`); // Navigate to product details page
  };

  const handleToggleSelection = () => {
    onSelect(product.id);
  };

  const Badge = ({ type }) => {
    return (
      <span className={`badge-new ${type.toLowerCase()}`}>{type}</span>
    );
  };

  const SaleBadge = ({ type }) => {
    return (
      <span className={`badge-sale ${type.toLowerCase()}`}>{type}</span>
    );
  };

  return (
    <div className={`product-card ${isSelected ? 'selected' : ''}`} onClick={handleToggleSelection}>
      <img src={product.image} alt={product.name} />
      <h4 onClick={handleViewDetails}>{product.name}{product.isNew && <Badge type="New" />}{product.isOnSale && <SaleBadge type="Sale" />}</h4>
      <p style={{ marginTop: '-15px' }}>Price: ${product.price}</p>
      <p>{product.description}</p>
      <div className="quantity-controls">
        <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>
          -
        </button>
        <input type="number" value={quantity} readOnly />
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default ProductCard;