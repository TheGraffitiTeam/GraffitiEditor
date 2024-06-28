import React, { MouseEventHandler } from "react";
import { useToolStore } from "../../store.ts";

const EraserTool: React.FC<{
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
        className="icon icon-tabler icon-tabler-eraser"
        width="28"
        height="28"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#2c3e50"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" />
        <path d="M18 13.3l-6.3 -6.3" />
      </svg>
    </button>
  );
};

export default EraserTool;
