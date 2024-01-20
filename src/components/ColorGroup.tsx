import React, { useEffect, useState } from "react";
import { Element as SVGElement } from "@svgdotjs/svg.js";
import { COLORS } from "../config/constants";
import ColorSquare from "./ColorSquare";
import colorSquare from "./ColorSquare";

export interface ColorGroupProps {
  className?: string;
  colorGroup: SVGElement;
  defaultColorIndex?: number;
  onGroupClick: () => void;
  groupSelected?: SVGElement;
}

const ColorGroup: React.FC<ColorGroupProps> = ({
  className,
  colorGroup,
  defaultColorIndex = 0,
  onGroupClick,
  groupSelected,
}) => {
  const [colorSelected, setColorSelected] = useState<string>(
    COLORS[defaultColorIndex],
  );

  useEffect(() => {
    colorGroup.children().forEach((child) => {
      child.fill(colorSelected);

      // nothing on focus
      if (!groupSelected) {
        child.css("cursor", "pointer");

        child.on("mouseenter", () => {
          child.stroke("#000");
        });
        child.on("mouseleave", () => {
          child.stroke(colorSelected);
        });
        child.on("click", () => {
          onGroupClick();
        });
      }
      // another on focus
      else if (groupSelected && groupSelected.id() !== colorGroup.id()) {
        child.css("cursor", "default");
        child.fill("#bdbdbd");
        child.stroke("#bdbdbd");
      }
      // on focus
      else if (groupSelected && groupSelected.id() === colorGroup.id()) {
        child.css("cursor", "not-allowed");
        child.stroke(colorSelected);

        child.on("mouseenter", () => {
          child.opacity(0.8);
        });
        child.on("mouseleave", () => {
          child.opacity(1);
        });
        child.on("click", () => {
          onGroupClick();
        });
      }
    });

    return () => {
      colorGroup.children().forEach((child) => {
        child.opacity(1);
        child.stroke(colorSelected);

        child.off("mouseenter");
        child.off("mouseleave");
        child.off("click");
      });
    };
  }, [colorGroup, colorSelected, groupSelected]);

  const handleMouseEnter = (color: string) => {
    colorGroup.children().forEach((child) => {
      child.fill(color);
      child.stroke(color);
    });
  };

  const handleMouseLeave = () => {
    colorGroup.children().forEach((child) => {
      child.fill(colorSelected);
      child.stroke(colorSelected);
    });
  };

  const handleClick = (color: string) => {
    setColorSelected(color);
  };

  return (
    <div className={`${className || ""}`}>
      <h3 className="mb-2 text-xl">{colorGroup.id()}</h3>
      <div className="flex flex-wrap gap-6">
        {COLORS.map((color) => (
          <ColorSquare
            color={color}
            selected={color === colorSelected}
            onMouseEnter={() => handleMouseEnter(color)}
            onMouseLeave={() => handleMouseLeave()}
            onClick={() => handleClick(color)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorGroup;
