import Icon from "@material-tailwind/react/Icon";
import { useRef, useState } from "react";

export const LongSmallBox = ({ text, title }) => {
  const input = useRef();
  const [isValidFilepath, setValidFilepath] = useState(false);
  const [filepath, setFilepath] = useState("");

  return (
    <div className="h-full w-full bg-box shadow-xl rounded-2xl p-6 flex flex-col justify-evenly space-y-2">
      {/* LongBigBoxTitle */}
      <div className="flex flex-row space-x-4 items-end">
        <Icon name={text} size="4xl" color="white" />
        <p className="font-title text-2xl lg:text-3xl xl:text-4xl font-normal">
          {title}
        </p>
      </div>
      <div className="w-full flex flex-row space-x-4 h-1/2 items-center">
        <input
          ref={input}
          value={filepath}
          placeholder="filepath to images"
          type="text"
          className="w-full h-full rounded-lg bg-transparent border-2 border-gray-400 focus:border-blue-300 outline-none font-text text-lg lg:text-xl xl:text-2xl p-2"
          onFocus={() => input.current.select()}
          onChange={(e) => setFilepath(e.target.value)}
        />
        {isValidFilepath ? (
          <Icon name="check_circle" size="4xl" color="lightGreen" />
        ) : (
          <Icon name="cancel" size="4xl" color="red" />
        )}
      </div>
    </div>
  );
};
