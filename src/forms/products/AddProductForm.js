import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

const AddProductForm = props => {
  const categories = [
    { name: 'Lily', sku: 'lil' },
    { name: 'Raphie', sku: 'rph' },
    { name: 'Tiny', sku: 'tny' }
  ];
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
  const [product, setProduct] = useState(initialFormState);
  const [date, setDate] = useState(today);

  const generateSKU = name => {
    return categories.find(cat => {
      return cat.name === name;
    }).sku;
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
        product.sku = generateSKU(product.category).concat('-#');
        product.restock = product.date;
        props.addProduct(product);
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
              <option key={category.sku} value={category.name}>
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
