import React, { useEffect, useRef } from "react";
import { useDrawingStore, useMouseCoords, useToolStore } from "../store.ts";
import { doIntersect, drawLine } from "../lib/utils.ts";
import Vector3 from "../lib/Vector.ts";

interface props {
  className: string;
}

const DrawingArea: React.FC<props> = ({ className }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const canvasParent = useRef<HTMLDivElement>(null);

  const tool = useToolStore((state) => state.tool);
  const lines = useDrawingStore((state) => state.lines);
  const currentlines = useDrawingStore((state) => state.currentLine);
  const currentPolygone = useDrawingStore((state) => state.currentPolygone);

  useEffect(() => {
    console.log(tool);
  }, [tool]);

  useEffect(() => {
    if (canvas.current) {
      const ctx = canvas.current.getContext("2d");

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
    // Scale the context to ensure the correct drawing operations.
    context.scale(dpr, dpr);
    // Set the display size of the canvas.
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    // context.translate(width / 2, height / 2);
  }

  useEffect(() => {
    if (canvas.current && canvasParent.current) {
      const ctx = canvas.current.getContext("2d");

      if (ctx) {
        setCanvasResolution(
          canvas.current,
          ctx,
          canvasParent.current.clientWidth,
          canvasParent.current.clientHeight
        );
      }
    }
  }, []);

  return (
    <div
      className={
        className +
        " flex items-center justify-center overflow-hidden " +
        `${tool == "line" ? " cursor-crosshair" : ""}` +
        `${tool == "rect" ? " cursor-crosshair" : ""}` +
        `${tool == "eraser" ? " cursor-eraser" : ""}` +
        `${tool == "pen" ? " cursor-pen" : ""}`
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

                if (tool == "line" || tool == "eraser" || tool == "pen") {
                  useDrawingStore.setState({
                    isdrawing: true,
                  });

                  useDrawingStore.setState({
                    currentLine: [
                      new Vector3(
                        useMouseCoords.getState().start[0],
                        useMouseCoords.getState().start[1],
                        0
                      ),
                      new Vector3(
                        useMouseCoords.getState().start[0],
                        useMouseCoords.getState().start[1],
                        0
                      ),
                    ],
                  });
                }
              }
            }
          }}
          onMouseMove={(e) => {
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

                if (
                  tool == "line" &&
                  useDrawingStore.getState().isdrawing == true
                ) {
                  useDrawingStore.setState({
                    currentLine: [
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
                  });

                  ctx.clearRect(
                    0,
                    0,
                    canvas.current.width,
                    canvas.current.height
                  );

                  lines.forEach((line) => {
                    drawLine(
                      ctx as CanvasRenderingContext2D,
                      line[0].x,
                      line[0].y,
                      line[1].x,
                      line[1].y
                    );
                  });

                  const currentLine = useDrawingStore.getState().currentLine;
                  if (currentLine != null) {
                    drawLine(
                      ctx,
                      currentLine[0].x,
                      currentLine[0].y,
                      currentLine[1].x,
                      currentLine[1].y
                    );
                  }
                } else if (
                  tool == "eraser" &&
                  useDrawingStore.getState().isdrawing == true
                ) {
                  useDrawingStore.setState({
                    currentLine: [
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
                  });

                  ctx.clearRect(
                    0,
                    0,
                    canvas.current.width,
                    canvas.current.height
                  );

                  lines.forEach((line) => {
                    drawLine(
                      ctx as CanvasRenderingContext2D,
                      line[0].x,
                      line[0].y,
                      line[1].x,
                      line[1].y
                    );
                  });

                  const currentLine = useDrawingStore.getState().currentLine;
                  if (currentLine != null) {
                    drawLine(
                      ctx,
                      currentLine[0].x,
                      currentLine[0].y,
                      currentLine[1].x,
                      currentLine[1].y,
                      "rgba(255, 230, 0, 0.5)",
                      20
                    );
                  }
                } else if (
                  tool == "pen" &&
                  useDrawingStore.getState().isdrawing == true
                ) {
                  // useDrawingStore.setState({
                  //   currentLine: [
                  //     new Vector3(
                  //       useMouseCoords.getState().start[0],
                  //       useMouseCoords.getState().start[1],
                  //       0
                  //     ),
                  //     new Vector3(
                  //       useMouseCoords.getState().end[0],
                  //       useMouseCoords.getState().end[1],
                  //       0
                  //     ),
                  //   ],
                  // });
                  // ctx.clearRect(
                  //   0,
                  //   0,
                  //   canvas.current.width,
                  //   canvas.current.height
                  // );
                  // lines.forEach((line) => {
                  //   drawLine(
                  //     ctx as CanvasRenderingContext2D,
                  //     line[0].x,
                  //     line[0].y,
                  //     line[1].x,
                  //     line[1].y
                  //   );
                  // });
                  // const currentLine = useDrawingStore.getState().currentLine;
                  // if (currentLine != null) {
                  //   drawLine(
                  //     ctx,
                  //     currentLine[0].x,
                  //     currentLine[0].y,
                  //     currentLine[1].x,
                  //     currentLine[1].y
                  //   );
                  // }
                }
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
                    currentLine: [
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
                  });

                  useDrawingStore.setState({
                    lines: [...lines, currentlines as [Vector3, Vector3]],
                  });

                  useDrawingStore.setState({
                    isdrawing: false,
                  });
                } else if (tool == "eraser") {
                  useDrawingStore.setState({
                    isdrawing: false,
                  });
                  const newLines = lines.filter((line) => {
                    return !doIntersect(
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
                      [
                        new Vector3(line[0].x, line[0].y, 0),
                        new Vector3(line[1].x, line[1].y, 0),
                      ]
                    );
                  });

                  useDrawingStore.setState({
                    lines: newLines,
                  });
                } else if (tool == "pen") {
                  useDrawingStore.setState({
                    currentPolygone: [
                      ...currentPolygone,
                      new Vector3(
                        useMouseCoords.getState().end[0],
                        useMouseCoords.getState().end[1],
                        0
                      ),
                    ],
                  });
                }
              }
            }
          }}
          onContextMenu={(e) => {
            e.preventDefault();

            if (tool == "pen" && useDrawingStore.getState().isdrawing == true) {
              let arr: Vector3[][] = [];

              currentPolygone.forEach((point, index) => {
                if (index < currentPolygone.length - 1) {
                  arr.push([point, currentPolygone[index + 1]]);
                }
              });

              useDrawingStore.setState({
                lines: [...lines, ...arr],
              });

              useDrawingStore.setState({
                isdrawing: false,
                currentPolygone: [],
              });
            }
          }}
          className="absolute top-0 left-0 w-full bg-white"
          ref={canvas}
        ></canvas>
      </div>
    </div>
  );
};

export default DrawingArea;
