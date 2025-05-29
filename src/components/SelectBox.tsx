import { useState } from "react";
import type { ReactNode } from "react";
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
  title: ReactNode;
  subtitle: string;
  fontSize: number;
  left: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

const SelectBox = ({
  title,
  subtitle,
  fontSize,
  left,
  onMouseEnter,
  onMouseLeave,
}: SelectBoxProps) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  return (
    <SelectBoxComponent
      $isSelected={isSelected}
      onClick={() => setIsSelected(!isSelected)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-[90px]">{title}</div>
      <div
        className="relative "
        style={{ fontSize: `${fontSize}px`, left: `${left}px` }}
      >
        {subtitle}
      </div>
    </SelectBoxComponent>
  );
};

export default SelectBox;
