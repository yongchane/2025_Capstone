import axios from "axios";
import { getAuthHeaders } from "../utils/auth";

export interface TmapAutoRequest {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const TmapAuto = async (requestData: TmapAutoRequest) => {
  try {
    const authHeaders = getAuthHeaders();

    const response = await axios.get("/api/tmap/transit/auto", {
      headers: {
        "Content-Type": "application/json",
        ...authHeaders,
      },
      params: requestData,
    });
    return response.data;
  } catch (error) {
    console.error("TmapAuto 실패:", error);
    throw error;
  }
};

export default TmapAuto;
