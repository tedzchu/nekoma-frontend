import React from 'react';
import AddRestockForm from '../../components/forms/restocks/AddRestockForm';
import ProductActivity from './ProductActivity';
import Header from '../../components/Header';
import Modal from '../../components/modal/Modal';
import useModal from '../../components/modal/useModal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useSubscription } from '@apollo/react-hooks';
import { PRODUCT_SUBSCRIPTION } from '../../components/queries';

const ProductSubscription = id => {
  const { data, loading, error } = useSubscription(PRODUCT_SUBSCRIPTION, {
    variables: { id: id }
  });

  if (loading) return 'Loading';
  if (error) return `Error: ${error.message}`;
  if (!data) return 'None found';

  // TODO: find a better way to return a single product from subscription
  return data.products[0];
};

const Product = ({ match }) => {
  // https://tylermcginnis.com/react-router-url-parameters/
  const product = ProductSubscription(match.params.id);
  const { isShowing, toggle } = useModal();

  const addRestockForm = <AddRestockForm hide={toggle} id={product.id} />;
  // LOL hack
  return product.sku ? (
    <div className="full-container">
      <Header title={product.sku} back="/products" />
      <Modal
        isShowing={isShowing}
        hide={toggle}
        title={'Add a new restock for ' + product.sku}
        content={addRestockForm}
      />
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
            <ProductActivity toggle={toggle} restocks={product.restocks} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Product;
