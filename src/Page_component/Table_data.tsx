import { useEventContext } from "@/Context/EventContext";
import React, { useEffect, useState } from "react";

// Define the Event interface for type safety
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

const DraggableEventTable = () => {
  const { events } = useEventContext(); // Get events from context
  const [event, setEvent] = useState<Event[] | null>([]); // Local state for events
  const [hoveredEventId, setHoveredEventId] = useState<string | null>(null); // Track hovered event

  // List of months for comparison with event months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Filter events for the current month when component mounts or events change
  useEffect(() => {
    const currentMonth = new Date().getMonth(); // Get the current month (0-based index)
    if (events) {
      const currentMonthEvents: Event[] = events.filter(
        (ev: Event) => ev.month === months[currentMonth]
      );
      setEvent(currentMonthEvents); // Update local state with filtered events
    }
  }, [events]);

  // Handle the start of a drag operation
  const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, eventId: string) => {
    e.dataTransfer.setData("text/plain", eventId); // Store event ID in the drag data
  };

  // Handle dropping a dragged event onto a target day
  const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, targetDay: string) => {
    const draggedEventId = e.dataTransfer.getData("text/plain"); // Retrieve event ID from drag data
    if (!draggedEventId) return;

    // Update the day of the dragged event in the local state
    const updatedEvents = (event || []).map((ev) => {
      if (ev.id === draggedEventId) {
        return { ...ev, day: targetDay };
      }
      return ev;
    });

    setEvent(updatedEvents); // Update local state with modified events
  };

  // Allow drop by preventing default behavior
  const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>) => {
    e.preventDefault();
  };

  // Generate an array of days (1 to 31) for the current month
  const daysInMonth = Array.from({ length: 31 }, (_, index) => (index + 1).toString());

  return (
    <div className="px-4 max-w-[300px] mx-auto bg-white shadow rounded-md">
      <h1 className="text-xl font-bold mb-4">Current Month's Events</h1>

      {/* Event Table */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th className="p-2 text-gray-700 font-medium">Day</th>
            <th className="p-2 text-gray-700 font-medium">Event Name</th>
          </tr>
        </thead>
        <tbody>
          {daysInMonth.map((day) => {
            // Find the event for the current day
            const eventForDay = (event || []).find((e) => e.day.toString() === day);

            return (
              <tr
                key={day}
                className="border-b hover:bg-gray-50 cursor-move"
                draggable={!!eventForDay} // Make rows draggable only if there is an event
                onDragStart={(e) => eventForDay && handleDragStart(e, eventForDay.id)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, day)}
                onMouseEnter={() => setHoveredEventId(eventForDay?.id || null)} // Set hovered event
                onMouseLeave={() => setHoveredEventId(null)} // Clear hovered event
              >
                <td className="p-2 text-center">{day}</td>
                <td
                  className={`p-2 ${
                    eventForDay?.importance === "personal"
                      ? "bg-green-500"
                      : eventForDay?.importance === "work"
                      ? "bg-red-500"
                      : eventForDay?.importance === "other"
                      ? "bg-blue-600"
                      : ""
                  } w-2/3`}
                >
                  {eventForDay ? eventForDay.name : "NA"}

                  {/* Show description on hover */}
                  {hoveredEventId === eventForDay?.id && eventForDay && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>{eventForDay.description}</p>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Instructional Note */}
      <p className="text-gray-500 text-sm mt-2">
        Drag and drop to reorder events. Days will adjust automatically.
      </p>
    </div>
  );
};

export default DraggableEventTable;
