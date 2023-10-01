import React from 'react'
import TextButton from '../global/TextButton'
import EventCard from '../events/EventCard';
import { useUserEventContext } from "@/context/UserEventContext"
import { convertToTimestamp } from '@/utils/func';
import UserEventCard from '../events/UserEventCard';

export const UserData = () => {

  const { currentUser, userEvents } = useUserEventContext()
  

  return (
    <div className="p-12 pt-24 md:p-0" >
      <div className='flex justify-between'>
        <h2 className="mb-8 text-[1.75rem] text-black font-medium px-[1rem] md:px-[2rem]">
          User 
        </h2>

        {/* <div>
          <TextButton >+ Create New Event</TextButton>
        </div> */}
      </div>

      <div className='md:px-[2rem]' >
        {/* <h6 className="mb-2 text-base font-semibold uppercase ">
          User Data
        </h6> */}
        <p className="mb-2 md:w-8/12" >
          {currentUser && currentUser.displayName}, {currentUser && currentUser.email}
        </p>

        <p 
          className="mb-6 w-16 rounded text-center text-white text-xs dark:text-neutral-200"
          // style={{currentUser && ( currentUser ? background: '#31859C' : 'black')}}
          >
            {"Activated"}
          </p>

        <h6 className="mb-2 mt-12 text-base font-semibold uppercase">
          User Events
        </h6>
      </div>


      <div className="grid grid-cols-1 gap-4 gap-y-12 md:grid-cols-2 lg:grid-cols-3 mt-12 md:mt-2 px-[2rem]">
        {userEvents?.map((event, index) => (
          <div className="flex justify-center md:justify-start mb-4" key={index}>
            <UserEventCard id={event.uid} slug={event.slug} isApproved={event.isApproved}  imageUrl={event.eventBanner} title={event.eventName} date={event.eventDate} time={event.eventTime} venue={event.eventAddress} state={event.eventState} isFree={event.eventPrice} organizer={event.organizerName} />
          </div>
        ))}
      </div>

    {/* <div
      className="flex justify-center mt-12"
      >
        <TextButton onClick={showMore}>Load More</TextButton>
    </div> */}
    </div>
  )
}
