import React from "react";
import { useNavigate } from "react-router-dom";

const Btn = ({ path, text }: { path: string; text: string }) => {
  const navigate = useNavigate();

  return (
    <div
      className="w-[320px] h-[53px] bg-[#6488FF] rounded-lg flex items-center justify-center text-white text-center"
      onClick={() => {
        navigate(`/${path}`);
      }}
    >
      {text}
    </div>
  );
};

export default Btn;
