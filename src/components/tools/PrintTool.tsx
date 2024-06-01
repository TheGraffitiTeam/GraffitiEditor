import React, { MouseEventHandler } from "react";
import { useToolStore } from "../../store.ts";

const PrintTool: React.FC<{
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ name, onClick }) => {
  const tool = useToolStore((state) => state.tool);
  return (
    <button
      onClick={onClick}
      title="Line Tool"
      className={`rounded-lg p-2 ${tool == name && "bg-slate-300"}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-printer"
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
        <path d="M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2" />
        <path d="M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4" />
        <path d="M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z" />
      </svg>
    </button>
  );
};

export default PrintTool;
