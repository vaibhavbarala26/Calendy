import React, { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Textarea } from '@/components/ui/textarea';
import { useEventContext } from '@/Context/EventContext';

// Define the Event interface with the importance field
interface Event {
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  day: string;
  month: string;
  id: string;
  importance: string; // Importance field added
}

interface EventDataProps {
  data: Event;
}

const EventData: React.FC<EventDataProps> = ({ data }) => {
  // State to manage edit mode
  const [edit, setEdit] = useState<boolean>(false);

  // Access context for editing and deleting events
  const { EditEvent, deleteEvent } = useEventContext();

  // State variables for event properties
  const [name, setName] = useState<string | null>(data.name);
  const [description, setDescription] = useState<string | null>(data.description);
  const [startTime, setStartTime] = useState<string | null>(data.startTime);
  const [endTime, setEndTime] = useState<string | null>(data.endTime);
  const [day, setDay] = useState<string | null>(data.day);
  const [month, setMonth] = useState<string | null>(data.month);
  const [id, setId] = useState<string | null>(data.id);
  const [importance, setImportance] = useState<string | null>(data.importance); // State for importance

  // Handle saving changes
  const handleSave = () => {
    setEdit(!edit); // Toggle edit mode
    EditEvent(day, month, startTime, endTime, id, name, description, importance); // Save changes
  };

  // Handle deleting the event
  const handleDelete = () => {
    deleteEvent(id); // Delete event using context function
  };

  return (
    <div className='mt-4 font'>

      {/* Event Container */}
      <div className='flex flex-col gap-2 p-4 justify-between rounded-lg shadow-lg'>

        {/* Date and Time Section */}
        <div className='flex flex-row gap-20'>

          {/* Date Section */}
          <div className='flex gap-2'>
            {!edit ? (
              <span className='font-bold'>{day} {month}</span>
            ) : (
              <>
                <input
                  type="text"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  placeholder="Day"
                  className='w-10'
                />
                <input
                  type="text"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="Month"
                  className='w-20'
                />
              </>
            )}
          </div>

          {/* Time Section */}
          <div className='flex flex-row items-center gap-1'>
            {edit ? (
              <>
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  placeholder="Start Time"
                />
                <FaLongArrowAltRight />
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  placeholder="End Time"
                />
              </>
            ) : (
              <>
                <span>{startTime}</span>
                <FaLongArrowAltRight />
                <span>{endTime}</span>
              </>
            )}
          </div>
        </div>

        {/* Event Name */}
        {edit ? (
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Event Name"
            className='w-24'
          />
        ) : (
          <span className='font-bold text-xl'>{name}</span>
        )}

        {/* Event Description */}
        {edit ? (
          <Textarea
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Event Description"
            className='w-56'
          />
        ) : (
          <span className='border p-2'>{description}</span>
        )}

        {/* Importance Section */}
        {edit ? (
          <input
            type='text'
            value={importance || ''}
            onChange={(e) => setImportance(e.target.value)}
            placeholder="Importance (e.g., High, Medium, Low)"
            className='w-24'
          />
        ) : (
          <span className='font-semibold'>{importance}</span>
        )}

        {/* Action Buttons */}
        <div className='flex flex-row my-4 gap-5'>
          <Button onClick={handleDelete}><MdDelete /></Button>
          <Button onClick={handleSave}>{edit ? 'Save' : 'Edit'}</Button>
        </div>
      </div>
    </div>
  );
};

export default EventData;
