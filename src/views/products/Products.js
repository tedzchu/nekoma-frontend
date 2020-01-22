import React, { useState } from 'react';
import ProductTable from '../../tables/ProductTable';
import AddProductForm from '../../forms/products/AddProductForm';
import Header from '../../components/Header';
import Modal from '../../components/modal/Modal';
import useModal from '../../components/modal/useModal';
import EditProductForm from '../../forms/products/EditProductForm';
import { useSubscription, useMutation } from '@apollo/react-hooks';
import {
  CATEGORIES_SUBSCRIPTION,
  DELETE_PRODUCT
} from '../../components/queries';

const CategorySubscription = () => {
  const { data, loading, error } = useSubscription(CATEGORIES_SUBSCRIPTION);

  if (loading) return 'Loading';
  if (error) return `Error: ${error.message}`;
  if (!data) return 'None found';

  return data.categories;
};

const Products = () => {
  const categoriesData = CategorySubscription();
  const productsData = [];

  const [products, setProducts] = useState(productsData);
  const { isShowing, toggle } = useModal();

  const [deleteProduct] = useMutation(DELETE_PRODUCT);

  const [editing, setEditing] = useState(false);
  const initialFormState = { id: null, name: '', category: '' };
  const [currentProduct, setCurrentProduct] = useState(initialFormState);

  const editRow = product => {
    setEditing(true);
    toggle();
    setCurrentProduct({
      id: product.id,
      name: product.name,
      category: product.category
    });
  };

  const updateProduct = (id, updatedProduct) => {
    setEditing(false);
    toggle();
    setProducts(
      products.map(product => (product.id === id ? updatedProduct : product))
    );
  };

  const cancelUpdate = () => {
    setEditing(false);
    toggle();
  };

  const addProductForm = (
    <AddProductForm hide={toggle} categoryList={categoriesData} />
  );
  const editProductForm = (
    <EditProductForm
      editing={editing}
      cancelUpdate={cancelUpdate}
      currentProduct={currentProduct}
      updateProduct={updateProduct}
    />
  );

  return (
    <div className="full-container">
      <Header title="Products" back="/" />
      <Modal
        isShowing={isShowing}
        hide={toggle}
        title={editing ? 'Editing ' + currentProduct.name : 'Add a new product'}
        content={editing ? editProductForm : addProductForm}
      />
      <div className="container">
        <button onClick={toggle}>Add new product</button>
        <div className="flex-large">
          <ProductTable editRow={editRow} deleteProduct={deleteProduct} />
        </div>
      </div>
    </div>
  );
};

export default Products;
