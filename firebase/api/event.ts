import axios, { AxiosError } from 'axios';
import { Event, UpdateEventApprovalResponse } from '@/context/Types';


export async function getUserEvents(userId: string): Promise<Event[]> {
  try {
    const response = await axios.get<Event[]>(
      ` https://us-central1-gidiopolis.cloudfunctions.net/api/events`,
      {
        params: {
          userId,
        },
      }
    );

    // If the request is successful, response.data will contain the user events
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError
      console.error('Axios Error getting user events:', error.response?.data || error.message);
    } else {
      // Handle other types of errors
      console.error('Error getting user events:', error);
    }
    throw error;
  }
}

export async function updateEventApprovalStatus(
  eventId: string,
  isApproved: boolean
): Promise<UpdateEventApprovalResponse> {
  try {
    const response = await axios.patch<UpdateEventApprovalResponse>(
      ` https://us-central1-gidiopolis.cloudfunctions.net/api/events/${eventId}/approval`,
      { isApproved }
    );

    // If the event approval status was successfully updated, response.data will contain the response data
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError
      console.error('Axios Error updating event approval status:', error.response?.data || error.message);
    } else {
      // Handle other types of errors
      console.error('Error updating event approval status:', error);
    }
    throw error;
  }
}

export async function deleteEvent(eventId: string): Promise<boolean> {
  try {
    const response = await axios.delete(
      ` https://us-central1-gidiopolis.cloudfunctions.net/api/events/${eventId}`
    );

    // Check the HTTP response status code (204 indicates success)
    if (response.status === 204) {
      return true; // Deletion was successful
    } else {
      return false; // Deletion was not successful
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError
      console.error('Axios Error deleting event:', error.response?.data || error.message);
    } else {
      // Handle other types of errors
      console.error('Error deleting event:', error);
    }
    throw error;
  }
}