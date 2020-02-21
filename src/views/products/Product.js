import React, { useState, useEffect } from 'react';
import AddRestockForm from '../../components/forms/restocks/AddRestockForm';
import ProductActivity from './ProductActivity';
import Header from '../../components/Header';
import Modal from '../../components/modal/Modal';
import useModal from '../../components/modal/useModal';
import { useLocation } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const Product = () => {
  const initialProductState = {
    product: {},
    loading: true
  };
  const location = useLocation();

  const [product, setProduct] = useState(initialProductState);
  const { isShowing, toggle } = useModal();

  useEffect(() => {
    const getProduct = async () => {
      const data = location.state.product;
      setProduct(data);
    };

    getProduct();
  }, [location.state.product]);

  const addRestockForm = <AddRestockForm hide={toggle} id={product.id} />;
  return product.loading ? (
    <div>Loading...</div>
  ) : (
    <div className='full-container'>
      <Header title={product.sku} back='/products' />
      <Modal
        isShowing={isShowing}
        hide={toggle}
        title={'Add a new restock for ' + product.sku}
        content={addRestockForm}
      />
      <div className='container'>
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
            <ProductActivity toggle={toggle} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default Product;
