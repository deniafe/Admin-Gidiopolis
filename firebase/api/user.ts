import { AppUser } from '@/context/Types';
import axios, { AxiosError } from 'axios';

export async function createNewUser(
  displayName: string,
  email: string,
  password: string,
  isEnabled: boolean
): Promise<AppUser> {

  try {
    const response = await axios.post<AppUser>(
      ' https://us-central1-gidiopolis.cloudfunctions.net/api/users',
      {
        displayName,
        email,
        password,
        isEnabled,
      }
    );

    // If the user was successfully created, response.data will contain the user details
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError
      console.error('Axios Error creating user:', error.response?.data || error.message);
    } else {
      // Handle other types of errors
      console.error('Error creating user:', error);
    }
    throw error;
  }
}

export async function getAllUsers(): Promise<AppUser[]> {
  try {
    const response = await axios.get<AppUser[]>(
      ' https://us-central1-gidiopolis.cloudfunctions.net/api/users'
    );

    // If the request was successful, response.data will contain the list of users
    console.log('Data gotten from the server', response.data)
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError
      console.error('Axios Error fetching users:', error.response?.data || error.message);
    } else {
      // Handle other types of errors
      console.error('Error fetching users:', error);
    }
    throw error;
  }
}

export async function editUser(userId: string, updatedUserData: Partial<AppUser>): Promise<AppUser> {
  try {
    const response = await axios.put<AppUser>(
      ` https://us-central1-gidiopolis.cloudfunctions.net/api/users/${userId}`,
      updatedUserData
    );

    // If the user was successfully updated, response.data will contain the updated user details
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError
      console.error('Axios Error editing user:', error.response?.data || error.message);
    } else {
      // Handle other types of errors
      console.error('Error editing user:', error);
    }
    throw error;
  }
}

export async function deleteUser(userId: string): Promise<boolean> {
  try {
    await axios.delete<void>(
      ` https://us-central1-gidiopolis.cloudfunctions.net/api/users/${userId}`
    );

    // If the DELETE request is successful (status code 204), return true
    return true;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // Handle AxiosError
      console.error('Axios Error deleting user:', error.response?.data || error.message);
    } else {
      // Handle other types of errors
      console.error('Error deleting user:', error);
    }
    // If the request fails or returns a status code other than 204, return false
    return false;
  }
}





