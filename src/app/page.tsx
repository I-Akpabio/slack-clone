"use client";
import Image from "next/image";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Collapse } from "react-collapse";
import { useState } from "react";
import {
  BottomArrow,
  CloseIcon,
  EditIcon,
  HashIcon,
  InfoIcon,
  PhoneIcon,
  StarIcon,
  TimeIcon,
} from "./components/Icon";

const Time = () => (
  <div className="time-container">
    <div className="flex justify-center">
      <p className="time-text">Monday, March 1st </p>
    </div>

    <hr style={{ marginTop: "-17px" }} />
  </div>
);

const ChatMessage = ({ name, message }: { name?: any, message?:any }) => (
  <div className="flex mt-3">
    <img className="self-baseline mr-2" src="profile.png" alt="" />
    <div className="grow">
      <div className="flex items-center">
        <h5 className="font-bold">{name || "Joe Addams"}</h5>
        <p className="ml-3 light-2">6:59pm</p>
      </div>

      <p>
        {message ||"   Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consectetur odit incidunt nihil quo, quidem obcaecati porro voluptatem tenetur praesentium sit!"}
     
      </p>
    </div>
  </div>
);

export default function Home() {
  const [thread, setThread] = useState("jhh");
  const [openDirect, setOpenDirect] = useState(false);

  return (
    <main className="">
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

              <img src="profile3.png" />
            </div>
          </div>
        </div>
      </nav>
      <div className="grid grid-cols-10">
        <div className="col-span-2 side-menu">
          <div className="flex mt-1">
            {/* <div
              style={{
                borderRight: "1px solid rgba(255,255,255,0.3)",
                height: "95vh",
                paddingRight: "10px",
              }}
            >
              <p className="profile-card">A</p>
              <p className="profile-card">B</p>
              <p className="profile-card">C</p>
            </div> */}

            <div className="grow pl-4">
              <div className="flex items-center justify-between pl-3 pr-6">
                <p style={{opacity: 1}} className="main-user">Desiginer KRS </p>

                <button onClick={() => setThread(thread ? "" : "esgfsdg")}>
                  <EditIcon />
                </button>
              </div>

              <hr className="my-4 opacity-30" />

              <div>
                <div className="flex items-center mb-1">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.63437 0.134506C6.99224 -0.13559 8.3997 0.00303295 9.67879 0.532846C10.9579 1.06266 12.0511 1.95987 12.8203 3.11101C13.5895 4.26216 14 5.61553 14 7V8.05C14 8.69978 13.7419 9.32295 13.2824 9.78241C12.8229 10.2419 12.1998 10.5 11.55 10.5C10.9002 10.5 10.2771 10.2419 9.81759 9.78241C9.70753 9.67235 9.60903 9.5529 9.52286 9.42595C9.50704 9.44239 9.49104 9.45871 9.47487 9.47487C8.8185 10.1313 7.92826 10.5 7 10.5C6.07174 10.5 5.18151 10.1313 4.52513 9.47487C3.86875 8.8185 3.5 7.92826 3.5 7C3.5 6.07174 3.86875 5.18151 4.52513 4.52513C5.18151 3.86875 6.07174 3.5 7 3.5C7.92826 3.5 8.8185 3.86875 9.47487 4.52513C10.1313 5.18151 10.5 6.07174 10.5 7V8.05C10.5 8.32848 10.6106 8.59555 10.8075 8.79246C11.0045 8.98938 11.2715 9.1 11.55 9.1C11.8285 9.1 12.0955 8.98938 12.2925 8.79246C12.4894 8.59555 12.6 8.32848 12.6 8.05V7C12.6 5.89243 12.2716 4.80972 11.6562 3.88881C11.0409 2.96789 10.1663 2.25013 9.14303 1.82628C8.11976 1.40243 6.99379 1.29153 5.9075 1.50761C4.8212 1.72368 3.82338 2.25703 3.0402 3.0402C2.25703 3.82338 1.72368 4.8212 1.50761 5.9075C1.29153 6.99379 1.40243 8.11976 1.82628 9.14303C2.25013 10.1663 2.96789 11.0409 3.88881 11.6562C4.80972 12.2716 5.89243 12.6 7 12.6H7.00069C7.98366 12.601 8.94907 12.3426 9.79909 11.8501C10.1336 11.6563 10.5619 11.7704 10.7557 12.1049C10.9495 12.4394 10.8354 12.8677 10.5009 13.0615C9.43671 13.678 8.22861 14.0012 6.99931 14L7 13.3V14C6.99977 14 6.99954 14 6.99931 14C5.61508 13.9999 4.26196 13.5893 3.11101 12.8203C1.95987 12.0511 1.06266 10.9579 0.532846 9.67879C0.00303295 8.3997 -0.13559 6.99224 0.134506 5.63437C0.404603 4.2765 1.07129 3.02922 2.05026 2.05026C3.02922 1.07129 4.2765 0.404603 5.63437 0.134506ZM9.1 7C9.1 6.44305 8.87875 5.9089 8.48493 5.51508C8.0911 5.12125 7.55696 4.9 7 4.9C6.44305 4.9 5.9089 5.12125 5.51508 5.51508C5.12125 5.9089 4.9 6.44305 4.9 7C4.9 7.55696 5.12125 8.0911 5.51508 8.48493C5.9089 8.87875 6.44305 9.1 7 9.1C7.55696 9.1 8.0911 8.87875 8.48493 8.48493C8.87875 8.0911 9.1 7.55696 9.1 7Z"
                      fill="white"
                    />
                  </svg>

                  <span className="ml-4">Mentions & reactions</span>
                </div>

                <div className="flex items-center mb-1">
                  <svg
                    width="10"
                    height="14"
                    viewBox="0 0 10 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      opacity="0.7"
                      d="M1 2.5C1 1.67157 1.67157 1 2.5 1H7.5C8.32843 1 9 1.67157 9 2.5V13L5 9.57143L1 13V2.5Z"
                      stroke="white"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>

                  <span className="ml-4">Saved items</span>
                </div>

                <hr className="my-4 opacity-30" />
                <div className="flex items-center mb-1">
                  <BottomArrow />

                  <span className="ml-4">Channels</span>
                </div>

                <Collapse isOpened={openDirect}>
                  <div className="flex items-center ml-4 mt-2">
                    <HashIcon />
                    <span className="ml-3 opacity-70">clubhouse</span>
                  </div>
                  <div className="flex items-center ml-4 mt-1">
                    {" "}
                    <HashIcon />
                    <span className="ml-3 opacity-70">webinar</span>
                  </div>
                  <div className="flex items-center ml-4 mt-1">
                    {" "}
                    <HashIcon />
                    <span className="ml-3 opacity-70">webinar</span>
                  </div>
                  <div className="flex items-center ml-4 mt-1">
                    {" "}
                    <HashIcon />
                    <span className="ml-3 opacity-70">webinar</span>
                  </div>
                  <div className="flex items-center ml-4 mt-1">
                    {" "}
                    <HashIcon />
                    <span className="ml-3 opacity-70">webinar</span>
                  </div>
                </Collapse>

                <button
                  className="mt-3"
                  onClick={() => setOpenDirect(!openDirect)}
                >
                  <div className="flex items-center">
                    {" "}
                    <BottomArrow />
                    <span className="ml-4">Direct Messages</span>
                  </div>
                </button>

                <Collapse isOpened={openDirect}>
                  {["Juwon", "Alley", "Kalii", "Cameron"].map((i) => (
                    <div className="flex items-center ml-4 mt-2">
                      <img
                        height={18}
                        width={18}
                        className="self-baseline mr-2"
                        src="profile2.png"
                        alt=""
                      />
                      <span>{i}</span>
                    </div>
                  ))}
                </Collapse>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            thread ? "col-span-5 " : "col-span-8 "
          } p-5 p-5 center-container`}
        >
          {thread ? (
            <div
              className="flex justify-between w-100 pb-4"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.3)" }}
            >
              <div className="flex items-center">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="4" r="4" fill="#34785C" />
                </svg>
                <span className="mx-3 font-bold">Jane</span>
                <StarIcon />
              </div>

              <div className="flex">
                <span className="mr-4">
                  <PhoneIcon />
                </span>

                <InfoIcon />
              </div>
            </div>
          ) : (
            <div
              className="flex justify-between w-100 pb-4"
              style={{ borderBottom: "1px solid rgba(0,0,0,0.3)" }}
            >
              <div className="flex items-center">
                <span className="mx-3 font-bold">#uiux_design</span>
                <StarIcon />
              </div>

              <div className="flex">
                <span className="mr-4">
                  <PhoneIcon />
                </span>

                <InfoIcon />
              </div>
            </div>
          )}

          <div className="main-section">
            <Time />

            <ChatMessage name="Jane addams" />

            <ChatMessage />

            <Time />

            <ChatMessage />

            <ChatMessage message={"Hello"} />

            <input
              className="mt-5"
              type="text"
              placeholder="type Message here"
            />

            {/* <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Hello from CKEditor&nbsp;5!</p>"
                    onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event ) => {
                        console.log( event );
                    } }
                    onBlur={ ( event, editor ) => {
                        console.log( 'Blur.', editor );
                    } }
                    onFocus={ ( event, editor ) => {
                        console.log( 'Focus.', editor );
                    } }
                /> */}
          </div>
        </div>

        {thread && (
          <div className="col-span-3 py-2 px-3">
            <div className="flex justify-between">
              <div>
                <h4 className="font-bold">Thread</h4>
                <p className="light-2">#uiux_design</p>
              </div>

              <button onClick={() => setThread("")}>
                <CloseIcon />
              </button>
            </div>

            <ChatMessage name={"John Addams"} />
            <ChatMessage />
            <ChatMessage name={"John Addams"} />
          </div>
        )}
      </div>
    </main>
  );
}