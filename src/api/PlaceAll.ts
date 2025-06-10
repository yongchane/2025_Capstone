import axios from "axios";

interface PlaceAllRequest {
  xlocation: number;
  ylocation: number;
}

const PlaceAll = async (requestData: PlaceAllRequest) => {
  try {
    console.log("📡 PlaceAll API 호출 시작:", {
      params: {
        x: requestData.ylocation,
        y: requestData.xlocation,
      },
    });

    const response = await axios.get("/api/places/all", {
      params: {
        x: requestData.ylocation,
        y: requestData.xlocation,
      },
    });

    console.log("📡 PlaceAll API 전체 응답:", response);
    console.log("📡 PlaceAll API response.data:", response.data);
    console.log("📡 PlaceAll API response.data 타입:", typeof response.data);
    console.log(
      "📡 PlaceAll API response.data 배열 확인:",
      Array.isArray(response.data)
    );

    if (response.data && Array.isArray(response.data)) {
      console.log("📡 PlaceAll API - 배열 길이:", response.data.length);
      if (response.data.length > 0) {
        console.log("📡 PlaceAll API - 첫 번째 항목:", response.data[0]);
      }
    }

    return response.data;
  } catch (error) {
    console.error("❌ PlaceAll API 실패:", error);
    if (axios.isAxiosError(error)) {
      console.error("❌ PlaceAll API 에러 상세:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
      });
    }
    throw error;
  }
};

export default PlaceAll;
