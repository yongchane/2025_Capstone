import React from "react";

const Title = ({ title }: { title: string }) => {
  return (
    <div className="w-[320px] text-[35px] font-bold pt-[104px]"> {title}</div>
  );
};

export default Title;
