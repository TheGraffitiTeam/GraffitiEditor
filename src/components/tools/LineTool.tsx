import React, { MouseEventHandler } from "react";
import { useDrawingStore, useToolStore } from "../../store.ts";

const LineTool: React.FC<{
  name: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}> = ({ name, onClick }) => {
  const tool = useToolStore((state) => state.tool);
  const lines = useDrawingStore((state) => state.lines);

  return (
    <button
      onClick={(e) => {
        onClick(e);
        useDrawingStore.setState({
          lines: [
            [
              [0, 0, 0],
              [(3.8 / 350) * 300, 0, 0],
            ],
          ],
        });
      }}
      title="Line Tool"
      className={`rounded-lg p-2 ${tool == name && "bg-slate-300"}`}
    >
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
  );
};

export default LineTool;
