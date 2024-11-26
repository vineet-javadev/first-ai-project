"use client";

import React, { useState, useEffect } from "react";
import { getData } from "@/service/api";

export default function Home() {
  const [Response, setResponse] = useState(false);
  const [LoaderActive, setLoaderActive] = useState(false);
  const [ResponseMessage, setResponseMessage] = useState(null);

  const handleEnterPress = (e) => {
    if (e.key === "Enter" && document.querySelector("input").value != "") {
      setLoaderActive(true);
      getData(document.querySelector("input").value)
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
    }
  };

  const copyText =async (text) => {
    try {
      await navigator.clipboard.writeText(text); // Use Clipboard API
      alert("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
      alert("Failed to copy text. Please try again.");
    }

  };

  return (
    <>
      <div className="relative">
        {/* main frame */}
        <div
          className={`${Response ? "blur-[1px]" : ""} w-screen h-screen p-6 box-border flex items-center justify-center`}
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
          <div className="font-bold text-2xl text-blue-950 select-none font-mono absolute text-left left-6 top-6">
            <span className="text-3xl">AI-</span>Generative
          </div>

          <div className="w-full text-center">
            <div className="text-4xl hover:font-bold font-mono mb-6">
              <span className="font-bold">Hello,</span> How may I help you!
            </div>
            <div className="flex justify-center">
              <div className="relative w-10/12">
                <input
                  type="text"
                  className="p-4 bg-transparent text-xl border-black  text-black w-full  border-2 rounded-full"
                  onKeyDown={handleEnterPress}
                />
                <span
                  className=" cursor-pointer select-none text-xl text-black py-4 px-6 bg-gray-500 hover:font-bold border-2 border-black rounded-e-full right-0  absolute"
                  onClick={() => {
                    if (document.querySelector("input").value != "") {
                      getData(document.querySelector("input").value)
                        .then((response) => {
                          setResponseMessage(response);
                          document.querySelector("input").value = "";
                        })
                        .catch((e) => {
                          alert("I am really Sorry for this Inconvenience.");
                          console.error(e);
                        });
                      setResponse(true);
                    }
                  }}
                >
                  GENERATE
                </span>
              </div>
            </div>
          </div>
          <div className="font-bold absolute text-center bottom-6">
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
            <div className="w-8/12 h-8/12 max-h-[90%] px-3 pb-3 rounded-lg shadow-md bg-yellow-200 overflow-y-scroll">
              <div className="flex sticky top-0 z-10 pt-3 bg-yellow-200 justify-between px-4 font-bold border-b-2 border-black">
                <div>Response</div>
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
              <div className="p-4">
                {LoaderActive && (
                  <div className="flex space-x-2 justify-center items-center bg-transparent dark:invert">
                    <span className="sr-only">Loading...</span>
                    <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-3 w-3 bg-black rounded-full animate-bounce"></div>
                  </div>
                )}
                {/* {ResponseMessage == "" ? "Generating..." : <pre>{ResponseMessage}</pre>} */}
                {/* <ul>
                  {Array.isArray(ResponseMessage) && ResponseMessage.length > 0
                    ? ResponseMessage.map((item, index) => {
                        if (item.type === "code") {
                          return (
                            <li key={index}>
                              <pre>{item.content}</pre>
                            </li>
                          );
                        } else {
                          return (
                            <li key={index}>
                              <p>{item.content}</p>
                            </li>
                          );
                        }
                      })
                    : <li>Generating...</li>}
                </ul> */}
                {ResponseMessage &&
                  ResponseMessage.response.map((item, index) => (
                    <div key={index} style={{ marginBottom: "10px" }}>
                      {item.type === "message" ? (
                        <p>{item.content}</p>
                      ) : item.type === "code" ? (
                        <div className="relative">
                          <span className="absolute right-2 top-2 cursor-pointer" onClick={()=>copyText(item.content)}>
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
