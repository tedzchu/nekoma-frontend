import React, { useState, useEffect } from 'react'
import SalesTable from '../../tables/SalesTable'
import Header from '../../components/Header'

const Sales = props => {
  const eventId = props.match.params.id

  console.log('fetching ' + eventId)
  const initialEventSalesState = {
    eventSales: {},
    loading: true,
  }

  const salesData = [
    { id: 1, day: 2, items: [
      'sku-1',
      'sku-3',
    ], total: 20, cc: true, female: false },
  ]

  const [sales, setSales] = useState(initialEventSalesState)

  useEffect(() => {
    const getSales = async() => {
      // should have await function getting sales for id
      const data = salesData

      setSales(data)
    }
    getSales()
  }, [])

  const deleteSale = id => {
    setSales(sales.filter(sale => sale.id !== id))
  }

  return (
    <div className="full-container">
      <Header title={"Sales for event " + eventId} back="/Events" />
      <div className="container">
        <button>Add new sale</button>
        <div className="flex-large">
          {/* <SalesTable sales={sales} deleteSale={deleteSale} /> */}
        </div>
      </div>
    </div>
  )
}

export default Sales