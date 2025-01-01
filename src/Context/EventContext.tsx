import { createContext, useContext, useState } from "react";

interface Event{
    name:string;
    description:string;
    startTime:string;
    endTime:string;
    day:string;
    month:string;
    id:string
    importance:string
  }

const EventContext = createContext()
export const EventProvider:React.FC<{children:React.ReactNode}> = ({children})=>{
    const [events , setEvent] = useState<Event[]>(()=>{
        const stored = localStorage.getItem("events")
        return stored ? JSON.parse(stored):[];
    })
    const addEvent = (day:string , newEvent:Event , month:string , startTime:string , endTime:string):string | void =>{
        const isConflict:boolean = events.some((event)=>
        event.day === day && event.month === month &&  ((startTime>=event.startTime && startTime<event.endTime))||(endTime > event.startTime && endTime <= event.endTime)
        )
        console.log(day , month);
        
        if(isConflict){
            throw new Error("Event time conflicts with an existing event.");
        }
        const updatedEvents = [...events , newEvent];
        setEvent(updatedEvents)
        localStorage.setItem("events" ,JSON.stringify(updatedEvents))
    }
    const EditEvent = (
        day: string,
        month: string,
        startTime: string,
        endTime: string,
        id: string,
        name: string,
        description:string,
        importance:string
      ): void => {
        // Check for conflicts
        const isConflict: boolean = events.some(
          (event) =>
            event.day === day &&
            event.month === month &&
            ((startTime >= event.startTime && startTime < event.endTime) ||
              (endTime > event.startTime && endTime <= event.endTime)) &&
            event.id !== id // Make sure we don't compare with the event being updated
        );
      
        if (isConflict) {
          // If there's a conflict, do not allow the event update, or show a message
          console.log('Event time conflict detected.');
          return; // Optionally return to avoid further execution
        }
      
        // Update the event list: replace the event with the matching ID
        const updatedEvents = events.map((event) =>
          event.id === id
            ? { ...event, name, day, month, startTime, endTime,description , importance }
            : event
        );
      
        // Set the updated list of events
        setEvent(updatedEvents);
        localStorage.setItem("events" ,JSON.stringify(updatedEvents))
      };
      
    const deleteEvent = (id:string)=>{
        const updatedEvents = events.filter((event)=>event.id!==id);
        setEvent(updatedEvents);
        localStorage.setItem("events" , JSON.stringify(updatedEvents))
    }
    return (
        <EventContext.Provider value={{ events, addEvent, deleteEvent , EditEvent }}>
          {children}
        </EventContext.Provider>
      );
}
export const useEventContext = ():EventContexType =>{
    const context = useContext(EventContext);
    if(!context){
        throw new Error("error")
    }
    return context
} 