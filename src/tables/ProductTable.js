import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useSubscription } from '@apollo/react-hooks';
import { TOGGLE_ACTIVE, PRODUCTS_SUBSCRIPTION } from '../components/queries';

const ProductTable = props => {
  const { data, loading, error } = useSubscription(PRODUCTS_SUBSCRIPTION);
  const [toggleActive] = useMutation(TOGGLE_ACTIVE);
  if (loading) return 'Loading';
  if (error) return `Error: ${error.message}`;
  return (
    <table>
      <thead>
        <tr>
          <th>SKU</th>
          <th>Name</th>
          <th>Date Added</th>
          <th>Enabled</th>
          <th>Count</th>
          <th>Last Restock Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {data.products.length > 0 ? (
          data.products.map(product => (
            <tr key={product.id}>
              <td>{product.sku}</td>
              <td>{product.name}</td>
              <td>{product.date_created}</td>
              <td>
                <FontAwesomeIcon
                  icon={product.enabled ? 'check' : 'times'}
                  onClick={() =>
                    toggleActive({
                      variables: { id: product.id, enabled: !product.enabled }
                    })
                  }
                />
              </td>
              <td>{product.count}</td>
              <td>{product.last_restock}</td>
              <td>
                <Link
                  to={{
                    pathname: `/products/${product.id}`,
                    state: {
                      product: data.products.find(product => product.id)
                    }
                  }}
                >
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
