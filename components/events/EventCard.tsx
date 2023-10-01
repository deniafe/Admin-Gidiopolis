'use client'
import { cutOffLongStrings, formatDate } from '@/utils/func';
import Link from 'next/link';
import React from 'react';
import { Timestamp } from 'firebase/firestore';

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
  organizer: string;
}

const EventCard: React.FC<ReusableCardProps> = ({ id, slug, imageUrl, title, date, time, venue, state, isFree, organizer }) => {

  return (
    <Link
    href={`/e/${id}/${slug}`}
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
          {formatDate(date)}, {time}
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
      </div>
    </Link>
  )
}

export default EventCard