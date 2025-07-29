// BalancePopup.js
import React, { useState, useEffect } from 'react';
import './BalancePopup.css';

const BalancePopup = ({ isOpen, onClose, total, onConfirmSale }) => {
  const [amountPaid, setAmountPaid] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setAmountPaid('');
    }
  }, [isOpen]);

  if (!isOpen) return null; // ❗ This line ensures it's only shown when open === true

  const paid = parseFloat(amountPaid);
  const change = paid - total;
  const isSufficient = paid >= total;

  const handleConfirm = () => {
    onConfirmSale(paid, change);
    onClose();
  };

  return (
    <div className="popup-backdrop">
      <div className="popup">
        <h3>Complete Sale</h3>
        <p><strong>Total Due:</strong> ${total.toFixed(2)}</p>
        <input
          type="number"
          placeholder="Enter amount paid"
          value={amountPaid}
          onChange={(e) => setAmountPaid(e.target.value)}
        />
        {amountPaid && (
          <p>
            {isSufficient ? (
              <span style={{ color: 'green' }}>
                Change to give: ${change.toFixed(2)}
              </span>
            ) : (
              <span style={{ color: 'red' }}>
                Amount is short by ${Math.abs(change).toFixed(2)}
              </span>
            )}
          </p>
        )}
        <div style={{ marginTop: 10 }}>
          {isSufficient && (
            <button onClick={handleConfirm} style={{ marginRight: 10 }}>
              ✅ Confirm Sale
            </button>
          )}
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BalancePopup;
