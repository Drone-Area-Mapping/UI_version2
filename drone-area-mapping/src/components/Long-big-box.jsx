import Icon from "@material-tailwind/react/Icon";

export const LongBigBox = ({ text, title, children }) => {
  return (
    <div className="h-full w-full bg-box shadow-xl rounded-2xl p-6">
      {/* LongBigBoxTitle */}
      <div className="flex flex-row space-x-4 items-center">
        <Icon name={text} size="4xl" color="white" />
        <p className="font-title text-2xl lg:text-3xl xl:text-4xl font-normal">
          {title}
        </p>
      </div>
    </div>
  );
};
