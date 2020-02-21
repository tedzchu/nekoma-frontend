import React from 'react';

const TrendsTable = props => {
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Count</th>
        </tr>
      </thead>
      <tbody>
        {props.restocks.length > 0 ? (
          props.restocks.map(restock => (
            <tr key={restock.id}>
              <td>{restock.date}</td>
              <td>Restock</td>
              <td>{restock.count}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>No activity</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default TrendsTable;
