import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import ProductSearch from './ProductSearch';
import ProductList from './ProductList';
import CartItem from './CartItem';
import TotalAmount from './TotalAmount';
import BalancePopup from './BalancePopup';
import ManualProductEntry from './ManualProductEntry';
import Receipt from './Receipt';

const PRODUCTS = [
  { id: 1, name: 'Apple', price: 1.5, image: '' },
  { id: 2, name: 'Orange', price: 1.2, image: '' },
  { id: 3, name: 'Banana', price: 1.0, image: '' },
];

const SalesScreen = () => {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastSale, setLastSale] = useState(null);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const filteredProducts = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleQuantityChange = (id, qty) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: qty } : item))
    );
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleConfirmSale = (amountPaid, change) => {
    const saleData = {
      cart,
      total,
      amountPaid,
      change,
      timestamp: new Date(),
    };

    setLastSale(saleData);
    setShowReceipt(true);
    setCart([]);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', backgroundColor: 'lightgreen', fontStyle: 'italic' }}>
      <Sidebar />
      <div style={{ padding: '20px', flexGrow: 1 }}>
      <div style={{ position: 'top-right' }}>
  <h1>Mboka Doba</h1>
  <button onClick={handleLogout} className="logout-button">
    Logout
  </button>
</div>

        <ProductSearch onSearch={setSearch} />
        <ProductList products={filteredProducts} onAdd={handleAdd} />
        <ManualProductEntry onAddManual={handleAdd} />

        <h3>Cart</h3>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} onChange={handleQuantityChange} />
        ))}

        <TotalAmount cart={cart} />
        <button onClick={() => setPopupOpen(true)}>Checkout</button>

        <BalancePopup
          isOpen={popupOpen}
          onClose={() => setPopupOpen(false)}
          total={total}
          onConfirmSale={handleConfirmSale}
        />

        {showReceipt && lastSale && (
          <Receipt
            cart={lastSale.cart}
            total={lastSale.total}
            amountPaid={lastSale.amountPaid}
            change={lastSale.change}
            onClose={() => setShowReceipt(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SalesScreen;
