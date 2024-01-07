"use client";
import Navbar from '@/components/layout/Navbar';
import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { AuthContextProvider } from '@/context/AuthContext'
import { ToastContainer } from 'react-toastify';
import { ConfirmDelete } from '@/components/global/ConfirmDelete';
import { useEffect } from 'react';
import { EditUser } from '@/components/users/EditUser';
// import { useRouter } from "next/navigation"
// import { useAuthContext } from "@/context/AuthContext"
import { CreateUser } from '@/components/users/CreateUser';
import { UserEventContextProvider } from '@/context/UserEventContext';
import { EventContextProvider } from '@/context/EventContext';
import { ConfirmDeleteEvent } from '@/components/events/ConfirmDeleteEvent';
import { EditUserEvent } from '@/components/events/EditUserEvent';
import { EditEvent } from '@/components/events/EditEvent';
import { ConfirmDeleteUserEvent } from '@/components/events/ConfirmDeleteUserEvent';


export default function RootLayout({
  children,
}: {

  children: React.ReactNode
}) {


  useEffect(() => {
    const init = async () => {
      const { Collapse, Dropdown, Modal, Ripple, initTE } = await import("tw-elements");
      initTE({ Collapse, Dropdown, Modal, Ripple,});
    };
    init();
  }, []);


  return (
    <html lang="en">
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <title>Admin | Gidiopolis</title>
      <meta name="description" content="Admin | Gidiopolis" />
      <body>
        <AuthContextProvider>
          <EventContextProvider>
            <UserEventContextProvider>
              <Navbar />
              <main className='md:px-[10rem]'>
                {children}
              </main>
              <ConfirmDelete />
              <EditUser />
              <CreateUser />
              <ConfirmDeleteEvent />
              <ConfirmDeleteUserEvent />
              <EditEvent />
              <EditUserEvent />
              <ToastContainer />
            </UserEventContextProvider>
          </EventContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
