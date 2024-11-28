import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TwitterShareButton } from 'react-share';
import { useCart } from './CartContext';
import RatingCard from './RatingCard';

function ProductDetails() {
  const [product, setProduct] = useState(null);
  const { productId } = useParams();
  const { addToCart, addToWishlist } = useCart();
  const history = useNavigate();
  const shareUrl = `https://04645fec-6460-458c-96a7-a9b882bada29-00-1w1zmsfljmaz0.kirk.replit.dev/explore/:productId`;
  
  useEffect(() => {
    fetch(`backend/db.json`) // Adjust URL to fetch specific product data
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        return response.json();
      })
      .then(data => {
        const selectedProduct = data.products.find(prod => prod.id === parseInt(productId));
        setProduct(selectedProduct);
      })
      .catch(error => console.error('Error fetching product:', error));
  }, [productId]);

  const handleAddToCart = () => {
    addToCart(product);
    // Redirect to CheckoutPage after adding to cart
    // You can use React Router for navigation
    history('/checkout');
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
  };

  if (!product) {
    return <div>Loading...</div>; // Add loading state while fetching data
  }

  return (
    <div className="product-details">
      <div className="product-image">
        <img style={{ marginTop: "15px" }} src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="product-description">{product.description}</p>
        <p className="product-price">${product.price}</p>
        <button className="add-to-cart-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
      <RatingCard title="Product Rating" description="Rate this product based on your experience" />
    </div>
  );
}

export default ProductDetails;