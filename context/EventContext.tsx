import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
// import { getAllEvents } from '@/firebase/api/event';
import { useAuthContext } from "./AuthContext";
import { EventDelete, AppUser, Event } from './Types';

// Define the types for the context
interface EventContextData {
  // getEvents: () => void;
  users: AppUser[];
  setUsers: Dispatch<SetStateAction<AppUser[]>>;
  currentUser: AppUser | undefined;
  setCurrentUser: Dispatch<SetStateAction<AppUser | undefined>>;
  events: Event[];
  setEvents: Dispatch<SetStateAction<Event[]>>;
  currentEvent: Event | undefined;
  setCurrentEvent: Dispatch<SetStateAction<Event | undefined>>;
  loading: boolean;
  setCurrentCount: Dispatch<SetStateAction<number>>;
  currentCount: number;
  eventDelete: EventDelete | undefined;
  setEventDelete: Dispatch<SetStateAction<EventDelete | undefined>>;
}

interface EventContextProviderProps {
  children: ReactNode;
}

const EventContext = createContext<EventContextData | undefined>(undefined);

export const useEventContext = (): EventContextData => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEventContext must be used within an EventContextProvider');
  }
  return context;
};

export const EventContextProvider: React.FC<EventContextProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<AppUser[]>([]);
  const [currentUser, setCurrentUser] = useState<AppUser>();
  const [events, setEvents] = useState<Event[]>([]);
  const [currentEvent, setCurrentEvent] = useState<Event>();
  const [loading, setLoading] = useState(true);
  const [currentCount, setCurrentCount] = useState(0);
  const [eventDelete, setEventDelete] = useState<EventDelete>();

  // useEffect(() => {
  //   // Additional logic if needed
  // }, [user, currentCount]);

  const contextValue: EventContextData = {
    // getEvents,
    users,
    setUsers,
    currentUser,
    setCurrentUser,
    events,
    setEvents,
    currentEvent,
    setCurrentEvent,
    loading,
    currentCount,
    setCurrentCount,
    eventDelete,
    setEventDelete,
  };

  return (
    <EventContext.Provider value={contextValue}>
      {children}
    </EventContext.Provider>
  );
};
