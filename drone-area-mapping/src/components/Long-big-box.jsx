import Icon from "@material-tailwind/react/Icon";
import Checkbox from "@material-tailwind/react/Checkbox";

export const LongBigBox = ({ text, title }) => {
  return (
    <div className="h-full w-full bg-box shadow-xl rounded-2xl p-6 flex flex-col">
      {/* LongBigBoxTitle */}
      <div className="flex flex-row space-x-4 items-center">
        <Icon name={text} size="4xl" color="white" />
        <p className="font-title text-2xl lg:text-3xl xl:text-4xl font-normal">
          {title}
        </p>
      </div>
      <div className="flex flex-col justify-evenly h-full">
        <Checkbox color="lightBlue" text="RGB" id="rgb" />
        <Checkbox color="lightBlue" text="NVDI" id="nvdi" />
        <Checkbox color="lightBlue" text="FLIR" id="flir" />
      </div>
    </div>
  );
};
