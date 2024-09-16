import React, { MouseEventHandler } from "react";
import { invoke } from "@tauri-apps/api/tauri";

import { useDrawingStore } from "../store.ts";
import LineTool from "./tools/LineTool.tsx";
import RectTool from "./tools/PenTool.tsx";
import { useToolStore } from "../store.ts";
import PrintTool from "./tools/PrintTool.tsx";
import EraserTool from "./tools/EraserTool.tsx";

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
    id: "pen",
    element: RectTool,
  },
  {
    id: "line",
    element: LineTool,
  },
  {
    id: "eraser",
    element: EraserTool,
  },
  {
    id: "print",
    element: PrintTool,
  },
];

const ToolBar: React.FC<props> = ({ className }) => {

  const drawingStore = useDrawingStore();

  return (
    <div className={className + " flex items-center justify-center"}>
      <div className="flex items-center justify-content bg-slate-100 py-2 px-2 gap-6 rounded-2xl shadow">
        {tools.map((tool, index) => (
          <tool.element
            name={tool.id}
            onClick={() => {
              useToolStore.setState({ tool: tool.id });

              // this is a failsafe for not printing for other tools
              if (tool.id !== "print") {return 0;}

              // convert lines to json string
              const jsonArray = drawingStore.lines.map(row =>
                row.map(vector =>
                    ({ x: vector.x, y: vector.y})
                )
              );
              // const jsonString = JSON.stringify(jsonArray);
              const jsonString = JSON.stringify({
                coordinates: jsonArray
              });

              console.log(jsonString);
              
              // invoke call invokes print command on rust backend
              invoke("print", { data: jsonString })
              .then(()=>{console.log("invoked")});
            }}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ToolBar;
