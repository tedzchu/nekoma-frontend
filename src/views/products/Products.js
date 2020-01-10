import React, { useState } from 'react'
import ProductTable from '../../tables/ProductTable'
import Header from '../../components/Header'

const Products = () => {
  const productsData = [
    { id: 1, sku: 'sku-2', name: 'product', category: 'cat', date: 'january', enabled: true, count: 29, restock: '01/09/2020' },
    { id: 2, sku: 'sku-5', name: 'product2', category: 'keychain', date: 'february', enabled: false, count: 10, restock: '11/26/2019' },
    { id: 3, sku: 'sku-1', name: 'product3', category: 'poster', date: 'march', enabled: true, count: 43, restock: '01/09/2020' },
    { id: 4, sku: 'sku-4', name: 'product4', category: 'pin', date: 'april', enabled: true, count: 17, restock: '12/15/2019' },
    { id: 5, sku: 'sku-6', name: 'product5', category: 'cat', date: 'may', enabled: false, count: 3, restock: '10/31/2019' }
  ]

  const [products, setProducts] = useState(productsData)

  const deleteProduct = id => {
    setProducts(products.filter(product => product.id !== id))
  }

  return (
    <div className="full-container">
      <Header title="Products" back="/" />
      <div className="container">
        <button>Add new product</button>
        <div className="flex-large">
          <ProductTable products={products} deleteProduct={deleteProduct} />
        </div>
      </div>
    </div>
  )
}

export default Products