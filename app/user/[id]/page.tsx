"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/AuthContext"
import { useUserEventContext } from "@/context/UserEventContext"
import { UserData } from '@/components/users/UserData';
import { getUserEvents } from '@/firebase/api/event'
import { errorMessage } from '@/firebase/error_message'
import { Spinner } from '@/components/global/Loading'


export default function Page({ params: { id } }: { params: { id: string } }) {
  const { user } = useAuthContext()
  const { setUserEvents } = useUserEventContext()
  const router = useRouter()

  const [loading, setLoading] = useState(false) 
  
  const fetchUserEvents = async (id: string) => {
    setLoading(true);
  
    try {
      const eventsData = await getUserEvents(id);
      console.log('Fetched user events successfully', eventsData);
      // Handle the fetched data as needed, e.g., set it to state
      setUserEvents(eventsData);
      setLoading(false);
    } catch (error) {
      // Handle any errors here
      errorMessage('Error fetching user events:' + error);
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (user == null) router.push("/")
  }, [user])

  useEffect(() => {
    // Fetch user events when the component mounts
    fetchUserEvents(id);
  }, []);

  return (
    <section
      className="mb-8 md:mb-8 md:pt-32 md:min-h-screen"
    >
     {loading ? 
      <div
          className="text-my-primary"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}
          >
            <Spinner />
          </div>
          : 
          <UserData />}
          
    </section>

  )
}
