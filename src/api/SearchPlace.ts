import axios from "axios";
import { Place } from "../store/usePlaceStore";

interface SearchPlaceRequest {
  xlocation: number | null; // 실제로는 위도 (latitude) - 네이밍이 혼란스러움
  ylocation: number | null; // 실제로는 경도 (longitude) - 네이밍이 혼란스러움
}

const SearchRestaurant = async (
  requestData: SearchPlaceRequest
): Promise<Place[]> => {
  try {
    console.log("🍽️ 음식점 API 요청 파라미터:", requestData);
    console.log(
      "⚠️ 주의: xlocation=위도, ylocation=경도 (네이밍이 혼란스러움)"
    );

    const response = await axios.get("/api/places/restaurant", {
      params: {
        x: requestData.ylocation, // 경도 (longitude) - API 표준
        y: requestData.xlocation, // 위도 (latitude) - API 표준
      },
    });
    return response.data;
  } catch (error) {
    console.error("SearchRestaurant 실패:", error);
    throw error;
  }
};

const SearchCafe = async (
  requestData: SearchPlaceRequest
): Promise<Place[]> => {
  try {
    console.log("☕ 카페 API 요청 파라미터:", requestData);
    console.log(
      "⚠️ 주의: xlocation=위도, ylocation=경도 (네이밍이 혼란스러움)"
    );

    const response = await axios.get("/api/places/cafe", {
      params: {
        x: requestData.ylocation, // 경도 (longitude) - API 표준
        y: requestData.xlocation, // 위도 (latitude) - API 표준
      },
    });

    return response.data;
  } catch (error) {
    console.error("SearchCafe 실패:", error);
    throw error;
  }
};

const SearchBar = async (requestData: SearchPlaceRequest): Promise<Place[]> => {
  try {
    console.log("🍺 바 API 요청 파라미터:", requestData);
    console.log(
      "⚠️ 주의: xlocation=위도, ylocation=경도 (네이밍이 혼란스러움)"
    );

    const response = await axios.get("/api/places/bar", {
      params: {
        x: requestData.ylocation, // 경도 (longitude) - API 표준
        y: requestData.xlocation, // 위도 (latitude) - API 표준
      },
    });
    return response.data;
  } catch (error) {
    console.error("SearchBar 실패:", error);
    throw error;
  }
};

export { SearchRestaurant, SearchCafe, SearchBar };
