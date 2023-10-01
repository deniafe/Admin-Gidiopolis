// "use client";
import React, { createContext, useContext, useState, useEffect, ReactNode, Dispatch, SetStateAction } from 'react';
import { getUserEvents  } from '@/firebase/api/event';
import { useAuthContext } from "./AuthContext";
import { EventDelete, AppUser, Event } from './Types';
import {  } from 'firebase/auth';


// Define the types for the context
interface EventContextData {
  getEvents: () => void
  users: AppUser[];
  setUsers: Dispatch<SetStateAction<AppUser[]>>
  currentUser: AppUser | undefined
  setCurrentUser: Dispatch<SetStateAction<AppUser | undefined>>
  userEvents: Event[];
  setUserEvents: Dispatch<SetStateAction<Event[]>>
  currentUserEvent: Event | undefined
  setCurrentUserEvent: Dispatch<SetStateAction<Event | undefined>>
  loading: boolean;
  setCurrentCount: Dispatch<SetStateAction<number>>
  currentCount: number
  eventDelete: EventDelete | undefined
  setEventDelete: Dispatch<SetStateAction<EventDelete | undefined>>
}

interface EventContextProviderProps {
  children: ReactNode;
}

const UserEventContext = createContext<EventContextData | undefined>(undefined);

export const useUserEventContext = (): EventContextData => {
  const context = useContext(UserEventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventContextProvider');
  }
  return context;
};

export const UserEventContextProvider: React.FC<EventContextProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [currentUser, setCurrentUser] = useState<AppUser>();
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [currentUserEvent, setCurrentUserEvent] = useState<Event>();
  const [loading, setLoading] = useState(true);
  const [currentCount, setCurrentCount] = useState(0);
  const [eventDelete, setEventDelete] = useState<EventDelete>()

  const { user } = useAuthContext()

  const getEvents = () => {
    if (user) {
      setLoading(true)
      const userId = user.uid;
      console.log('This is the userId', userId)
      getUserEvents(userId);
    }
  }

  // useEffect(() => {
   
  // }, [user, currentCount]);

  const contextValue: EventContextData = {
    getEvents,
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    userEvents,
    setUserEvents,
    currentUserEvent,
    setCurrentUserEvent,
    loading,
    currentCount,
    setCurrentCount,
    eventDelete,
    setEventDelete,
  };

  return (
    <UserEventContext.Provider value={contextValue}>
      {children}
    </UserEventContext.Provider>
  );
};
