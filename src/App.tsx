import React from "react";
import MotoSvg from "./components/MotoSvg";
import ColorPickerPanel from "./components/ColorPickerPanel";

function App() {
  return (
    <div id="app" className="w-screen h-screen">
      <div className="grid h-full grid-cols-[300px_auto]">
        <div className="bg-gray-100 border-r border-solid border-gray-300 p-4">
          <ColorPickerPanel />
        </div>
        <MotoSvg id="moto-svg" className="self-center p-16" />
      </div>
    </div>
  );
}

export default App;
