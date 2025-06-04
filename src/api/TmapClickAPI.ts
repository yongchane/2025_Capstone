import axios from "axios";
import { getAuthHeaders } from "../utils/auth";

export interface TmapClickAPIRequest {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  preferred: string;
}

const TmapClickAPI = async (requestData: TmapClickAPIRequest) => {
  try {
    // Authorization 헤더 가져오기
    const authHeaders = getAuthHeaders();

    const response = await axios.post(
      "/api/tmap/transit/preferred/click",
      null, // POST body는 null (모든 데이터가 query params)
      {
        headers: {
          ...authHeaders, // Authorization 헤더 추가
          "Content-Type": "application/json",
        },
        params: {
          startX: requestData.startX,
          startY: requestData.startY,
          endX: requestData.endX,
          endY: requestData.endY,
          preferred: requestData.preferred,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("TmapClickAPI 실패:", error);
    throw error; // 에러를 다시 던져서 호출하는 곳에서 처리할 수 있도록
  }
};

export default TmapClickAPI;
