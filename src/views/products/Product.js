import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import { useLocation } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const Product = () => {
  const initialProductState = {
    product: {},
    loading: true
  };
  const location = useLocation();

  const [product, setProduct] = useState(initialProductState);

  useEffect(() => {
    const getProduct = async () => {
      const data = location.state.product;
      setProduct(data);
    };

    getProduct();
  }, [location.state.product]);

  return product.loading ? (
    <div>Loading...</div>
  ) : (
    <div className="full-container">
      <Header title={product.sku} back="/products" />
      <div className="container">
        <h2>Some data about {product.name}</h2>
        <Tabs>
          <TabList>
            <Tab>Info</Tab>
            <Tab>Trends</Tab>
          </TabList>
          <TabPanel>
            <h2>hello</h2>
          </TabPanel>
          <TabPanel>
            <h2>{product.count}</h2>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Product;
