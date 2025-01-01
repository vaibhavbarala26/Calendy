import React, { useContext, useState } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { IoMdClose } from "react-icons/io";
import { useEventContext } from "../Context/EventContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Define the props for the Input_Card component
interface InputCardProp {
  open: boolean;
  day: string;
  month: string;
  setOpen: (value: boolean) => void;
}

// Define the Event interface
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

const Input_Card: React.FC<InputCardProp> = ({ open, day, month, setOpen }) => {
  // Local state for handling input values and feedback messages
  const [starting_time, setStarting_time] = useState<string>("");
  const [ending_time, setEnding_time] = useState<string>("00:00");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [importance, setImportance] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Get context values
  const { events, addEvent } = useEventContext();
  console.log(events);

  // Handle form submission
  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Create an event object
    const event: Event = {
      name,
      description,
      startTime: starting_time,
      endTime: ending_time,
      day,
      month,
      id: `${starting_time}${ending_time}`,
      importance,
    };

    try {
      // Validate form inputs
      if (!name || !starting_time || !ending_time || !description) {
        return setError("Enter all details");
      }

      // Add the event using the context function
      addEvent(day, event, month, starting_time, ending_time);

      // Update success message and clear form inputs
      setSuccess("Event successfully added");
      setName("");
      setDescription("");
      setStarting_time("");
      setEnding_time("00:00");
      setError(null); // Clear any previous errors
    } catch (err) {
      // Handle any errors
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  // Handle resetting the form on error or success
  const handleError = () => {
    setSuccess(null);
    setName("");
    setDescription("");
    setStarting_time(new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }));
    setEnding_time("--:--");
    setError(null);
  };

  return (
    <div className="p-2">
      {/* Main Card for Input */}
      <Card
        className={`relative ${
          open ? "" : "opacity-0"
        } transition-all duration-700 ease-in-out flex flex-col`}
      >
        {/* Header Section */}
        <CardHeader>
          <div className="flex flex-row items-center justify-between">
            <CardTitle>
              {day} {month}
            </CardTitle>
            <span className="cursor-pointer" onClick={() => setOpen(false)}>
              <IoMdClose size={20} />
            </span>
          </div>
          <CardDescription className="text-xl">
            Choose the event time and details
          </CardDescription>
        </CardHeader>

        {/* Time Selection Section */}
        <CardContent className="flex flex-row gap-4 items-center justify-center px-6">
          <div className="flex flex-row items-center justify-center border rounded-md">
            <input
              type="time"
              value={starting_time}
              onChange={(e) => setStarting_time(e.target.value)}
              className="outline-none text-center text-lg w-full p-2 rounded-md"
            />
          </div>
          <div>
            <FaLongArrowAltRight size={20} />
          </div>
          <div className="flex flex-row items-center justify-center border rounded-md">
            <input
              type="time"
              value={ending_time}
              onChange={(e) => setEnding_time(e.target.value)}
              className="outline-none text-center text-lg w-full p-2 rounded-md"
            />
          </div>
        </CardContent>

        {/* Event Details Section */}
        <CardContent>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name of the event"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-3 py-2 border rounded-md text-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
            <Textarea
              placeholder="Type the details of the event here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-lg outline-none focus:ring-2 focus:ring-blue-400"
            />
            <RadioGroup value={importance} onValueChange={setImportance}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="personal" id="personal" />
                <Label htmlFor="personal">Personal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="work" id="work" />
                <Label htmlFor="work">Work</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
            <Button onClick={HandleSubmit}>Add Event</Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Dialog */}
      {error && (
        <AlertDialog open={Boolean(error)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Error during event addition</AlertDialogTitle>
              <AlertDialogDescription>{error}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleError}>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

      {/* Success Dialog */}
      {success && (
        <AlertDialog open={Boolean(success)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Success 🎉🎉</AlertDialogTitle>
              <AlertDialogDescription>{success}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction onClick={handleError}>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};

export default Input_Card;
