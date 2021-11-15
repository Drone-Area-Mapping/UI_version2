import { useState } from "react";

export const ProgressBar = ({ color, labelFormat, max, value, text }) => {
  const computedWidth = Math.abs((value / max) * 100);

  return (
    <div className="w-full h-1/6">
      <div className="h-3/4 w-full shadow-lg rounded-full relative">
        <div
          style={{
            height: "100%",
            width: `${computedWidth}%`,
            backgroundColor: color,
            borderRadius: `${value !== max ? "9999px 0 0 9999px" : "9999px"}`,
          }}
        >
          <div className="w-full h-full absolute font-heading font-medium text-md flex justify-center items-center">
            {labelFormat !== "%" ? `${value}/${max}` : `${value} %`}
          </div>
        </div>
      </div>
      <div className="w-full font-heading font-thin lg:text-base xl:text-lg text-sm text-center mt-3">
        {text}
      </div>
    </div>
  );
};
