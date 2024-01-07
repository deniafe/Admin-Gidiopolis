import { Timestamp } from "firebase/firestore"

export interface AppUser {
  uid: string
  displayName: string
  email: string
  isEnabled: boolean
  createdAt: Timestamp
}

export interface EventDelete {
  eventName: string
  eventId: string
}

export interface Event {
  createdAt: Timestamp
  uid: string;
  slug: string;
  eventBanner: string; 
  eventName: string; 
  eventDate: {startDate: Timestamp, endDate: Timestamp, key: string};
  eventTime: string; 
  eventAddress: {state: string, region: string, street: string, zoom: number, center: [number, number]};
  eventPrice: string;
  eventCategory: string;
  eventDescription: string;
  eventPriceAmount: string;
  isApproved: boolean;
  organizerEmail: string;
  organizerName: string;
  organizerNumber: string;
  organizerWebsite: string;
  userId: string;
}

export interface UpdateEventApprovalResponse {
  message: string;
  event: Event; // Update this type to match your event data structure
}