import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

function ComparisonModal({ open, onClose, products }) {
  const findCheapestProduct = () => {
    if (products.length === 0) return null;

    let cheapestProduct = products[0];
    for (let i = 1; i < products.length; i++) {
      if (products[i].price < cheapestProduct.price) {
        cheapestProduct = products[i];
      }
    }

    return cheapestProduct;
  };

  const cheapestProduct = findCheapestProduct();
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Comparison</DialogTitle>
      <DialogContent dividers>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={product.image} alt={product.name} style={{ width: 100, height: 100, marginRight: 20 }} />
                <div>
                  <p>Price: ${product.price}</p>
                  <p>Description: {product.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {cheapestProduct && (
          <div>
            <h3>Suggestion:</h3>
            <p>{`Consider ${cheapestProduct.name} for the best value at $${cheapestProduct.price}`}</p>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ComparisonModal;