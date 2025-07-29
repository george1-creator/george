// ManualProductEntry.js
import React, { useState } from 'react';

const ManualProductEntry = ({ onAddManual }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    if (!name || isNaN(price) || price <= 0 || quantity <= 0) {
      alert("Please enter valid name, price and quantity.");
      return;
    }

    const manualProduct = {
      id: Date.now(), // unique ID
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      isManual: true,
    };

    onAddManual(manualProduct);

    // Reset inputs
    setName('');
    setPrice('');
    setQuantity(1);
  };

  return (
    <div style={{ marginTop: '20px' }}>
      <h3>Add Custom Product</h3>
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        step="0.01"
        min="0"
      />
      <input
        type="number"
        placeholder="Qty"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        min="1"
      />
      <button onClick={handleAdd}>Add Custom Product</button>
    </div>
  );
};

export default ManualProductEntry;
