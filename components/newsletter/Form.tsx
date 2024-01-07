'use client'

import { useState } from 'react'
import { Loading } from '../global/Loading'
import axios from 'axios';
import { successMessage } from '@/firebase/success_message';
import { errorMessage } from '@/firebase/error_message';
import { baseUrl } from '@/utils/constants';

export function Form() {
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [ctaLink, setCTALink] = useState('');
  const [ctaLabel, setCTALabel] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Check if all input fields are filled
    if (!title || !preview || !message) {
      errorMessage('Title, Preview and Message are mandatory fields'); // You can replace this with a more user-friendly error handling
      return;
    }

    try {
      // Set loading to true before making the request
      setLoading(true);

      // Assuming you have an API endpoint to send the data
      const apiUrl = `${baseUrl}/send/newsletter`

      // Make a request using Axios
      const response = await axios.post(apiUrl, {
        title,
        preview,
        ctaLink,
        ctaLabel,
        message,
      });

      // Handle the response data as needed
      console.log('Response:', response.data);

      // Set loading to false after receiving the data
      setLoading(false);

      // Display a success message (you can replace this with your own logic)
      successMessage('Newsletter sent successfully!');

      setCTALabel('')
      setCTALink('')
      setMessage('')
      setPreview('')
      setTitle('')

    } catch (error) {
      // Handle errors
      console.error('Error:', error);

      // Set loading to false in case of an error
      setLoading(false);

      // Display an error message (you can replace this with your own logic)
      errorMessage('Failed to send newsletter. Please try again.');
    }
  };

  return (
    <div>
      {/* Modal body */}
      <div className="relative flex-auto p-4 px-6" data-te-modal-body-ref>

          <h2 className="mb-2 text-[1.75rem] text-black font-medium">
            Send Newsletter
          </h2>

        <p className="text-sm mb-12">Send newsletter messages to all Gidiopolis subscribers</p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4"> 
          <div>
            <small>Message Title</small>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              className="bg-blue-50 w-full text-gray-800 peer block min-h-[auto] rounded-full py-[0.32rem] px-4 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              placeholder="Email address"
            />
          </div>
         
            <div>
              <small>Message Preview</small>
              <input
                type="text"
                onChange={(e) => setPreview(e.target.value)}
                className="bg-blue-50 w-full text-gray-800 peer block min-h-[auto] rounded-full py-[0.32rem] px-4 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                placeholder="Email address"
                />
              </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-4"> 
          <div>
            <small>Call To Action Label</small>
            <input
              type="text"
              onChange={(e) => setCTALabel(e.target.value)}
              className="bg-blue-50 w-full text-gray-800 peer block min-h-[auto] rounded-full py-[0.32rem] px-4 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              
              placeholder="Email address"
              />
          </div>
          <div>
            <small>Call To Action Link</small>
            <input
              type="text"
              onChange={(e) => setCTALink(e.target.value)}
              className="bg-blue-50 w-full text-gray-800 peer block min-h-[auto] rounded-full py-[0.32rem] px-4 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              placeholder="Email address"
              />
          </div>
        </div>

        <div className="mb-2"> 
          <small>Message</small>
          <textarea
            rows={6}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-blue-50 text-gray-800 peer text-sm font-medium block min-h-[auto] w-full rounded-[2rem] px-5 py-[0.8rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
            placeholder="Name"
          />
        </div>

        </div>

        <div className="flex justify-center mb-8 mt-4 border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
          
          <div
            onClick={handleSubmit}
            className="inline-block text-center cursor-pointer w-3/4 rounded-full bg-my-primary px-7 pb-2.5 pt-3 mt-4 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#31859C] transition duration-150 ease-in-out hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-cyan-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
          {
            loading ?
            (<Loading />) :
            (
              <span>
                  Send Newsletter
              </span>
            )
          }
          </div>
      </div>
    </div>
  )
}