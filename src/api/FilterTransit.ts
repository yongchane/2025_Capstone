import axios from "axios";

export interface FilterTransitRequest {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const FilterTransit = async (requestData: FilterTransitRequest) => {
  try {
    const response = await axios.get("/api/tmap/transit/filter", {
      headers: {
        "Content-Type": "application/json",
      },
      params: requestData,
    });
    return response.data;
  } catch (error) {
    console.error("FilterTransit 실패:", error);
    throw error; // 에러를 다시 던져서 호출하는 곳에서 처리할 수 있도록
  }
};

export default FilterTransit;
