import React, { useEffect, useState } from "react";
import "./UpcomingEvents.css";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";
import { Link } from "react-router-dom";

const UpcomingEvents = () => {
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
  return (
    <div className="">
        <div className="text-center text-2xl p-2 bg-gray-100 font-bold text-pink-500">
            <Link to="/"> Home</Link>
        </div>
      <div className="sm:text-6xl xs:text-4xl text-3xl text-center p-2 font-bold text-violet-800">
        Upcoming Events
      </div>
      <div className="mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {events.map((event, index) => (
            <div className="flex flex-col sm:flex-row w-[70%] sm:w-[80%] h-[80%] sm:h-[90%] bg-gray-100 m-10 px-2 py-5 rounded-xl shadow-xl cursor-pointer hover:scale-105 transition duration-500" key={index}>
              <div className="sm:h-[90%] sm:w-[48%] h-[90%] w-[90%]">
                <img
                  src={event.img}
                  alt=""
                  className="sm:w-[80%] sm:h-[90%] h-[75%] w-[85%] mx-auto object-cover sm:rounded-lg rounded-md"
                />
              </div>
              <div className="flex flex-col ml-2 sm:ml-0">
                <div className="text-2xl sm:text-5xl font-semibold">{event.eventName}</div>
                <div className="sm:mt-4 text-gray-500 sm:text-2xl text-base font-normal">
                  Hosted by {event.hostName}
                </div>
                <div className=" font-semibold flex flex-col sm:mt-5 mr-2 ">
                  <div className="flex item-center text-sm sm:text-lg">
                    <HiOutlineCalendar
                      size={20}
                      color="#8456EC"
                      className="hidden sm:inline mr-2 mt-1"
                    />
                    from : {event.startDate} {event.startTime} AM <br />
                    to: {event.endDate} {event.endTime} PM
                  </div>
                </div>
                <div className="sm:text-lg text-sm font-semibold flex sm:items-center">
                  <HiOutlineLocationMarker
                    size={20}
                    color="#8456EC"
                    className="hidden sm:inline mr-2"
                  />{" "}
                  location: <span className="text-sm sm:text-lg ml-1 overflow-hidden">{event.location}</span> 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
