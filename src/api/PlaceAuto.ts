import axios from "axios";
import { getAuthHeaders } from "../utils/auth";

interface PlaceAutoRequest {
  xlocation: number | null;
  ylocation: number | null;
}

const PlaceAuto = async (requestData: PlaceAutoRequest) => {
  try {
    console.log("🤖 자동 추천 API 요청 파라미터:", requestData);

    // xlocation, ylocation null 체크
    if (requestData.xlocation === null || requestData.ylocation === null) {
      throw new Error("위치 정보가 없습니다.");
    }

    // Authorization 헤더 가져오기
    const authHeaders = getAuthHeaders();

    const response = await axios.get("/api/recommend/auto", {
      headers: {
        ...authHeaders, // Authorization 헤더 추가
      },
      params: {
        x: requestData.ylocation, // 경도 (longitude) - API 표준
        y: requestData.xlocation, // 위도 (latitude) - API 표준
      },
    });

    console.log("✅ 자동 추천 API 응답:", response.data);
    console.log("📊 응답 상태 코드:", response.status);

    // 응답 상태 코드와 데이터 모두 반환
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    console.error("❌ PlaceAuto API 실패:", error);
    throw error;
  }
};

export default PlaceAuto;
