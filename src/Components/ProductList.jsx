// ProductList.js
import React from 'react';

const ProductList = ({ products, onAdd }) => {
  return (
    <div>
      <h3>Products</h3>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price.toFixed(2)}{' '}
            <button onClick={() => onAdd(product)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
