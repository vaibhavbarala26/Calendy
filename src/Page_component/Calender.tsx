import { useEffect, useState } from 'react';
import Input_Card from './Input_Card';

// Helper function to generate days of the month
const generateDays = (year: number, month: number): { firstDay: number, lastDate: number, days: number[] } => {
  const date = new Date(year, month, 1);
  const days: number[] = [];

  // Get the first day of the month and the number of days in the month
  const firstDay = date.getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  // Fill the array with the days of the current month
  for (let i = 1; i <= lastDate; i++) {
    days.push(i);
  }

  return {
    firstDay,  // Day of the week the month starts on
    lastDate,  // Total number of days in the month
    days       // Array of days
  };
};

const Calendar = () => {
  const npw = new Date();

  // State to manage selected day
  const [selected_day, setSelected_day] = useState<number>(npw.getDate());

  // State to manage selected month
  const [selected_month, setSelected_month] = useState<string>("February");

  // State to toggle the input card visibility
  const [open, SetOpen] = useState<boolean | false>(false);

  // Current date is stored for calendar reference
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);

  // Generate days for the current month
  const { firstDay, lastDate, days } = generateDays(currentDate.getFullYear(), currentDate.getMonth());

  // Function to change the month
  const changeMonth = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  return (
    <div className='flex md:flex-row flex-col font-noto px-2'>

      {/* Calendar Section */}
      <div className="p-1 w-96 px-10">
        <div className='border p-3 rounded-lg'>

          {/* Calendar Header */}
          <div className="flex justify-between items-center mb-4">
            <button onClick={() => changeMonth(-1)} className="px-2 py-2 bg-black text-white rounded-md">
              Previous
            </button>
            <div className="text-lg">
              {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
            </div>
            <button onClick={() => changeMonth(1)} className="px-2 py-2 bg-black text-white rounded-md">
              Next
            </button>
          </div>

          {/* Days of the Week */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
              <div key={index}>{day}</div>
            ))}

            {/* Empty cells for days before the first day of the month */}
            {Array(firstDay).fill(null).map((_, index) => (
              <div key={index}></div>
            ))}

            {/* Days of the Month */}
            {days.map((day, index) => (
              <div
                key={index}
                onClick={() => { setSelected_day(day); SetOpen(true); }}
                className={`p-1 ${selected_day === day ? "bg-black text-white" : ""} border rounded-md hover:bg-gray-200 cursor-pointer`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Input Card Section */}
      <div>
        <Input_Card
          open={open}
          day={selected_day}
          month={currentDate.toLocaleString('default', { month: 'long' })}
          setOpen={SetOpen}
        />
      </div>
    </div>
  );
};

export default Calendar;
