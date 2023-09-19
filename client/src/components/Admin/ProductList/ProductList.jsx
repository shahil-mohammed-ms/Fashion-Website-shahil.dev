import React from 'react'
import Header from '../Header';
import './ProductList.css'

function ProductList() {
  const dummyData = [
    {
      id: 1,
      image: 'product1.jpg',
      name: 'Product 1',
      category: 'Category A',
      quantityLeft: 10,
      quantitySold: 5,
      price: 19.99,
    },
    {
      id: 2,
      image: 'product2.jpg',
      name: 'Product 2',
      category: 'Category B',
      quantityLeft: 15,
      quantitySold: 8,
      price: 24.99,
    }, {
      id: 3,
      image: 'product1.jpg',
      name: 'Product 1',
      category: 'Category A',
      quantityLeft: 10,
      quantitySold: 5,
      price: 19.99,
    },
    {
      id: 4,
      image: 'product2.jpg',
      name: 'Product 2',
      category: 'Category B',
      quantityLeft: 15,
      quantitySold: 8,
      price: 24.99,
    },
    // Add more dummy data as needed
  ];

  return (
    <>
    <Header/>
   <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Quantity Left</th>
            <th>Quantity Sold</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.map((product) => (
            <tr key={product.id}>
              <td>
                <img src={product.image} alt={product.name} width="50" height="50" />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.quantityLeft}</td>
              <td>{product.quantitySold}</td>
              <td>${product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ProductList