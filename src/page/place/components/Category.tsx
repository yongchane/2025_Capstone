import styled from "@emotion/styled";
import { useState } from "react";

type CategoryType = "전체" | "최근" | "즐겨찾기";

const Category = () => {
  // 맞춤형 작업 완료시 맞춤형 카테고리 뜨게 코드 수정해야함
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("전체");

  const handleCategoryClick = (category: CategoryType) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex flex-col gap-[10px] pb-[20px]">
      <CategoryContainer>
        <div
          className={`${
            selectedCategory === "전체" ? "text-[#000000]" : "text-[#A6A6A9]"
          } cursor-pointer`}
          onClick={() => handleCategoryClick("전체")}
        >
          전체
        </div>
        <div
          className={`${
            selectedCategory === "최근" ? "text-[#000000]" : "text-[#A6A6A9]"
          } cursor-pointer`}
          onClick={() => handleCategoryClick("최근")}
        >
          최근
        </div>
        <div
          className={`${
            selectedCategory === "즐겨찾기"
              ? "text-[#000000]"
              : "text-[#A6A6A9]"
          } cursor-pointer`}
          onClick={() => handleCategoryClick("즐겨찾기")}
        >
          즐겨찾기
        </div>
      </CategoryContainer>
      <div className="w-full h-[1px] bg-[#F5F5F5]" />
    </div>
  );
};

export default Category;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding-left: 20px;
  padding-top: 20px;
`;
