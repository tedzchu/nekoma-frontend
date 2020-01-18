import React, { useState } from 'react';
import ProductTable from '../../tables/ProductTable';
import AddProductForm from '../../forms/products/AddProductForm';
import Header from '../../components/Header';
import Modal from '../../components/modal/Modal';
import useModal from '../../components/modal/useModal';
import EditProductForm from '../../forms/products/EditProductForm';
import { useAuth0 } from '../../react-auth0-spa';
import { useQuery } from '@apollo/react-hooks';
import { CATEGORIES, PRODUCTS } from '../../components/queries';

const CategoryList = userId => {
  const { data, loading, error } = useQuery(CATEGORIES);

  if (loading) return 'Loading';
  if (error) return `Error: ${error.message}`;
  if (!data) return 'None found';

  console.log(data);
  return data.categories.map(category => <div>{category.name}</div>);
};

const Products = () => {
  const { user } = useAuth0();
  console.log(CategoryList(user.sub));
  const productsData = [
    {
      id: 1,
      sku: 'sku-2',
      name: 'product',
      category: 'cat',
      date: 'january',
      enabled: true,
      count: 29,
      restock: '01/09/2020'
    },
    {
      id: 2,
      sku: 'sku-5',
      name: 'product2',
      category: 'keychain',
      date: 'february',
      enabled: false,
      count: 10,
      restock: '11/26/2019'
    },
    {
      id: 3,
      sku: 'sku-1',
      name: 'product3',
      category: 'poster',
      date: 'march',
      enabled: true,
      count: 43,
      restock: '01/09/2020'
    },
    {
      id: 4,
      sku: 'sku-4',
      name: 'product4',
      category: 'pin',
      date: 'april',
      enabled: true,
      count: 17,
      restock: '12/15/2019'
    },
    {
      id: 5,
      sku: 'sku-6',
      name: 'product5',
      category: 'cat',
      date: 'may',
      enabled: false,
      count: 3,
      restock: '10/31/2019'
    }
  ];

  const [products, setProducts] = useState(productsData);
  const { isShowing, toggle } = useModal();

  const addProduct = product => {
    product.id = products.length + 1;
    setProducts([...products, product]);
  };

  const deleteProduct = id => {
    setProducts(products.filter(product => product.id !== id));
  };

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
    <AddProductForm addProduct={addProduct} hide={toggle} />
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
          <ProductTable
            products={products}
            editRow={editRow}
            deleteProduct={deleteProduct}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
