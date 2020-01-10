import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ProductTable = props => (
  <table>
    <thead>
      <tr>
        <th>SKU</th>
        <th>Name</th>
        <th>Category</th>
        <th>Date Added</th>
        <th>Enabled</th>
        <th>Count</th>
        <th>Last Restock Date</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {props.products.length > 0 ? (
        props.products.map(product => (
          <tr key={product.id}>
            <td>{product.sku}</td>
            <td>{product.name}</td>
            <td>{product.category}</td>
            <td>{product.date}</td>
            <td>{product.enabled ? (
              <FontAwesomeIcon icon="check" />
              ) : (
              <FontAwesomeIcon icon="times" />
              )}
            </td>
            <td>{product.count}</td>
            <td>{product.restock}</td>
            <td>
              <button>Details</button>
              <button
                onClick={() => props.editRow(product)}
                className="button muted-button"
              >
                Edit
              </button>
              <button onClick={() => props.deleteProduct(product.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={8}>No products</td>
        </tr>
      )}
    </tbody>
  </table>
)

export default ProductTable