"use client";
import { useEffect } from "react";
import { Logo } from '../icons/Logo';
import TextButton from '../global/TextButton';
import { useAuthContext } from "@/context/AuthContext";
import Link from 'next/link';
import { signOutUser } from '@/firebase/auth/signin';
import { successMessage } from '@/firebase/success_message';


const Navbar = () => {
  const { user } = useAuthContext()
 
  const signout = async () => {
    await signOutUser()
    return successMessage("Sign out successful")
  }

  useEffect(() => {
    const init = async () => {
      const { Collapse, Dropdown, Modal, Ripple, initTE } = await import("tw-elements");
      initTE({ Collapse, Dropdown, Modal, Ripple,});
    };
    init();
  }, []);

  if (!user) {
    return null; // Don't render the Navbar on the homepage
  }

  return (
      <nav
        className="z-[500] fixed flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-sm hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4"
        data-te-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div>
            <Link
              className="mx-2 my-1 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0"
              href="/dashboard"
            >
              <Logo />
            </Link>
          </div>

          {/* Hamburger button for mobile view */}
          <button
            className="block border-0 bg-transparent px-2 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
            type="button"
            data-te-collapse-init
            data-te-target="#navbarSupportedContent4"
            aria-controls="navbarSupportedContent4"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            {/* Hamburger icon */}
            <span className="[&>svg]:w-7">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-7 w-7"
              >
                <path
                  fillRule="evenodd"
                  d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </button>

          {/* Collapsible navbar container */}
          <div
            className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
            id="navbarSupportedContent4"
            data-te-collapse-item
          >
            {/* Left links */}
            <ul
              className="list-style-none mr-auto flex flex-col pl-0 lg:mt-1 lg:flex-row"
              data-te-navbar-nav-ref
            >
              {/* Home link */}
              <li
                className="my-4 pl-2 lg:my-0 lg:pl-2 lg:pr-1"
                data-te-nav-item-ref
              >
                <a
                  className="text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                  aria-current="page"
                  href="#"
                  data-te-nav-link-ref
                >
                  {/* Users */}
                </a>
              </li>
            </ul>

            <div className="md:flex md:flex-row items-center">
              <ul className="list-none text-sm font-medium mr-auto pl-6 flex flex-col md:mr-6 md:pl-0 lg:mt-1 lg:flex-row" data-te-navbar-nav-ref>
               
                 <li className="mb-4 pl-2 lg:mb-0 lg:pl-2 lg:pr-1" data-te-nav-item-ref>
                  <Link
                    className="p-0 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    href="/dashboard"
                    data-te-nav-link-ref
                  >
                    Users
                  </Link>
                </li>
                <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1" data-te-nav-item-ref>
                  <Link
                    className="p-0 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    href="/events"
                    data-te-nav-link-ref
                  >
                    Events
                  </Link>
                </li>
                <li className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1" data-te-nav-item-ref>
                  <Link
                    className="p-0 text-neutral-500 transition duration-200 hover:text-neutral-700 hover:ease-in-out focus:text-neutral-700 disabled:text-black/30 motion-reduce:transition-none dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400 lg:px-2 [&.active]:text-black/90 dark:[&.active]:text-neutral-400"
                    href="/newsletter"
                    data-te-nav-link-ref
                  >
                    Newsletter
                  </Link>
                </li>
              </ul>

              <div
              >
                <TextButton onClick={signout}>Sign Out</TextButton>
              </div>
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar
