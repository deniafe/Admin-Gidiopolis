"use client";
import React, { useEffect, useState } from 'react'
import { errorMessage } from '@/firebase/error_message';
import validator from 'validator'
import { Loading } from '@/components/global/Loading';
import { signIn } from '@/firebase/auth/signin';
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/context/AuthContext"

export default function Home () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const { user } = useAuthContext()

  const signInWithEmail = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault()

    if(loading) return

    console.log('This is clicking the sign up button')

    if(!email || !password) {
      return errorMessage('Please enter your email and password to sign in')
    }

    if (!validator.isEmail(email)) {
      return errorMessage('Email not valid')
    } 

    if (password.length < 6) {
      return errorMessage('Passord not valid')
    } 

    setLoading(true)

    const { error } = await signIn(email, password)

    if (error) {
      setLoading(false)
      return console.log(error)
    }

    return setLoading(false)
  }

  useEffect(() => {
    if (user) router.push("/dashboard")
  }, [user])

  return (
    <section
      className="mb-8 md:mb-8 md:min-h-screen"
    >
      
      <div className="flex justify-center pt-20">

        <div className="md:px-[2rem] mb-12 md:mb-0" >
          <h2 className="text-center  text-[1.75rem] text-black font-medium mb-4 ">
            Sign In To Admin Portal
          </h2>

          <div className="mt-8 ">

            <form>
              {/* Email input */}
              <div className="mb-2 pt-4">
                <small>Email Address</small>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-blue-50 text-gray-800 peer block min-h-[auto] w-full rounded-full px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput1"
                  placeholder="Email address"
                  />
              </div>

              {/* Password input */}
              <div className="mb-12">
                <small>Password</small>
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-blue-50 text-gray-800 peer block min-h-[auto] w-full rounded-full px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-my-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  placeholder="Email address"
                  />
              </div>

              {/* Submit button */}
              <div
                onClick={signInWithEmail}
                className="inline-block text-center cursor-pointer w-full rounded-full bg-my-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#31859C] transition duration-150 ease-in-out hover:bg-cyan-700 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-cyan-700 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-cyan-800 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                {
                  loading ?
                  (<Loading />) :
                  (
                    <span>
                      Sign In
                    </span>
                  )
                }
              </div>
            </form>
          </div>
          
        </div>
        
      </div>
      
    </section>
  )
}