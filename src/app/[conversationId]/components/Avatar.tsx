import React from "react";

const Avatar = ({
  text,
  size,
  showActive,
}: {
  text: string;
  size?: string;
  showActive?: boolean;
}) => {
  return (
    <div className={`avatar ${size} relative`}>
      {text}
      {showActive && (
        <span
          className="
    absolute 
    block 
    rounded-full 
    bg-green-500 
    ring-2 
    ring-transparent 
    bottom-0 
    right-0
    h-1 
    w-1 
    md:h-3 
    md:w-3
  "
        />
      )}
    </div>
  );
};

export default Avatar;
