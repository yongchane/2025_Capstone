import styled from "@emotion/styled";
import {
  CategoryType,
  useInputPlace,
  usePlaceStore,
} from "../../../store/usePlaceStore";

const Category = () => {
  const { selectedCategory, setSelectedCategory, hasRecommendation } =
    usePlaceStore();
  const { changeView } = useInputPlace();

  const handleCategoryClick = (category: CategoryType) => {
    setSelectedCategory(category);
  };

  return (
    <div className="flex flex-col gap-[10px] pb-[20px]">
      {changeView === true ? (
        <CategoryContainer>
          <div>검색결과</div>
        </CategoryContainer>
      ) : (
        <>
          <CategoryContainer>
            <div
              className={`${
                selectedCategory === "전체"
                  ? "text-[#000000]"
                  : "text-[#A6A6A9]"
              } cursor-pointer`}
              onClick={() => handleCategoryClick("전체")}
            >
              전체
            </div>
            {hasRecommendation && (
              <div
                className={`${
                  selectedCategory === "맞춤형 추천"
                    ? "text-[#000000]"
                    : "text-[#A6A6A9]"
                } cursor-pointer`}
                onClick={() => handleCategoryClick("맞춤형 추천")}
              >
                맞춤형 추천
              </div>
            )}
            <div
              className={`${
                selectedCategory === "음식점"
                  ? "text-[#000000]"
                  : "text-[#A6A6A9]"
              } cursor-pointer`}
              onClick={() => handleCategoryClick("음식점")}
            >
              음식점
            </div>
            <div
              className={`${
                selectedCategory === "카페"
                  ? "text-[#000000]"
                  : "text-[#A6A6A9]"
              } cursor-pointer`}
              onClick={() => handleCategoryClick("카페")}
            >
              카페
            </div>
            <div
              className={`${
                selectedCategory === "술집"
                  ? "text-[#000000]"
                  : "text-[#A6A6A9]"
              } cursor-pointer`}
              onClick={() => handleCategoryClick("술집")}
            >
              술집
            </div>
          </CategoryContainer>
          <div className="w-full h-[1px] bg-[#F5F5F5]" />
        </>
      )}
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
