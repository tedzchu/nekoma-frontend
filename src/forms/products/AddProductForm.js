import React, { useState } from 'react'

const AddProductForm = props => {
  const initialFormState = { id: null, sku: '', name: '', category: '', date: '', enabled: true, restock: '' }
  const [product, setProduct] = useState(initialFormState)

  const handleInputChange = event => {
    console.log(event)
    const { name, value } = event.target

    setProduct({ ...product, [name]: value })
  }

  return (
    <form
      onSubmit={event => {
        event.preventDefault()
        if (!product.sku || !product.name) return

        props.addProduct(product)
        setProduct(initialFormState)
      }}
    >
      <label>SKU</label>
      <input type="text" name="sku" value={product.name} onChange={handleInputChange} />
      <label>Name</label>
      <input type="text" name="name" value={product.name} onChange={handleInputChange} />
      <label>Category</label>
      <input type="text" name="category" value={product.category} onChange={handleInputChange} />
      <label>Date Added</label>
      <input type="text" name="date" value={product.date} onChange={handleInputChange} />
      <label>Cycled In</label>
      <input type="text" name="enabled" value={product.enabled} onChange={handleInputChange} />
      <label>Last Restock</label>
      <input type="text" name="restock" value={product.restock} onChange={handleInputChange} />
      <button>Add new product</button>
    </form>
  )
}

export default AddProductForm