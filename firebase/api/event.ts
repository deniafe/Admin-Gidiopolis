import axios, { AxiosError } from 'axios';
import { Event, UpdateEventApprovalResponse } from '@/context/Types';
import { baseUrl } from '@/utils/constants';



export async function getAllEvents(): Promise<Event[]> {
  try {
    const response = await axios.get(
      `${baseUrl}/events`,
    );

    // If the request was successful, response.data will contain the list of users
    console.log('Data gotten from the server', response.data.eventList)

    return response.data.eventList;

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError
      console.error('Axios Error getting events:', error.response?.data || error.message);
    } else {
      // Handle other types of errors
      console.error('Error getting events:', error);
    }
    throw error;
  }
}


export async function getUserEvents(userId: string): Promise<Event[]> {
  try {
    const response = await axios.get(
      `${baseUrl}/events/${userId}`,
    );
    // If the request is successful, response.data will contain the user events
    return response.data.userEvents;
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
    const response = await axios.put<UpdateEventApprovalResponse>(
      ` ${baseUrl}/events/edit/approval/${eventId}`,
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
      ` ${baseUrl}/events/delete/${eventId}`
    );

    // Check the HTTP response status code (204 indicates success)
    if (response.status === 200) {
      return true;
    } else {
      return false;
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