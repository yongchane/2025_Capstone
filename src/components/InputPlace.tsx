import React from "react";
import styled from "@emotion/styled";

const InputPlaceComponent = styled.input`
  width: 310px;
  height: 65px;
  background-color: #f7fbfe;
  padding: 10px 25px;
`;
const InputPlace = () => {
  return (
    <div className="flex flex-col mt-[30px]">
      <div className="w-[320px] h-[140px] bg-[#ffffff] rounded-[12px]">
        <InputPlaceComponent placeholder="출발" />
        <InputPlaceComponent placeholder="목적지" />
      </div>
    </div>
  );
};

export default InputPlace;
