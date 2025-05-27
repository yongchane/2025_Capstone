import React, { useState } from "react";
import styled from "@emotion/styled";

const SelectBoxComponent = styled.div<{ $isSelected: boolean }>`
  padding: 10px 25px;
  width: 310px;
  height: 116px;
  background-color: ${(props) => (props.$isSelected ? "#6488FF" : "#ffffff")};
  color: ${(props) => (props.$isSelected ? "#ffffff" : "#000000")};
  border-radius: 12px;
  border: 1px solid #b3dbed;
  display: flex;
  align-items: center;
  margin-bottom: 34px;

  :hover {
    cursor: pointer;
    background-color: #6488ff;
    color: #ffffff;
  }
`;

interface SelectBoxProps {
  title: string;
  subtitle: string;
  fontSize: number;
}

const SelectBox = ({ title, subtitle, fontSize }: SelectBoxProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <SelectBoxComponent
      $isSelected={isSelected}
      onClick={() => setIsSelected(!isSelected)}
    >
      <div className="w-[90px]">{title}</div>
      <div
        className="relative left-[120px]"
        style={{ fontSize: `${fontSize}px` }}
      >
        {subtitle}
      </div>
    </SelectBoxComponent>
  );
};

export default SelectBox;
