import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { Line, OrthographicCamera } from "@react-three/drei";
import { useDrawingStore } from "../store.ts";

interface props {
  className: string;
}

const DrawingArea: React.FC<props> = ({ className }) => {
  const canvas = useRef<HTMLDivElement>(null);
  const canvasParent = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);
  const [style, setStyle] = useState({});

  const lines = useDrawingStore((state) => state.lines);

  const ZoomInCanvas = () => {
    if (zoom < 2.75) {
      let _zoom = zoom + 0.1;
      setZoom(_zoom);
      setStyle({
        transform: `scale(${zoom})`,
      });
    }
  };

  const ZoomOutCanvas = () => {
    if (zoom > 0.5) {
      let _zoom = zoom - 0.1;
      setZoom(_zoom);
      setStyle({
        transform: `scale(${zoom})`,
      });
    }
  };

  return (
    <div
      ref={canvasParent}
      onWheel={(e) => {
        if (Math.sign(e.deltaY) == -1) {
          ZoomInCanvas();
        } else {
          ZoomOutCanvas();
        }
      }}
      className={
        className + " flex items-center justify-center overflow-hidden"
      }
    >
      <div
        ref={canvas}
        className="bg-white drop-shadow-xl w-[350px] h-[350px]"
        style={style}
      >
        <Canvas>
          {lines.map((line, index) => (
            <Line points={line} color="blue" linewidth={1} key={index} />
          ))}
          {/* <Line
            points={[
              [0, 0, 0],
              [(3.8 / 350) * 300, 0, 0],
            ]}
            color="blue"
            linewidth={1}
          /> */}
        </Canvas>
      </div>
      {/* <canvas
        style={style}
        className={`bg-white drop-shadow-xl`}
        width={300}
        height={300}
        ref={canvas}
      ></canvas> */}
    </div>
  );
};

export default DrawingArea;
