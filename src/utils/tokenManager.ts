import { refreshAccessToken, getAccessToken, clearAuth } from "../api/auth";

// 🕐 토큰 만료 시간 체크
export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch {
    return true; // 토큰이 유효하지 않으면 만료된 것으로 간주
  }
};

// 🔄 토큰 자동 갱신 체크
export const ensureValidToken = async (): Promise<string | null> => {
  const token = getAccessToken();

  if (!token) {
    return null; // 토큰이 없음
  }

  // 토큰이 만료되었는지 확인
  if (isTokenExpired(token)) {
    try {
      // 자동으로 토큰 갱신
      const { token: newToken } = await refreshAccessToken();
      return newToken;
    } catch (error: unknown) {
      console.log("토큰 갱신 실패", error);
      // 갱신 실패 시 로그아웃 처리
      clearAuth();
      return null;
    }
  }

  return token; // 유효한 토큰 반환
};

// 🕐 주기적으로 토큰 갱신 (선택사항)
export const startTokenRefreshSchedule = () => {
  // 5분마다 토큰 상태 확인
  setInterval(async () => {
    const token = getAccessToken();
    if (token && isTokenExpired(token)) {
      try {
        await refreshAccessToken();
        console.log("✅ 토큰이 자동으로 갱신되었습니다.");
      } catch (error: unknown) {
        console.log("토큰 갱신 실패", error);
        console.log("❌ 토큰 갱신 실패, 로그아웃됩니다.");
        clearAuth();
        window.location.href = "/login";
      }
    }
  }, 5 * 60 * 1000); // 5분
};
