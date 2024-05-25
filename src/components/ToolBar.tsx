import React from "react";

interface props {
  className: string;
}

const ToolBar: React.FC<props> = ({ className }) => {
  return (
    <div className={className + " flex items-center justify-center"}>
      <div className="flex items-center justify-content bg-slate-100 py-2 px-4 gap-6 rounded-full shadow">
        <button title="Line Tool" className="rounded-lg p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-slash"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="black"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M17 5l-10 14" />
          </svg>
        </button>

        <button title="Rectangle Tool" className="rounded-lg p-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-crop-1-1"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#000000"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ToolBar;
