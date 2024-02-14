"use client";
import { TimeIcon } from "@/app/components/Icon";
import { User } from "@prisma/client";
import Avatar from "./Avatar";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";

import { usePathname } from "next/navigation";

import Link from "next/link";

function Example(props: any) {
  const pathname = usePathname();

  return (
    <div className="w-56 text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex w-full justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75">
            <Avatar text={"I"} size="medium" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            style={{ zIndex: "2" }}
            className="absolute right-0 mt-2 w-72 origin-top-right bg-gray-50 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black/5 focus:outline-none"
          >
            <div className="flex px-6 py-3">
              <Avatar text="I" size="large" />

              <div>
                <p className="font-semibold">Inyeneobong Akpabio</p>
                <p className="text-sm text-gray-600">Active</p>
              </div>
            </div>
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href={pathname + "/profile/" + props.currentUser.id}
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <EditActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <EditInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Profile
                  </Link>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <ArchiveActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArchiveInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Archive
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <MoveActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <MoveInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Move
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-6 py-2 text-sm`}
                  >
                    Sign Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

function EditInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function ArchiveInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function ArchiveActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="8"
        width="10"
        height="8"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <rect
        x="4"
        y="4"
        width="12"
        height="4"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveInactiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function MoveActiveIcon(props: any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

const Nav = ({ currentUser }: { currentUser: User }) => {



  return (
    <nav>
      <div className="grid grid-cols-10 py-2">
        <div className="col-span-2">
          <div className="flex justify-end pr-5 pt-2">
            <TimeIcon />
          </div>
        </div>
        <div className="col-span-8">
          <div className="flex justify-between pr-4">
            <div className="search-container">
              <input
                type="text"
                name=""
                id=""
                className="p-1"
                placeholder="Search Company"
              />
            </div>
            {/* <Avatar text={currentUser.name[0]} size="medium" /> */}
            <Example currentUser={currentUser} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
