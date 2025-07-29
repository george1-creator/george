// CartItem.js
import React from 'react';

const CartItem = ({ item, onChange }) => {
  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value) || 1;
    onChange(item.id, qty);
  };

  return (
    <div>
      {item.name} - ${item.price} x
      <input
        type="number"
        value={item.quantity}
        min={1}
        onChange={handleQuantityChange}
      /> = ${item.price * item.quantity}
      {item.isManual && <span style={{ color: 'orange' }}> (manual)</span>}

    </div>
  );
};

export default CartItem;
