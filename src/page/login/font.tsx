import React from "react";
import Title from "../../components/Title";
import styled from "@emotion/styled";

const SelectBox = styled.div`
  padding: 10px 25px;
  width: 310px;
  height: 116px;
  background-color: #ffffff;
  border-radius: 12px;
  display: flex;
  align-items: center;
`;

const Font = () => {
  return (
    <div>
      <Title title="글자 크기 조정" />
      <div className="mb-[30px]">원하는 글자 크기를 선택해 보세요!</div>
      <SelectBox>
        <div>작은 텍스트</div>
        <div className="relative left-[120px]">AA</div>
      </SelectBox>
    </div>
  );
};

export default Font;
