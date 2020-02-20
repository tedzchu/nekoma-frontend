import React, { useState, useEffect } from 'react';

const EditProductForm = props => {
  const categories = [
    { name: 'Lily', sku: 'lil' },
    { name: 'Raphie', sku: 'rph' },
    { name: 'Tiny', sku: 'tny' }
  ];
  const [product, setProduct] = useState(props.currentProduct);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setProduct({ ...product, [name]: value });
  };

  useEffect(() => {
    setProduct(props.currentProduct);
  }, [props]);

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        console.log(product);
        props.updateProduct(product.id, product);
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
        </div>
      </div>
      <button>Update product</button>
      <button
        onClick={() => props.cancelUpdate()}
        className="button muted-button"
      >
        Cancel
      </button>
    </form>
  );
};

export default EditProductForm;
