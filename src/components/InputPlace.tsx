import React, { useState } from "react";
import styled from "@emotion/styled";
import SearchIcon from "../assets/Search.svg?react";
import StartIcon from "../assets/Start.svg?react";
import EndIcon from "../assets/End.svg?react";
import ExchangeIcon from "../assets/Exchange.svg?react";

const InputPlace = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStart(e.target.value);
  };

  const handleChangeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnd(e.target.value);
  };

  const handleExchange = () => {
    const tempStart = start;
    setStart(end);
    setEnd(tempStart);
  };

  return (
    <div className="flex flex-col mt-[30px]">
      <div className="w-[320px] h-[140px] bg-[#ffffff] rounded-[12px] flex flex-col items-center justify-center border border-[#B3DBED] relative">
        <div className="flex items-center justify-between">
          <StartIcon />
          <InputPlaceComponent
            onChange={handleChange}
            placeholder="출발"
            value={start}
          />
          <StyledButton>
            <SearchIcon />
          </StyledButton>
        </div>

        <StyledButton
          onClick={handleExchange}
          className="absolute right-[60px] top-1/2 transform -translate-y-1/2 z-10"
        >
          <ExchangeIcon />
        </StyledButton>

        <div className="w-[280px] h-[1px] bg-[#E5E5E5]" />

        <div className="flex items-center justify-between">
          <EndIcon />
          <InputPlaceComponent
            onChange={handleChangeEnd}
            placeholder="목적지"
            value={end}
          />
          <StyledButton>
            <SearchIcon />
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default InputPlace;

const InputPlaceComponent = styled.input`
  width: 250px;
  height: 65px;
  background-color: #ffffff;
  padding: 10px 15px;
  border: none;
  outline: none;
`;

const StyledButton = styled.button`
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: none;
  outline: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border: none;
  }
`;
