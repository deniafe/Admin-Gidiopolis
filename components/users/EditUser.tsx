import { useEffect, useState } from 'react';
import { Loading } from '../global/Loading';
import { useUserEventContext } from "@/context/UserEventContext"
import { editUser } from '@/firebase/api/user';
import { successMessage } from '@/firebase/success_message';
import { errorMessage } from '@/firebase/error_message';

export const EditUser = () => {

  const { users, setUsers, currentUser, setCurrentUser } = useUserEventContext()

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEnabled, setIsEnabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const closeModal = async () => {
    const { Modal } = await import("tw-elements")
    const myModal = Modal.getInstance(document.getElementById("editUser"))
    setLoading(false)
    return myModal.hide()
  }

  const openResetModal = async () => {
    const { Modal } = await import("tw-elements")
    const myModal = Modal.getInstance(document.getElementById("editUser"))
    return myModal.show()
  }

  const editAppUser = () => {
    setLoading(true);
  
    // Define the updated user data (replace with the actual updated values)
    const updatedUserData = password ? {
      displayName,
      email,
      password,
      isEnabled,
    } : {
      displayName,
      email,
      isEnabled,
    };

    console.log('This is the curenet user', currentUser)
  
    // Usage example:
    currentUser && editUser(currentUser.uid, updatedUserData)
      .then((updatedUser) => {
        successMessage('User edited successfully');
        console.log('User edited:', updatedUser);
  
        // Update the users array with the edited user data
        const updatedUsers = users.map((user) => {
          if (user.uid === currentUser.uid) {
            return { ...user, ...updatedUser };
          }
          return user;
        });
  
        setUsers(updatedUsers);
        setLoading(false);
        setCurrentUser(undefined)
        closeModal();
      })
      .catch((error) => {
        errorMessage('Error:' + error);
        setLoading(false);
        setCurrentUser(undefined)
        closeModal();
      });
  };

  useEffect(() => {
    if(currentUser) {
      setDisplayName(currentUser.displayName)
      setEmail(currentUser.email)
      setIsEnabled(currentUser.isEnabled)
    }
  }, [currentUser]);

  

    return (
        <>
          {/* Modal */}
          <div
              data-te-modal-init
              className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
              id="editUser"
              tabIndex={-1}
              aria-labelledby="editUserLabel"
              aria-hidden="true"
          >
              <div
                  data-te-modal-dialog-ref
                  className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
              >
                  <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
                      <div className="flex flex-shrink-0 items-center justify-between rounded-t-md p-4 dark:border-opacity-50">
                          {/* Modal title */}
                          <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200" id="exampleModalLabel">
                              Edit User
                          </h5>
                          {/* Close button */}
                          <button
                              type="button"
                              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                              data-te-modal-dismiss
                              aria-label="Close"
                          >
                              <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                              >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                          </button>
                      </div>

                      {/* Modal body */}
                      <div className="relative flex-auto p-4 px-6" data-te-modal-body-ref>

                        <p className="text-sm pb-6">Edit user name, email and status</p>
                        
                        <div className="mb-2"> 
                          <small>Name</small>
                          <input
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="bg-blue-50 w-full text-gray-800 peer block min-h-[auto] rounded-full py-[0.32rem] px-4 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput1"
                            placeholder="Email address"
                            />
                        </div>

                        <div className="mb-2"> 
                          <small>Email Address</small>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-blue-50 w-full text-gray-800 peer block min-h-[auto] rounded-full py-[0.32rem] px-4 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput1"
                            placeholder="Email address"
                            />
                        </div>

                        <div className="mb-2"> 
                          <small>Password</small>
                          <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-blue-50 w-full text-gray-800 peer block min-h-[auto] rounded-full py-[0.32rem] px-4 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                            id="exampleFormControlInput1"
                            placeholder="Email address"
                            />
                        </div>

                        <div className="mt-4 mb-2">
                         <div>
                          <small>Status</small>
                         </div>
                         <input
                          className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                          type="checkbox"
                          role="switch"
                          checked={isEnabled}
                          onChange={(e) => setIsEnabled(e.target.checked)}
                          id="flexSwitchCheckDefault" />
                          <label
                            className="inline-block pl-[0.15rem] hover:cursor-pointer text-sm"
                            htmlFor="flexSwitchCheckDefault"
                            >{isEnabled ? 'Enabled' : 'Disabled'}
                            </label>
                        </div>

                        </div>

                      <div className="flex justify-center mb-8 mt-4 border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                          
                        <div
                          onClick={editAppUser}
                          className="inline-block text-center cursor-pointer w-3/4 rounded-full bg-my-primary px-7 pb-2.5 pt-3 mt-4 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#31859C] transition duration-150 ease-in-out hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-cyan-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                        {
                          loading ?
                          (<Loading />) :
                          (
                            <span>
                                Update User
                            </span>
                          )
                        }
                        </div>
                      </div>
                  </div>
              </div>
          </div>
        </>
    );
};
