import React from "react";
import { useEventContext } from "../Context/EventContext";
import { Button } from "@/components/ui/Button";

// Define the Event interface to represent event data
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

const Export = () => {
  // Access events from the EventContext
  const { events } = useEventContext();

  // Function to export events as JSON
  const exportToJson = () => {
    if (!events) return; // Return if no events

    // Create a JSON string and encode it for download
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(events, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "events.json");

    // Trigger download and remove the temporary anchor element
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  // Function to export events as CSV
  const exportToCsv = () => {
    if (!events) return; // Return if no events

    // Define CSV headers
    const csvHeaders = "Name,Description,Start Time,End Time,Day,Month,ID,Importance\n";

    // Map events data to CSV rows
    const csvRows = events.map((ev: Event) =>
      [ev.name, ev.description, ev.startTime, ev.endTime, ev.day, ev.month, ev.id, ev.importance].join(",")
    );

    // Combine headers and rows, encode them for download
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(csvHeaders + csvRows.join("\n"));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", csvContent);
    downloadAnchor.setAttribute("download", "events.csv");

    // Trigger download and remove the temporary anchor element
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  return (
    <div>
      {/* Buttons for exporting data */}
      <div className="flex gap-4">
        {/* Button to export as JSON */}
        <Button
          onClick={exportToJson}
          className="text-white px-4 py-2 rounded"
        >
          Export to JSON
        </Button>

        {/* Button to export as CSV */}
        <Button
          onClick={exportToCsv}
          className="text-white px-4 py-2 rounded"
        >
          Export to CSV
        </Button>
      </div>
    </div>
  );
};

export default Export;
