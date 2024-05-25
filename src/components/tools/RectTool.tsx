import React, { MouseEventHandler } from "react";
import { useToolStore } from "../../store.ts";

const LineTool: React.FC<{
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ name, onClick }) => {
  const tool = useToolStore((state) => state.tool);

  return (
    <button
      onClick={onClick}
      title="Rectangle Tool"
      className={`rounded-lg p-2 ${tool == name && "bg-slate-300"}`}
    >
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
  );
};

export default LineTool;
