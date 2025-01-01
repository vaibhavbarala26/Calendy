import {  useEffect, useState } from "react";
import { MdEvent } from "react-icons/md";

import "../App.css";

// Define the Event interface to represent the event data structure
interface Event {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  day: string;
  month: string;
  id: string;
  importance: string;
}

import { useEventContext } from "@/Context/EventContext";

import Calendar from "./Table_data";
import Export from "./Export";

const Header = () => {
  // State to toggle the visibility of the calendar
  const [open, setOpen] = useState<boolean>(false);

  // Get events from the EventContext
  const { events } = useEventContext();
  console.log(events);

  // Retrieve individual event data from EventContext
  const { event } = useEventContext();

  // State to store event data
  const [data, setData] = useState<Event[] | null>([]);

  // Effect to update the data state whenever `event` changes
  useEffect(() => {
    setData(event);
  }, [event]);

  return (
    <div className="px-8 p-2 flex flex-col font-noto">
      {/* Header Section */}
      <div className="h-16 rounded-lg border-2 flex justify-between items-end px-2 py-2">
        {/* Application title */}
        <div>
          <span className="relative text-4xl text-black">Calendy</span>
        </div>

        {/* Export button and Calendar toggle icon */}
        <div className="flex flex-row items-center gap-2">
          {/* Export component */}
          <Export />

          {/* Calendar toggle icon */}
          <span
            className={`text-2xl cursor-pointer ${open ? "text-gray-300" : "text-gray-800"}`}
            onClick={() => setOpen(!open)}
          >
            <MdEvent />
          </span>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="flex justify-end">
        <div
          className={`fixed top-20 h-[50vh] overflow-y-scroll transition-all duration-700 ease-in-out ${
            open ? "right-8" : "-right-[500px]"
          } scrollbar-hide`}
        >
          {/* Calendar component */}
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default Header;
