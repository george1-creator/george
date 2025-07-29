// Receipt.js
import React, { useRef } from 'react';

const Receipt = ({ cart, total, amountPaid, change, onClose }) => {
  const printRef = useRef();

  const handlePrint = () => {
    const printContent = printRef.current;
    const win = window.open('', '', 'width=600,height=700');
    win.document.write('<html><head><title>Receipt</title></head><body>');
    win.document.write(printContent.innerHTML);
    win.document.write('</body></html>');
    win.document.close();
    win.print();
  };

  return (
    <div className="popup-backdrop">
      <div className="popup" style={{ width: '400px' }}>
        <div ref={printRef}>
          <h2 style={{ textAlign: 'center' }}>My Sales App</h2>
          <p style={{ textAlign: 'center' }}>{new Date().toLocaleString()}</p>
          <hr />
          <div>
            {cart.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>{item.name} x {item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <hr />
          <p><strong>Total:</strong> ${total.toFixed(2)}</p>
          <p><strong>Paid:</strong> ${amountPaid.toFixed(2)}</p>
          <p><strong>Change:</strong> ${change.toFixed(2)}</p>
          <hr />
          <p style={{ textAlign: 'center' }}>Thank you for your purchase!</p>
        </div>
        <div style={{ marginTop: 10 }}>
          <button onClick={handlePrint} style={{ marginRight: 10 }}>🖨️ Print Receipt</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
