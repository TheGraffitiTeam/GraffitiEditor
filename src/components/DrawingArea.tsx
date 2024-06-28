import React, { useEffect, useRef } from "react";
import { useDrawingStore, useMouseCoords, useToolStore } from "../store.ts";
import { drawLine } from "../lib/utils.ts";
import Vector3 from "../lib/Vector.ts";

interface props {
  className: string;
}

const DrawingArea: React.FC<props> = ({ className }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const canvasParent = useRef<HTMLDivElement>(null);

  const tool = useToolStore((state) => state.tool);
  const lines = useDrawingStore((state) => state.lines);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key == "z" && e.ctrlKey) {
        if (lines.length > 0) {
          if (canvas.current) {
            const ctx = canvas.current.getContext("2d");

            useDrawingStore.setState((state) => {
              state.lines.pop();
              return state;
            });

            if (ctx) {
              ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

              lines.forEach((line) => {
                drawLine(
                  ctx as CanvasRenderingContext2D,
                  line[0].x,
                  line[0].y,
                  line[1].x,
                  line[1].y
                );
              });
            }
          }
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");

      if (ctx) {
        setCanvasResolution(
          canvas.current,
          ctx,
          canvas.current.clientWidth,
          canvas.current.clientHeight
        );

        ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

        lines.forEach((line) => {
          drawLine(
            ctx as CanvasRenderingContext2D,
            line[0].x,
            line[0].y,
            line[1].x,
            line[1].y
          );
        });
      }
    }
  }, [lines]);

  function setCanvasResolution(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Set the size of the drawing buffer based on the device pixel ratio.
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    console.log(canvas.width, canvas.height, dpr);
    // Scale the context to ensure the correct drawing operations.
    context.scale(dpr, dpr);
    // Set the display size of the canvas.
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    // context.translate(width / 2, height / 2);
  }

  return (
    <div
      ref={canvasParent}
      className={
        className +
        " flex items-center justify-center overflow-hidden " +
        `${tool == "line" ? " cursor-crosshair" : ""}` +
        `${tool == "rect" ? " cursor-crosshair" : ""}`
      }
    >
      <div ref={canvasParent} className="drop-shadow-xl w-full h-full relative">
        <canvas
          onMouseDown={(e) => {
            if (canvas.current) {
              const ctx = canvas.current.getContext("2d");

              if (ctx) {
                const canvasRect = canvas.current.getBoundingClientRect();
                const offsetX = canvasRect.left;
                const offsetY = canvasRect.top;

                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;
                // Start drawing logic here

                useMouseCoords.setState({
                  start: [Math.floor(x), Math.floor(y)],
                });
              }
            }
          }}
          onMouseUp={(e) => {
            if (canvas.current) {
              const ctx = canvas.current.getContext("2d");

              if (ctx) {
                const canvasRect = canvas.current.getBoundingClientRect();
                const offsetX = canvasRect.left;
                const offsetY = canvasRect.top;

                const x = e.clientX - offsetX;
                const y = e.clientY - offsetY;
                // Start drawing logic here

                useMouseCoords.setState({
                  end: [Math.floor(x), Math.floor(y)],
                });

                if (tool == "line") {
                  useDrawingStore.setState({
                    lines: [
                      ...lines,
                      [
                        new Vector3(
                          useMouseCoords.getState().start[0],
                          useMouseCoords.getState().start[1],
                          0
                        ),
                        new Vector3(
                          useMouseCoords.getState().end[0],
                          useMouseCoords.getState().end[1],
                          0
                        ),
                      ],
                    ],
                  });
                }

                console.log(
                  `(${useMouseCoords.getState().start[0]}, ${
                    useMouseCoords.getState().start[1]
                  }) - (${useMouseCoords.getState().end[0]}, ${
                    useMouseCoords.getState().end[1]
                  })`
                );

                console.log(lines);
              }
            }
          }}
          className="absolute top-0 left-0 w-full h-full bg-white"
          ref={canvas}
        ></canvas>
      </div>
    </div>
  );
};

export default DrawingArea;
