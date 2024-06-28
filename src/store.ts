import { create } from "zustand";

export type ToolStore = {
  tool: "rect" | "line" | "eraser" | "pen" | string;
};

export const useToolStore = create<ToolStore>(() => ({
  tool: "line",
}));

export type drawingProps = {
  isdrawing: boolean;
  lines: Vector3[][];
};

export const useDrawingStore = create<drawingProps>(() => ({
  isdrawing: false,
  lines: [],
}));

export type mouseCoords = {
  start: [number, number];
  end: [number, number];
};

export const useMouseCoords = create<mouseCoords>(() => ({
  start: [0, 0],
  end: [0, 0],
}));

export type keysEventsProps = {
  commandMode: boolean;
};

export const useKeysEvents = create<keysEventsProps>(() => ({
  commandMode: false,
}));
