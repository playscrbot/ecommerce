import React, { useState } from 'react';
import { useCart } from './CartContext';
import { FaTrash } from 'react-icons/fa';
import StripeCheckout from "react-stripe-checkout";

function Checkout() {
  const { cart, removeFromCart } = useCart();
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const handleDelete = (productId) => {
    removeFromCart(productId);
  };

  const makePayment = (token) => {
    setPaymentProcessing(true);

    const cartTotal = cart.reduce((acc, product) => acc + product.price, 0);

    const body = {
      token,
      product: {
        name: "Cart Items",
        price: cartTotal,
        currency: "USD",
      }
    };

    const headers = {
      "Content-Type": "application/json"
    };

    fetch(`http://localhost:3000/explore/checkout/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body)
    })
      .then(response => {
        console.log("RESPONSE ", response);
        const { status } = response;
        console.log("STATUS ", status);
        setPaymentProcessing(false);
      })
      .catch(error => {
        console.log(error);
        setPaymentProcessing(false);
      });
  };

  return (
    <div className="checkout-page">
      <h2 style={{ textAlign: 'center' }}>Checkout</h2>
      <div className="cart-items">
        {cart.map(product => (
          <div key={product.id} className="cart-item">
            <p>{product.name}</p>
            <p style={{ marginRight: "-5px" }}>${product.price}<FaTrash onClick={() => handleDelete(product.id)} style={{ cursor: "pointer", marginLeft: "5px", marginRight: "5px" }} /></p>
          </div>
        ))}
      </div>
      <p>Total: ${cart.reduce((acc, product) => acc + product.price, 0).toFixed(2)}</p>
      <StripeCheckout
        stripeKey="pk_live_51MScStSG8tZRDFOL9ZHZVqpgw2Ov8C7falfvA8dIaJSUXmwo2SbwmY77hLgOoVxXglNJcb5SNyGCezQvHMM3Zsga003jgj9gnI"
        token={makePayment}
        name="Buy Cart Items"
        amount={cart.reduce((acc, product) => acc + product.price, 0) * 100}
        shippingAddress
        billingAddress
        disabled={paymentProcessing}
      >
        <button className="pay-button" disabled={paymentProcessing}>
          {paymentProcessing ? 'Processing Payment...' : `Pay using Card ($${cart.reduce((acc, product) => acc + product.price, 0).toFixed(2)})`}
        </button>
      </StripeCheckout>
      <p style={{ fontFamily: "Poppins, sans-serif", fontSize: "16px", textAlign: "center", marginTop: "15px" }}>------- Or Pay Another Way -------</p>
      <img src="/QrCode.png" style={{ maxWidth: "100%" }}></img>
    </div>
  );
}

export default Checkout;