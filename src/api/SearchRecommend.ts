import axios from "axios";
import { getAuthHeaders } from "../utils/auth";

interface SearchRecommendRequest {
  keyword: string[]; // 프론트엔드에서는 배열로 받아서
  xlocation: number | null;
  ylocation: number | null;
}

interface SearchRecommendBody {
  keyword: string; // API로는 문자열로 전송
}

const SearchRecommend = async (requestData: SearchRecommendRequest) => {
  try {
    // Authorization 헤더 가져오기
    const authHeaders = getAuthHeaders();

    // 키워드 배열을 문자열로 변환 (공백으로 구분)
    const keywordString = requestData.keyword.join(" ");

    const requestBody: SearchRecommendBody = {
      keyword: keywordString,
    };

    const response = await axios.post("/api/recommend/search", requestBody, {
      headers: {
        ...authHeaders, // Authorization 헤더 추가
        "Content-Type": "application/json",
      },
      params: {
        x: requestData.ylocation, // 경도 (longitude) - API 표준
        y: requestData.xlocation, // 위도 (latitude) - API 표준
      },
    });
    return response.data;
  } catch (error) {
    console.error("SearchRecommend 실패:", error);
    throw error;
  }
};

export default SearchRecommend;
