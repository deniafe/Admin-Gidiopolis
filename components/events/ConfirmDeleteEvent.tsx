import { deleteUser } from "@/firebase/api/user";
import { Loading } from "../global/Loading"
import { useEffect, useState } from "react"
import { successMessage } from "@/firebase/success_message";
import { errorMessage } from "@/firebase/error_message";
import { useUserEventContext } from "@/context/UserEventContext"
import { deleteEvent } from "@/firebase/api/event";

export const ConfirmDeleteEvent = () => {

  const { userEvents, setUserEvents, currentUserEvent, setCurrentUserEvent } = useUserEventContext()
  const [loading, setLoading] = useState(false)

  const closeModal = async () => {
    const { Modal } = await import("tw-elements")
    const myModal = Modal.getInstance(document.getElementById("confirmDeleteEvent"))
    return myModal.hide()
  }

  const handleEventDelete = async () => {
    if(!currentUserEvent) return

    const eventId = currentUserEvent.uid
  
    setLoading(true);
  
    try {
      const isDeleted = await deleteEvent(eventId);
  
      if (isDeleted) {
        // Event deleted successfully
        successMessage('Event deleted successfully');
  
        // Remove the deleted event from the events array
        const updatedEvents = userEvents.filter((event) => event.uid !== eventId);
        setUserEvents(updatedEvents);
      } else {
        // Failed to delete event
        errorMessage('Failed to delete event');
      }
  
      setLoading(false);
      setCurrentUserEvent(undefined);
      closeModal();
    } catch (error) {
      // Handle any errors here
      errorMessage('Error: ' + error);
      setLoading(false);
      setCurrentUserEvent(undefined);
      closeModal();
    }
  };
  
  useEffect(() => {
    const init = async () => {
      const { Modal, Ripple, initTE } = await import("tw-elements");
      initTE({ Modal, Ripple,});
    };
    init();
  }, []);

  return (
    <div
      data-te-modal-init
      className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id="confirmDeleteEvent"
      tabIndex={-1}
      aria-labelledby="confirmDeleteEventLabel"
      aria-modal="true"
      role="dialog">
      <div
        data-te-modal-dialog-ref
        className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[300px]">
        <div
          className="pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
          <div
            className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            {/* Modal title */}
            <h5
              className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
              id="exampleModalSmLabel">
              Are You sure?
            </h5>
            {/* <!--Close button--> */}
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-te-modal-dismiss
              aria-label="Close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="h-6 w-6">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* <!--Modal body--> */}
          <div className="relative p-4">
            <p className='text-center'>This is a permanent operation that cannot be reversed</p>
            <div className="flex justify-end mt-8" >
              <button
                type="button"
                data-te-ripple-init
                data-te-ripple-color="light"
                data-te-modal-dismiss
                className="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-gray-800 transition duration-150 ease-in-out hover:bg-cyan-50 hover:text-cyan-800 focus:text-cyan-800 focus:outline-none focus:ring-0 active:text-cyan-800">
                Cancel
              </button>
              <button
                type="button"
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={handleEventDelete}
                className="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:bg-red-50 hover:text-red-800 focus:text-red-800 focus:outline-none focus:ring-0 active:text-red-700">
                  {
                  loading ?
                  (<Loading />) :
                  (
                    <span>
                      Delete
                    </span>
                  )
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
