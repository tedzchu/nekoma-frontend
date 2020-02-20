import React, { useState, useEffect } from 'react';
import Graph from '../../components/Graph';

const ProductActivity = props => {
  return (
    <div class='full-container'>
      <Graph />
      <button onClick={props.toggle}>Add new restock</button>
    </div>
  );
};

export default ProductActivity;
