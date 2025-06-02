import axios, { AxiosError } from "axios";

// 🔐 토큰 관리 함수들
export const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

export const setNickname = (nickname: string) => {
  localStorage.setItem("nickname", nickname);
};

export const getNickname = (): string | null => {
  return localStorage.getItem("nickname");
};

export const clearAuth = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("nickname");
};

export const isLoggedIn = (): boolean => {
  return !!getAccessToken();
};

// 🔄 토큰 갱신 API
export const refreshAccessToken = async (): Promise<{
  token: string;
  refreshToken: string;
}> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error("Refresh token이 없습니다.");
  }

  try {
    const response = await axios.post("/api/auth/reissue", null, {
      headers: {
        "Refresh-Token": refreshToken,
        "Content-Type": "application/json",
      },
    });

    const { token, refreshToken: newRefreshToken } = response.data;

    // 새로운 토큰들을 저장
    setTokens(token, newRefreshToken);

    return { token, refreshToken: newRefreshToken };
  } catch (error: unknown) {
    console.log("토큰 갱신 실패", error);
    // 리프레시 토큰도 만료된 경우
    clearAuth();
    throw new Error("토큰 갱신에 실패했습니다. 다시 로그인해주세요.");
  }
};

// 🔄 API 요청 시 자동 토큰 갱신 처리
export const apiRequestWithAuth = async <T>(
  requestFn: () => Promise<T>
): Promise<T> => {
  try {
    return await requestFn();
  } catch (error) {
    // 401 Unauthorized (토큰 만료)인 경우
    if (error instanceof AxiosError && error.response?.status === 401) {
      try {
        // 토큰 갱신 시도
        await refreshAccessToken();
        // 다시 원래 요청 실행
        return await requestFn();
      } catch (refreshError) {
        // 리프레시도 실패하면 로그인 페이지로
        window.location.href = "/login";
        throw refreshError;
      }
    }
    throw error;
  }
};

// 🔄 Authorization 헤더를 포함한 API 호출
export const getAuthHeaders = () => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};
