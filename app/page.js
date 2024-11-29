"use client";

import React, { useState, useEffect } from "react";
import { getData, checkServerStatus } from "@/service/api";

export default function Home() {
  const [Response, setResponse] = useState(false);
  const [Status, setStatus] = useState(false);
  const [LoaderActive, setLoaderActive] = useState(false);
  const [ResponseMessage, setResponseMessage] = useState(null);
  const [userInputMsg , setUserInputMsg] = useState("");

  //Fetch data from backend
  const handleGetData = (e) => {
    setUserInputMsg(e);
    setLoaderActive(true);
    getData(e)
      .then((response) => {
        setResponseMessage(response);
        document.querySelector("input").value = "";
        setLoaderActive(false);
      })
      .catch((e) => {
        Alert("SERVER ERROR : I am really Sorry for this Inconvenience.");
        // console.error(e);
        setLoaderActive(false);
      });
    setResponse(true);
  };

  // handle to fetch data after press enter key
  const handleEnterPress = (e) => {
    if (e.key === "Enter" && document.querySelector("input").value != "") {
      handleGetData(document.querySelector("input").value);
    }
  };

  //handle to fetch data after press Button
  const handlePressBtn = () => {
    if (document.querySelector("input").value != "") {
      handleGetData(document.querySelector("input").value);
    }
  };
  // Handle to Copy Code
  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text); // Use Clipboard API
      alert("Text copied to clipboard!");
    } catch (err) {
      // console.log("Failed to copy text: ", err);
      alert("Failed to copy text. Please try again.");
    }
  };

  // function to animate website title
  function typewriterEffect(text, elementId, speed) {
    const element = document.getElementById(elementId);
    let index = 0;

    function typeCharacter() {
      if (index < text.length) {
        element.innerHTML += text.charAt(index);
        index++;
        setTimeout(typeCharacter, speed);
      } else {
        // Stop blinking cursor after typing
        element.classList.remove("blinking-cursor");
      }
    }

    // Dynamically set the width to accommodate the full text
    element.style.width = `${text.length}ch`;
    typeCharacter();
  }

  useEffect(() => {
    typewriterEffect(" How may i help you!", "typewriter", 100);
    checkServerStatus().then((response) => setStatus(response));
  }, []);

  return (
    <>
      <div className="relative">
        {/* main frame */}
        {/* Background wallpaper */}
        <div
          className={`${
            Response ? "blur-[1px]" : ""
          } w-screen h-screen p-6 pb-20 md:pb-6 box-border flex items-end md:items-center justify-center`}
          style={{
            background: `
          linear-gradient(112.5deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%, rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%, rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%, rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%, rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%, rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%, rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%),
          linear-gradient(157.5deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%, rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%, rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%, rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%, rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%, rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%, rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%),
          linear-gradient(135deg, rgb(214, 214, 214) 0%, rgb(214, 214, 214) 10%, rgb(195, 195, 195) 10%, rgb(195, 195, 195) 53%, rgb(176, 176, 176) 53%, rgb(176, 176, 176) 55%, rgb(157, 157, 157) 55%, rgb(157, 157, 157) 60%, rgb(137, 137, 137) 60%, rgb(137, 137, 137) 88%, rgb(118, 118, 118) 88%, rgb(118, 118, 118) 91%, rgb(99, 99, 99) 91%, rgb(99, 99, 99) 100%),
          linear-gradient(90deg, rgb(195, 195, 195), rgb(228, 228, 228))
      `,
            backgroundBlendMode: "overlay, overlay, normal",
          }}
        >
          {/* Website logo */}
          <div className="font-bold md:text-2xl text-blue-950 flex items-center gap-2 select-none font-mono absolute text-left left-6 top-6">
            <div
              className={`${
                Status ? "bg-green-600" : "bg-red-500"
              } w-2 h-2 rounded-full`}
            ></div>
            <span>
              <span className="text-lg md:text-3xl">AI-</span>Generative
            </span>
          </div>

          {/* Main interface title with input field*/}
          <div className="w-full text-center">
            <div className="text-xl md:text-4xl hover:font-bold font-mono mb-2 md:mb-6">
              <span className="font-bold">Hello,</span>
              <span id="typewriter"></span>
            </div>
            <div className="flex justify-center">
              <div className="relative w-[95%] md:w-10/12">
                <input
                  type="text"
                  className="p-2 md:p-4 bg-transparent text-xl border-black  text-black w-full  border-2 rounded-full"
                  onKeyDown={handleEnterPress}
                />
                <span
                  className=" cursor-pointer select-none text-xl text-black md:py-4 p-2 md:px-6 bg-gray-500 hover:font-bold border-2 border-black rounded-e-full right-0  absolute"
                  onClick={handlePressBtn}
                >
                  <span className="flex md:hidden px-2 pb-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                      color="#000000"
                      fill="none"
                    >
                      <path
                        d="M4 15.5C2.89543 15.5 2 14.6046 2 13.5C2 12.3954 2.89543 11.5 4 11.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 15.5C21.1046 15.5 22 14.6046 22 13.5C22 12.3954 21.1046 11.5 20 11.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7 7L7 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17 7L17 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="7"
                        cy="3"
                        r="1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="17"
                        cy="3"
                        r="1"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.5 7H10.5C7.67157 7 6.25736 7 5.37868 7.90898C4.5 8.81796 4.5 10.2809 4.5 13.2069C4.5 16.1329 4.5 17.5958 5.37868 18.5048C6.25736 19.4138 7.67157 19.4138 10.5 19.4138H11.5253C12.3169 19.4138 12.5962 19.5773 13.1417 20.1713C13.745 20.8283 14.6791 21.705 15.5242 21.9091C16.7254 22.1994 16.8599 21.7979 16.5919 20.6531C16.5156 20.327 16.3252 19.8056 16.526 19.5018C16.6385 19.3316 16.8259 19.2898 17.2008 19.2061C17.7922 19.074 18.2798 18.8581 18.6213 18.5048C19.5 17.5958 19.5 16.1329 19.5 13.2069C19.5 10.2809 19.5 8.81796 18.6213 7.90898C17.7426 7 16.3284 7 13.5 7Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.5 15C10.0701 15.6072 10.9777 16 12 16C13.0223 16 13.9299 15.6072 14.5 15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9.00896 11H9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15.009 11H15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="hidden md:flex">GENERATE</span>
                </span>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <div className="md:visible invisible  font-bold absolute text-center bottom-6">
            AI-Generative |{" "}
            <span className="font-mono">
              This is my First AI based Project.{" "}
              <span className="underline italic text-sm text-blue-950">
                (Beta Version)
              </span>
            </span>
          </div>
        </div>

        {/* Response Frame */}
        {Response && (
          <div className="absolute top-0 flex items-center justify-center w-full h-full">
            <div className="w-[95%] md:w-8/12 h-8/12 max-h-[80%] md-max-h-[90%] px-3 pb-3 rounded-lg shadow-md bg-yellow-200 overflow-y-scroll">
              {/* Response frame title bar */}
              <div className="flex sticky top-0 z-10 pt-3 bg-yellow-200 justify-between px-4 font-bold border-b-2 border-black">
                <div className="font-mono text-xl">Response</div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setResponse(false);
                    setResponseMessage(null);
                    setLoaderActive(false);
                  }}
                >
                  X
                </div>
              </div>
              {/* Result Area */}
              <div className="p-4">
                <div className="mb-2 flex gap-2 items-center justify-start">
                  <svg
                    className="p-1 rounded-full bg-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#000000"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M7.5 17C9.8317 14.5578 14.1432 14.4428 16.5 17M14.4951 9.5C14.4951 10.8807 13.3742 12 11.9915 12C10.6089 12 9.48797 10.8807 9.48797 9.5C9.48797 8.11929 10.6089 7 11.9915 7C13.3742 7 14.4951 8.11929 14.4951 9.5Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span id="userInput" className="font-bold">{userInputMsg}</span>
                </div>
                {/* {!LoaderActive && (
                  <svg
                    className="p-1 mb-2 rounded-full bg-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    color="#000000"
                    fill="none"
                  >
                    <path
                      d="M4 16.4999C4 18.1567 5.34315 19.4999 7 19.4999C7 20.8806 8.11929 21.9999 9.5 21.9999C10.8807 21.9999 12 20.8806 12 19.4999C12 20.8806 13.1193 21.9998 14.5 21.9998C15.8807 21.9998 17 20.8805 17 19.4998C18.6569 19.4998 20 18.1566 20 16.4998C20 15.9311 19.8418 15.3994 19.567 14.9463C20.9527 14.6812 22 13.4628 22 11.9998C22 10.5367 20.9527 9.31831 19.567 9.05325C19.8418 8.60012 20 8.06842 20 7.49976C20 5.8429 18.6569 4.49976 17 4.49976C17 3.11904 15.8807 1.99976 14.5 1.99976C13.1193 1.99976 12 3.11914 12 4.49985C12 3.11914 10.8807 1.99985 9.5 1.99985C8.11929 1.99985 7 3.11914 7 4.49985C5.34315 4.49985 4 5.843 4 7.49985C4 8.06851 4.15822 8.60022 4.43304 9.05335C3.04727 9.3184 2 10.5368 2 11.9999C2 13.4629 3.04727 14.6813 4.43304 14.9464C4.15822 15.3995 4 15.9312 4 16.4999Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.5 14.4999L9.34189 8.97422C9.43631 8.69095 9.7014 8.49988 10 8.49988C10.2986 8.49988 10.5637 8.69095 10.6581 8.97422L12.5 14.4999M15.5 8.49988V14.4999M8.5 12.4999H11.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )} */}
                {LoaderActive && (
                  <div className="flex space-x-2 justify-center items-center bg-transparent dark:invert">
                    <span className="sr-only">Loading...</span>
                    <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-3 w-3 bg-black rounded-full animate-bounce"></div>
                  </div>
                )}
                {/* Mapping response */}
                {ResponseMessage &&
                  ResponseMessage.response.map((item, index) => (
                    <div key={index} className="font-sans" style={{ marginBottom: "10px" }}>
                      {item.type === "message" ? (
                        <div>
                          {item.content.split("\n").map((line, idx) => (
                            <React.Fragment key={idx}>
                              {line}
                              <br />
                            </React.Fragment>
                          ))}
                        </div>
                      ) : item.type === "code" ? (
                        <div className="relative">
                          <span
                            className="absolute right-2 top-2 cursor-pointer"
                            onClick={() => copyText(item.content)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width="20"
                              height="20"
                              color="#000000"
                              fill="none"
                            >
                              <path
                                d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          <pre
                            style={{
                              background: "#f4f4f4",
                              padding: "10px",
                              borderRadius: "5px",
                            }}
                          >
                            <code>{item.content}</code>
                          </pre>
                        </div>
                      ) : null}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
