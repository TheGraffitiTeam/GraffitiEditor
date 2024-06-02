import { LineProps } from "@react-three/drei";
import { ForwardRefComponent } from "@react-three/drei/helpers/ts-utils";
import { Line2, LineSegments2 } from "three/examples/jsm/Addons.js";
import { create } from "zustand"



type ToolStore = {
    tool: "rect" | "line" | string;
}


export const useToolStore = create<ToolStore>(() => ({
    tool: "line"
}));



type drawingProps = {
    lines: any[];
}

export const useDrawingStore = create<drawingProps>(() => ({
    lines: []
}));