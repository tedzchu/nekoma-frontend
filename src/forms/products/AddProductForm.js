import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useMutation } from '@apollo/react-hooks';
import { ADD_PRODUCT } from '../../components/queries';

const AddProductForm = props => {
  const categories = props.categoryList;
  const today = new Date();
  const initialFormState = {
    id: null,
    sku: '',
    name: '',
    category: '',
    date: today.toLocaleDateString(),
    enabled: true,
    count: '',
    restock: ''
  };
  const [addProduct] = useMutation(ADD_PRODUCT);
  const [product, setProduct] = useState(initialFormState);
  const [date, setDate] = useState(today);

  const generateSKU = id => {
    const category = categories.find(cat => {
      return cat.id === id;
    });
    const skus = category.products.map(product => {
      return parseInt(product.sku.substring(4));
    });
    const skuNumber = skus.length > 0 ? Math.max(...skus) + 1 : 1;
    return category.sku_code.concat(skuNumber);
  };

  const handleInputChange = event => {
    const { name, value } = event.target;

    setProduct({ ...product, [name]: value });
  };

  const handleDateChange = date => {
    setDate(date);

    setProduct({ ...product, date: date.toLocaleDateString() });
  };

  return (
    <form
      autoComplete="off"
      onSubmit={event => {
        event.preventDefault();
        if (!product.name || !product.category || !product.count) return;
        product.sku = generateSKU(parseInt(product.category));
        product.restock = product.date;
        addProduct({
          variables: {
            name: product.name,
            sku: product.sku,
            count: parseInt(product.count),
            cat_id: parseInt(product.category),
            date_added: product.date,
            last_restock: product.restock
          }
        });
        setProduct(initialFormState);

        props.hide();
      }}
    >
      <div className="flex-row">
        <div className="flex-large">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
          />
          <label>Date Added</label>
          <DatePicker name="date" selected={date} onChange={handleDateChange} />
        </div>
        <div className="flex-large">
          <label>Category</label>
          <select
            name="category"
            value={product.category}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.sku_code} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label>Initial Count</label>
          <input
            type="number"
            name="count"
            value={product.count}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button>Save</button>
    </form>
  );
};

export default AddProductForm;
