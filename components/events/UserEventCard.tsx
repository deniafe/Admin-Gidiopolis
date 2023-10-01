'use client'
import { cutOffLongStrings, formatDate2 } from '@/utils/func';
import Link from 'next/link';
import React from 'react';
import { Timestamp } from 'firebase/firestore';
import { useUserEventContext } from "@/context/UserEventContext"
import { Event } from '@/context/Types'

interface ReusableCardProps {
  id: string;
  slug: string;
  imageUrl: string;
  title: string;
  date: Timestamp;
  time: string; 
  venue: string;
  state: string;
  isFree: string;
  isApproved: boolean;
  organizer: string;
}

const UserEventCard: React.FC<ReusableCardProps> = ({ id, slug, imageUrl, title, date, time, venue, state, isFree, isApproved, organizer }) => {

  const { setCurrentUserEvent, userEvents } = useUserEventContext()

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const foundEvent = userEvents.filter((event: Event) => event.uid === id)[0]

    console.log('I fooooooooooooooooooooouuuuuuuuuuuund', foundEvent)

    setCurrentUserEvent(foundEvent)
  }

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const foundEvent = userEvents.filter((event: Event) => event.uid === id)[0]

    console.log('I fooooooooooooooooooooouuuuuuuuuuuund', foundEvent)

    setCurrentUserEvent(foundEvent)
  }

  return (
    <div
      className="block cursor-pointer rounded w-[17rem] bg-white transition-shadow hover:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <div className="relative overflow-hidden bg-cover bg-no-repeat" data-te-ripple-init data-te-ripple-color="light">
        <img className="rounded-t w-full h-32 object-cover" src={imageUrl} alt="" />
        <a href="#!">
          <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"></div>
        </a>
      </div>
      <div className="px-3 py-8">
        <h5 className="mb-2 text-lg font-bold leading-tight text-neutral-800 dark:text-neutral-50">
          {cutOffLongStrings(title)}
        </h5>
        <p className="mb-2 text-sm font-medium text-neutral-400 dark:text-neutral-200">
          {formatDate2(String(date))}, {time}
        </p>
        <p className="mb-2 text-sm text-neutral-600 dark:text-neutral-200">
          {venue}, {state}
        </p>
        <p 
        className="mb-2 w-10 rounded text-center text-white text-xs dark:text-neutral-200"
        style={{background: isFree === 'free' ? '#31859C' : '#77933C'}}
        >
          {isFree === 'free' ? "Free" : "Paid"}
        </p>
        <h6 className="mb-2 text-base font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {cutOffLongStrings(organizer)}
        </h6>
        <div className="flex justify-between my-8" >
          <div className="flex items-end" >
            <p 
            className="mb-2 p-1 rounded text-center text-white text-sm font-medium dark:text-neutral-200"
            style={{background: isApproved ? '#36d4a5' : '#d54c4c'}}
            >
              {isApproved ? "Approved" : "Not Approved"}
            </p>
          </div>
          
          <div className='flex justify-end ' >
              <button
                type="button"
                data-te-toggle="modal"
                data-te-target="#editUserEvent"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={handleEdit}
                className="inline-block rounded-full bg-neutral-50 px-3 py-3 mr-4 text-xs font-medium uppercase leading-normal text-my-primary shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]">
                <svg viewBox="0 0 32 32" width="20px" height="20px">
                    <path fill="currentColor" d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z" />
                </svg>
              </button>
            <button
              type="button"
              data-te-toggle="modal"
              data-te-target="#confirmDeleteEvent"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={handleDelete}
              className="inline-block rounded-full bg-neutral-50 px-3 py-3 mr-4 text-xs font-medium uppercase leading-normal text-danger shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </div>

        <Link
           href={`/e/${id}/${slug}`}
        >
          <button
            type="button"
            className="inline-block rounded-full w-full bg-neutral-50 px-6 pb-2 pt-2.5 text-sm font-medium uppercase leading-normal text-neutral-800 shadow-[0_4px_9px_-4px_#cbcbcb] transition duration-150 ease-in-out hover:bg-neutral-100 hover:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:bg-neutral-100 focus:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] focus:outline-none focus:ring-0 active:bg-neutral-200 active:shadow-[0_8px_9px_-4px_rgba(203,203,203,0.3),0_4px_18px_0_rgba(203,203,203,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(251,251,251,0.3)] dark:hover:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:focus:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)] dark:active:shadow-[0_8px_9px_-4px_rgba(251,251,251,0.1),0_4px_18px_0_rgba(251,251,251,0.05)]">
            View Details
          </button>
        </Link>
      
      </div>
    </div>
  )
}

export default UserEventCard