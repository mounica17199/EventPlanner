import React, { useEffect, useState } from "react";
import "./EventPage.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";

const EventPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getEvents = onSnapshot(
      collection(db, "events"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setEvents(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      getEvents();
    };
  }, []);

  if (events.length < 1) {
    return (
      <div className="text-center mt-[30%] text-3xl text-gray-400">
        Sorry, nothing was found.
        <br />
        Add an event now.
        <br />
        <Link to="/create-event">
          <button
            type="submit"
            className="mt-5 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 text-xl font-semibold  rounded-md"
          >
            Add event
          </button>
        </Link>
      </div>
    );
  } else {
    return(
      <div className="Event-Section">
        <div className="left">
          <div className="event-text">
            <div className="event-heading">{events[0].eventName}</div>
            <div className="event-host-name">hosted by {events[0].hostName}</div>
            <div className="event-date">
              <div className="date">
                <div className="event-date-icon">
                  <HiOutlineCalendar size={32} color="#8456EC" />
                </div>
                <div className="event-date-time">
                  <div className="date-from">
                    {events[0].startDate} {events[0].startTime}
                  </div>
                  <div className="date-to">
                    {events[0].endDate} {events[0].endTime}
                  </div>
                </div>
              </div>
            </div>
            <div className="event-location">
              <div className="location">
                <div className="event-location-icon">
                  <HiOutlineLocationMarker size={32} color="#8456EC" />
                </div>
                <div className="event-location-address">
                  <div className="street-address">{events[0].location}</div>
                  <div className="address-code">{events[0].pincode}</div>
                </div>
              </div>
            </div>
          </div>
          <img src={events[0].img} alt="" className="right" />
        </div>
        <Link to="/" className="">
          <div className="px-5 py-3 hidden sm:flex justify-center bg-purple-500 text-white text-center font-medium text-xl">Go back to Home</div>
        </Link>
        <Link to="/upcoming-events">
          <div className="px-5 py-3 hidden sm:flex justify-center bg-purple-500 text-white text-center font-medium text-xl">See Upcoming Events</div>
        </Link>
      </div>
    );
  };
};

export default EventPage;