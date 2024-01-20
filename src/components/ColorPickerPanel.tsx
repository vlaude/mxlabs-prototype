import React, { useEffect, useState } from "react";
import { Element as SVGElement, SVG } from "@svgdotjs/svg.js";
import ColorGroup from "./ColorGroup";
import { COLORS } from "../config/constants";
import { MdClose } from "react-icons/md";

export interface ColorPickerPanelProps {
  className?: string;
}

const ColorPickerPanel: React.FC<ColorPickerPanelProps> = ({ className }) => {
  const [groups, setGroups] = useState<SVGElement[]>([]);

  const [groupSelected, setGroupSelected] = useState<SVGElement>();

  useEffect(() => {
    const svg = SVG("#moto-svg");
    const _groups = svg.children().filter((child) => child.type === "g");
    setGroups(_groups);
  }, []);

  return (
    <div className={`${className || ""} flex flex-col`}>
      {groupSelected ? (
        <div
          className="self-end cursor-pointer hover:opacity-50"
          onClick={() => setGroupSelected(undefined)}
        >
          <MdClose className="h-8 w-8" />
        </div>
      ) : null}

      {groups.map((group, index) => (
        <>
          <div key={group.id()}>
            {groupSelected &&
            groupSelected.parent()?.id() !== group.id() ? null : (
              <h2 className="mb-2 text-2xl font-semibold text-center">
                {group.id()}
              </h2>
            )}

            <div className="flex flex-col gap-8">
              {group.children().map((child) => (
                <ColorGroup
                  className={`${
                    groupSelected && groupSelected.id() !== child.id()
                      ? "hidden"
                      : ""
                  }`}
                  colorGroup={child}
                  defaultColorIndex={Math.floor(Math.random() * COLORS.length)}
                  onGroupClick={() =>
                    setGroupSelected((prevState) =>
                      child.id() === prevState?.id() ? undefined : child,
                    )
                  }
                  groupSelected={groupSelected}
                />
              ))}
            </div>
          </div>

          {!groupSelected && index < groups.length - 1 && (
            <hr className="border-gray-300 my-8" />
          )}
        </>
      ))}
    </div>
  );
};

export default ColorPickerPanel;
