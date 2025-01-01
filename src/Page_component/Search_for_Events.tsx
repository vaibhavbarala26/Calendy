import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useEventContext } from '@/Context/EventContext'
import EventData from './EventData';
import "../App.css"
interface Event{
    name:string;
    description:string;
    startTime:string;
    endTime:string;
    day:string;
    month:string;
    id:string;
    importance:string
  }

const Search_for_Events = () => {
    //const {events}:Event[] = useEventContext()
    const [data , setData] = useState<Event[]>([])
    const [input , setInput] = useState("")
    const handleSubmit = () => {
      setData([])
        const result = events.filter((event: Event) => 
            event.name.replace(/\s+/g, "").toLowerCase().includes(input.replace(/\s+/g, "").toLowerCase())
        );
        
        setData(result)
        
    };
    
  return (
    <div className='font-noto'>
    <div className="flex w-[400px] max-w-lg items-center space-x-2 ">
      <Input type="text" value={input} onChange={(e)=>(setInput(e.target.value))} placeholder="Events" />
      <Button type="submit" onClick={handleSubmit}>Search</Button>
    </div>
    <div className='max-h-[70vh]   overflow-auto  scrollbar-hide '>
    {input && data?.map((dat)=>(
      <EventData data={dat}></EventData>
    ))}
    </div>
    </div>
  )
}

export default Search_for_Events
