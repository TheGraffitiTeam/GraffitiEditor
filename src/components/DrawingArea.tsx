import React, { useEffect, useRef, useState } from "react";

interface props {
  className: string;
}

const DrawingArea: React.FC<props> = ({ className }) => {
  const canvas = useRef<HTMLCanvasElement>(null);
  const canvasParent = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(1);
  const [style, setStyle] = useState({});

  useEffect(() => {
    if (canvas.current != null) {
      //   const ctx = canvas.current.getContext("2d");
    }
  }, []);

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
    if (zoom > 0.95) {
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
      <canvas
        style={style}
        className={`bg-white drop-shadow-xl`}
        width={300}
        height={300}
        ref={canvas}
      ></canvas>
    </div>
  );
};

export default DrawingArea;
