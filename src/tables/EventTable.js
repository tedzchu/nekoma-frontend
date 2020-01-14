import React from "react";
import { Link } from "react-router-dom";

const EventTable = props => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Location</th>
        <th>Date</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {props.events.length > 0 ? (
        props.events.map(event => (
          <tr key={event.id}>
            <td>{event.name}</td>
            <td>{event.location}</td>
            <td>{event.date}</td>
            <td>
              <Link to={"/events/" + event.id}>
                <button>Sales</button>
              </Link>
              <button
                onClick={() => props.editRow(event)}
                className="button muted-button"
              >
                Edit
              </button>
              <button
                onClick={() => props.deleteEvent(event.id)}
                className="button muted-button"
              >
                Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4}>No events</td>
        </tr>
      )}
    </tbody>
  </table>
);

export default EventTable;
