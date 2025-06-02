import axios, { AxiosError } from "axios";

// 로그인 요청 타입
export interface LoginRequest {
  nickname: string;
  password: string;
}

// 로그인 응답 타입 (API 문서에 맞춤)
export interface LoginResponse {
  token: string;
  refreshToken: string;
}

const Login = async (userData: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await axios.post("/api/auth/login", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: unknown) {
    // 서버에서 보낸 구체적인 오류 메시지 추출
    if (error instanceof AxiosError && error.response?.data) {
      // 서버 응답이 문자열인 경우
      const errorMessage =
        typeof error.response.data === "string"
          ? error.response.data
          : error.response.data.message || "로그인에 실패했습니다.";

      console.error("로그인 실패:", errorMessage);
      throw new Error(errorMessage);
    }

    console.error("로그인 실패:", error);
    throw new Error("네트워크 오류가 발생했습니다.");
  }
};

export default Login;
