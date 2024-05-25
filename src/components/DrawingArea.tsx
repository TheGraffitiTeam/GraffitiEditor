import React from "react";

interface props {
  className: string;
}

const DrawingArea: React.FC<props> = ({ className }) => {
  return <div className={className}></div>;
};

export default DrawingArea;
