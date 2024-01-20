import React from "react";

export interface ColorSquareProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  color: string;
  selected?: boolean;
}

const ColorSquare: React.FC<ColorSquareProps> = ({
  className,
  color,
  selected = false,
  ...props
}) => {
  return (
    <div
      className={`${
        className || ""
      } w-12 h-12 rounded cursor-pointer hover:scale-110 duration-300 ${
        selected ? "outline outline-offset-4" : ""
      } `}
      style={{ backgroundColor: color, outlineColor: color }}
      {...props}
    ></div>
  );
};

export default ColorSquare;
