import Link from 'next/link';
import React, { useEffect } from 'react';
import { useUserEventContext } from "@/context/UserEventContext"
import { useRouter } from "next/navigation"
import { Timestamp } from 'firebase/firestore';
import { formatDate } from '@/utils/func';

interface UserCardProps {
  id: string
  displayName: string;
  email: string;
  status: boolean;
  date: Timestamp;
}

export const UserCard: React.FC<UserCardProps> = ({ id, displayName, email, status, date }) => {

    const { setCurrentUser } = useUserEventContext()
    const router = useRouter()

    const handleViewUser = () => {
        console.log('This is the user id', id)
        const user = {
            uid: id,
            displayName,
            email,
            isEnabled: status,
            createdAt: date
        }

        setCurrentUser(user)
        return router.push(`/user/${id}`)
    }

    const handleEditUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        console.log('This is the user id', id)
        const editUser = {
            uid: id,
            displayName,
            email,
            isEnabled: status,
            createdAt: date
        }

        setCurrentUser(editUser)
    }

    const handleDeleteUser = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation()
        
        const deleteUser = {
            uid: id,
            displayName,
            email,
            isEnabled: status,
            createdAt: date
        }

        setCurrentUser(deleteUser)
    }

    useEffect(() => {
        const init = async () => {
          const { Collapse, Dropdown, Modal, Ripple, initTE } = await import("tw-elements");
          initTE({ Collapse, Dropdown, Modal, Ripple,});
        };
        init();
      }, []);

  return (
    <div
        onClick={handleViewUser}
        data-te-ripple-init
        data-te-ripple-color="light"
        className="flex flex-col md:flex-row md:space-x-4 w-full rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] mb-2 hover:bg-neutral-100 cursor-pointer">
        <div className="flex-1 p-6">
            <p className="text-neutral-400 text-xs pb-3">Name</p>
            <p className="text-sm text-neutral-600">{displayName}</p>
        </div>
        <div className="flex-1 p-6">
            <p className="text-neutral-400 text-xs pb-3">Email</p>
            <p className="text-sm text-neutral-600">{email}</p>
        </div>
        <div className="flex-1 p-6">
            <p className="text-neutral-400 text-xs pb-3">Status</p>
            <p className="text-sm text-neutral-600">{status ? 'Enabled' : 'Disabled'}</p>
        </div>
        <div className="flex-1 p-6">
            <p className="text-neutral-400 text-xs pb-3">Joined Date</p>
            <p className="text-sm text-neutral-600">{formatDate(date)}</p>
        </div>
        <div className="flex-1 p-6">
            <p className="text-neutral-400 text-xs pb-1">Action</p>
            <div className='flex space-x-4 md:space-x-0'>
                <button 
                    type="button" 
                    data-te-ripple-init 
                    data-te-ripple-color="light"
                    data-te-toggle="modal"
                    data-te-target="#editUser" 
                    onClick={handleEditUser}
                    className="inline-block rounded-full px-2.5 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-300 transition duration-150 ease-in-out hover:bg-neutral-200">
                    <svg viewBox="0 0 32 32" width="20px" height="20px">
                        <path fill="currentColor" d="M 23.90625 3.96875 C 22.859375 3.96875 21.8125 4.375 21 5.1875 L 5.1875 21 L 5.125 21.3125 L 4.03125 26.8125 L 3.71875 28.28125 L 5.1875 27.96875 L 10.6875 26.875 L 11 26.8125 L 26.8125 11 C 28.4375 9.375 28.4375 6.8125 26.8125 5.1875 C 26 4.375 24.953125 3.96875 23.90625 3.96875 Z M 23.90625 5.875 C 24.410156 5.875 24.917969 6.105469 25.40625 6.59375 C 26.378906 7.566406 26.378906 8.621094 25.40625 9.59375 L 24.6875 10.28125 L 21.71875 7.3125 L 22.40625 6.59375 C 22.894531 6.105469 23.402344 5.875 23.90625 5.875 Z M 20.3125 8.71875 L 23.28125 11.6875 L 11.1875 23.78125 C 10.53125 22.5 9.5 21.46875 8.21875 20.8125 Z M 6.9375 22.4375 C 8.136719 22.921875 9.078125 23.863281 9.5625 25.0625 L 6.28125 25.71875 Z" />
                    </svg>
                </button>
                <button 
                    type="button" 
                    data-te-ripple-init 
                    data-te-ripple-color="light" 
                    data-te-toggle="modal"
                    data-te-target="#confirmDelete"
                    onClick={handleDeleteUser}
                    className="inline-block rounded-full px-2.5 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-neutral-300 transition duration-150 ease-in-out hover:bg-neutral-200">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
                {/* <button type="button" data-te-ripple-init data-te-ripple-color="light" className="inline-block rounded-full px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700">
                    View
                </button> */}
            </div>
        </div>
    </div>
  );
};
