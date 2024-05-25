import { create } from "zustand"



type ToolStore = {
    tool: "rect" | "line" | string;
}


export const useToolStore = create<ToolStore>(() => ({
    tool: "line"
}));