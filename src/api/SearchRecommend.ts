import axios from "axios";
import { getAuthHeaders } from "../utils/auth";

interface SearchRecommendRequest {
  keyword: string[];
  xlocation: number | null;
  ylocation: number | null;
}

const SearchRecommend = async (requestData: SearchRecommendRequest) => {
  try {
    // Authorization 헤더 가져오기
    const authHeaders = getAuthHeaders();

    const response = await axios.post(
      "/api/recommend/search",
      null, // POST body는 null (모든 데이터가 query params)
      {
        headers: {
          ...authHeaders, // Authorization 헤더 추가
          "Content-Type": "application/json",
        },
        params: {
          keyword: requestData.keyword.join(","), // 배열을 쉼표로 구분된 문자열로 변환
          x: requestData.ylocation, // 경도 (longitude) - API 표준
          y: requestData.xlocation, // 위도 (latitude) - API 표준
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("SearchRecommend 실패:", error);
    throw error;
  }
};

export default SearchRecommend;
