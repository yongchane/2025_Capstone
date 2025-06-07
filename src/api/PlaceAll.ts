import axios from "axios";

interface PlaceAllRequest {
  xlocation: number;
  ylocation: number;
}

const PlaceAll = async (requestData: PlaceAllRequest) => {
  try {
    const response = await axios.get("/api/places/all", {
      params: {
        x: requestData.ylocation,
        y: requestData.xlocation,
      },
    });
    return response.data;
  } catch (error) {
    console.error("PlaceAll 실패:", error);
    throw error;
  }
};

export default PlaceAll;
