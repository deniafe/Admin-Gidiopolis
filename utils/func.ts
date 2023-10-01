import { Timestamp } from 'firebase/firestore';
import validator from 'validator';

export const createSlug = (sentence: string): string => {
  let slug = sentence.toLowerCase().trim();
  slug = slug.replace(/[^a-z0-9]+/g, "-");
  slug = slug.replace(/^-+|-+$/g, "");
  return slug;
};

export function cutOffLongStrings(input: string): string {
  const maxLength = 25;
  
  if (input.length <= maxLength) {
    return input;
  }
  
  return input.slice(0, maxLength) + '...';
}

export function formatDate(createdAt: any): string {
  // const dateObject = timestamp.toDate();
  // Convert the seconds and nanoseconds to milliseconds
const milliseconds = createdAt._seconds * 1000 + createdAt._nanoseconds / 1000000;

// Create a Date object from the milliseconds
const dateObject = new Date(milliseconds);
  const months: string[] = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const day = dateObject.getDate();
  const month = months[dateObject.getMonth()];
  const year = dateObject.getFullYear();

  return `${day} ${month} ${year}`;
}

// export function formatDate2(timestamp: Timestamp): string {
//   const dateObject = timestamp.toDate();
 
//   const months: string[] = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ];

//   const day = dateObject.getDate();
//   const month = months[dateObject.getMonth()];
//   const year = dateObject.getFullYear();

//   return `${day} ${month} ${year}`;
// }

export function convertToTimestamp(dateString: string): Timestamp {
  const [day, month, year] = dateString.split('/').map(Number);
  // if (isNaN(day) || isNaN(month) || isNaN(year)) {
  //   return null;
  // }

  const jsDate = new Date(year, month - 1, day); // Months are zero-indexed
  const timestamp = Timestamp.fromDate(jsDate);
  return timestamp;
}

export function formatDate2(inputDateStr: string): string {
  const inputDate = new Date(inputDateStr);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return inputDate.toLocaleDateString("en-US", options);
}

export function validateEmail(email: string) {
  return validator.isEmail(email)
} 

export function validatePhoneNumber(number: string) {
   const phoneNumberRegex = /^\d{11}$/
   return phoneNumberRegex.test(number)
}

export function validateUrl(url: string) {
  const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
  return urlRegex.test(url);
}

export function validatePrice(inputString: string) {
  const cleanedInput = inputString.trim().toLowerCase();
  const parsedNumber = parseFloat(cleanedInput);

  if (!isNaN(parsedNumber) && parsedNumber >= 0) {
    return true;
  } else if ( cleanedInput.length > 0 && cleanedInput === 'free') {
    return true;
  } else if ( !cleanedInput) {
    return false
  }
  else {
    return false;
  }
}

export function makePrice(inputString: string) {
  const cleanedInput = inputString.trim().toLowerCase();
  const parsedNumber = parseFloat(cleanedInput);

  if (!isNaN(parsedNumber) && parsedNumber > 0) {
    return 'paid';
  } else if (cleanedInput === 'free') {
    return 'free';
  } else {
    return 'invalid';
  }
}


