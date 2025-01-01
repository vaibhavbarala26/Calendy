//import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import Header from "./Page_component/Header"
import Calender_UI from "./Page_component/Calender"
import Calendar from "./Page_component/Calender"
import Search_for_Events from "./Page_component/Search_for_Events"
function App() {
 
  return (
    <>
   
    <Header></Header>
    <div className="flex flex-row justify-start items-start ">
    <Calendar></Calendar>
    <Search_for_Events></Search_for_Events>
    </div>
    </>
  )
  
}

export default App
