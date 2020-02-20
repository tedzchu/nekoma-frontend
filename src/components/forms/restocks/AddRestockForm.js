import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useMutation } from '@apollo/react-hooks';
import { ADD_RESTOCK } from '../../queries';

const AddRestockForm = props => {
  const today = new Date();
  const initialFormState = {
    id: null,
    sku: '',
    date: today.toLocaleDateString(),
    count: ''
  };
  const [addRestock] = useMutation(ADD_RESTOCK);
  const [restock, setRestock] = useState(initialFormState);
  const [date, setDate] = useState(today);

  const handleInputChange = event => {
    const { name, value } = event.target;

    setRestock({ ...restock, [name]: value });
  };

  const handleDateChange = date => {
    setDate(date);

    setRestock({ ...restock, date: date.toLocaleDateString() });
  };

  return (
    <form
      autoComplete='off'
      onSubmit={event => {
        event.preventDefault();
        if (!restock.count) return;
        restock.sku = props.sku;
        addRestock({
          variables: {
            sku: restock.sku,
            count: parseInt(restock.count),
            date: restock.date
          }
        });
        setRestock(initialFormState);

        props.hide();
      }}
    >
      <div className='flex-row'>
        <div className='flex-large'>
          <label>Count</label>
          <input
            type='number'
            name='count'
            value={restock.count}
            onChange={handleInputChange}
          />
        </div>
        <div className='flex-large'>
          <label>Date Restocked</label>
          <DatePicker name='date' selected={date} onChange={handleDateChange} />
        </div>
      </div>
      <button>Save</button>
    </form>
  );
};

export default AddRestockForm;
