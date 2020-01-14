import React, { useState } from "react";
import EventTable from "../../tables/EventTable";
import Header from "../../components/Header";

const Events = () => {
  const eventsData = [
    { id: 1, name: "a convention", location: "los angeles", date: "april" },
    {
      id: 2,
      name: "another convention",
      location: "sacramento",
      date: "february"
    },
    { id: 3, name: "convention", location: "fresno", date: "asdf" },
    { id: 4, name: "aon", location: "new york city", date: "date" },
    { id: 5, name: "convosid", location: "seattle", date: "02/31/2020" },
    { id: 6, name: "dallasconvention", location: "dallas", date: "9" },
    {
      id: 7,
      name: "RTX",
      location: "austin",
      date: "twelve twelve twentytwenty"
    },
    { id: 8, name: "zotzotzot", location: "irvine", date: "pog" },
    { id: 9, name: "AX", location: "los angeles", date: "sad" }
  ];

  const [events, setEvents] = useState(eventsData);

  const deleteEvent = id => {
    setEvents(events.filter(event => event.id !== id));
  };

  return (
    <div className="full-container">
      <Header title="Events" back="/" />
      <div className="container">
        <button>Add new event</button>
        <div className="flex-large">
          <EventTable events={events} deleteEvent={deleteEvent} />
        </div>
      </div>
    </div>
  );
};

export default Events;
