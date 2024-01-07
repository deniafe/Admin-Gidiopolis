"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/AuthContext"
import { useEventContext } from "@/context/EventContext"
import { UserData } from '@/components/users/UserData';
import { getAllEvents } from '@/firebase/api/event'
import { errorMessage } from '@/firebase/error_message'
import { Spinner } from '@/components/global/Loading'
import EventCard from '@/components/events/EventCard'


export default function Page() {
  const { user } = useAuthContext()
  const { setEvents, events } = useEventContext()
  const router = useRouter()

  const [loading, setLoading] = useState(false) 
  
  const fetchUserEvents = async () => {
    setLoading(true);
  
    try {
      const eventsData = await getAllEvents();
      console.log('Fetched user events successfully', eventsData);
      // Handle the fetched data as needed, e.g., set it to state
      setEvents(eventsData);
      setLoading(false);
    } catch (error) {
      // Handle any errors here
      errorMessage('Error fetching user events:' + error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (user == null) router.push("/")
  }, [user])

  useEffect(() => {
    // Fetch user events when the component mounts
    fetchUserEvents();
  }, []);

  return (
    <section
      className="mb-8 md:mb-8 md:pt-32 md:min-h-screen"
    >
        <div className='flex justify-between'>
          <h2 className="mb-8 text-[1.75rem] text-black font-medium px-[1rem] md:px-[2rem]">
            Events List
          </h2>
        </div>
     {loading ? 
      <div
          className="text-my-primary"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}
          >
            <Spinner />
          </div>
          : 
          
         (
          <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3 mt-12 md:mt-2 px-[2rem]">
          {events?.map((event, index) => (
            <div className="flex justify-center md:justify-start mb-4" key={index}>
              <EventCard id={event.uid} slug={event.slug} isApproved={event.isApproved}  imageUrl={event.eventBanner} title={event.eventName} date={event.eventDate} time={event.eventTime} venue={event.eventAddress} isFree={event.eventPrice} organizer={event.organizerName} />
            </div>
          ))}
        </div>
         )
          
          }
          
    </section>

  )
}
