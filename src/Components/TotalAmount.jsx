// TotalAmount.js
import React from 'react';

const TotalAmount = ({ cart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return <h2>Total: ${total.toFixed(2)}</h2>;
};

export default TotalAmount;
