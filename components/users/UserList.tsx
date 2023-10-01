import React from 'react'
import { UserCard } from './UserCard'
import TextButton from '../global/TextButton'
import { useUserEventContext } from "@/context/UserEventContext"

export const UserList = () => {
  const { users } = useUserEventContext()

  const showMore = () => {}

  return (
    <div className="p-12 pt-24 md:p-0" >
        <div className='flex justify-between'>
          <h2 className="mb-8 text-[1.75rem] text-black font-medium px-[1rem] md:px-[2rem]">
            User List
          </h2>

          <div
             data-te-toggle="modal"
             data-te-target="#createUser" 
          >
            <TextButton >+ Create New User</TextButton>
          </div>

        </div>
        {users.map((user) => (
          <UserCard
            key={user.uid}
            id={user.uid}
            displayName={user.displayName}
            email={user.email}
            status={user.isEnabled === undefined ? true : user.isEnabled}
            date={user.createdAt}
          />
        ))}
        {/* <div
          className="flex justify-center mt-12"
          >
            <TextButton onClick={showMore}>Load More</TextButton>
        </div> */}
    </div>
  )
}
