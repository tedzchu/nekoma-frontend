import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { useQuery } from '@apollo/react-hooks';

const Product = props => {
  const initialProductState = {
    product: {},
    loading: true
  };

  const [product, setProduct] = useState(initialProductState);

  useEffect(() => {
    const getProduct = async () => {
      // probably await here eventually?
      // const { data } = await

      const data = { id: props.match.params.id };
      setProduct(data);
    };

    getProduct();
  }, []);

  return product.loading ? (
    <div>Loading...</div>
  ) : (
    <div className="full-container">
      <Header title={product.id} back="/products" />
      <div className="container">
        <h2>Some data about {product.id}</h2>
      </div>
    </div>
  );
};

export default Product;
