import { useState } from "react";
import useravatar from "../assets/image/useravatar.png";

export default function Header(props: any) {
  const { saveChart, addUser, chartCount, setCurChart } = props;
  const [showStatus, setShowStatus] = useState(false);
  return (
    <div className="fixed right-0 z-10">
      <div className="relative">
        <div onClick={() => setShowStatus(!showStatus)}>
          <a
            className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
            href="#"
          >
            <svg
              className="w-8 h-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>
          </a>
        </div>
        <div
          className={`absolute top-[100%] right-0 p-2 border-2 rounded-lg flex-col items-center ${
            !showStatus ? "hidden" : "flex"
          }`}
        >
          <a className="flex items-center w-full px-3 mt-3" href="#">
            <svg
              className="w-8 h-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
            </svg>
            <span className="ml-2 text-sm font-bold">The App</span>
          </a>
          <div className="w-full px-2">
            <div className="flex flex-col items-center w-full mt-3 border-t border-gray-300">
              <img
                src={useravatar}
                alt="useravatar"
                className=" w-[60px] h-[60px] float-right mt-4"
              />
              <div className="flex items-center w-full h-12 px-3 mt-1 rounded ">
                <span className="ml-2 text-sm font-medium">TestName</span>
                <span className="ml-2 text-sm font-medium">
                  example@mail.com
                </span>
              </div>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 hover:bg-gray-300 rounded hover:cursor-pointer"
                onClick={saveChart}
              >
                <svg
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Save</span>
              </a>
              <a
                className="flex items-center w-full h-12 px-3 mt-2 hover:bg-gray-300 rounded hover:cursor-pointer"
                onClick={addUser}
              >
                <svg
                  className="w-6 h-6 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="ml-2 text-sm font-medium">Add User</span>
              </a>
            </div>
          </div>
          {Array.from({ length: chartCount }).map((_, index) => (
            <a
              key={index}
              className="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-300"
              onClick={() => setCurChart(index)}
              href="#"
            >
              <svg
                className="w-6 h-6 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                />
              </svg>
              <span className="ml-2 text-sm font-medium">
                Chart {index + 1}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
