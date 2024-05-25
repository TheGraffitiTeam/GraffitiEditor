import React, { MouseEventHandler } from "react";

import LineTool from "./tools/LineTool.tsx";
import RectTool from "./tools/RectTool.tsx";
import { useToolStore } from "../store.ts";

interface props {
  className: string;
}

const tools: {
  id: string;
  element: React.FC<{
    name: string;
    onClick: MouseEventHandler<HTMLButtonElement>;
  }>;
}[] = [
  {
    id: "rect",
    element: LineTool,
  },
  {
    id: "line",
    element: RectTool,
  },
];

const ToolBar: React.FC<props> = ({ className }) => {
  return (
    <div className={className + " flex items-center justify-center"}>
      <div className="flex items-center justify-content bg-slate-100 py-2 px-4 gap-6 rounded-2xl shadow">
        {tools.map((tool, index) => (
          <tool.element
            name={tool.id}
            onClick={() => {
              useToolStore.setState({ tool: tool.id });
            }}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolBar;
