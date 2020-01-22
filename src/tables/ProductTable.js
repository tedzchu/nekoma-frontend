import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSubscription } from '@apollo/react-hooks';
import { PRODUCTS_SUBSCRIPTION } from '../components/queries';

const ProductTable = props => {
  const { data, loading, error } = useSubscription(PRODUCTS_SUBSCRIPTION);

  if (loading) return 'Loading';
  if (error) return `Error: ${error.message}`;
  return (
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
        {data.products ? (
          data.products.map(product => (
            <tr key={product.id}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.category.name}</td>
              <td>{product.date_created}</td>
              <td>
                {product.enabled ? (
                  <FontAwesomeIcon icon='check' />
                ) : (
                  <FontAwesomeIcon icon='times' />
                )}
              </td>
              <td>{product.count}</td>
              <td>{product.last_restock}</td>
              <td>
                <Link to={'/products/' + product.id}>
                  <button>Details</button>
                </Link>
                <button
                  onClick={() => props.editRow(product)}
                  className='button muted-button'
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    console.log(
                      props.deleteProduct({ variables: { id: product.id } })
                    )
                  }
                  className='button muted-button'
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
  );
};

export default ProductTable;
