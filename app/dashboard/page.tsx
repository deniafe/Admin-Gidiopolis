"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/AuthContext"
import { useUserEventContext } from "@/context/UserEventContext"
import { UserList } from "@/components/users/UserList";
import { getAllUsers } from "@/firebase/api/user";
import { errorMessage } from "@/firebase/error_message";
import { Spinner } from "@/components/global/Loading";

export default function Dashboard () {
  const { user } = useAuthContext()
  const { setUsers } = useUserEventContext()
  const router = useRouter()

  const [loading, setLoading] = useState(false) 

  const fetchAllUsers = async () => {
    setLoading(true)
    try {
      const usersData = await getAllUsers();
      console.log('I have gone to fetch all users')
      setUsers(usersData);
      setLoading(false)
    } catch (error) {
      // Handle any errors here
      errorMessage('Error fetching users:' + error);
      setLoading(false)
    }
  };

  useEffect(() => {
    if (user == null) router.push("/")
  }, [user])

  useEffect(() => {
    // Fetch all users when the component mounts
    fetchAllUsers();
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
          <UserList />}
          
    </section>
  )
}