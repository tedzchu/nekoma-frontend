import React from 'react';
import Graph from '../../components/Graph';
import TrendsTable from '../../components/tables/TrendsTable';

const ProductActivity = props => {
  return (
    <div className="full-container">
      <Graph />
      <button onClick={props.toggle}>Add new restock</button>
      <TrendsTable restocks={props.restocks} />
    </div>
  );
};

export default ProductActivity;
