// 로그인 상태 관리 유틸리티 함수들

// 토큰 저장
export const saveTokens = (
  accessToken: string,
  refreshToken: string,
  nickname: string
) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("userNickname", nickname);
};

// 토큰 가져오기
export const getTokens = () => {
  return {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    userNickname: localStorage.getItem("userNickname"),
  };
};

// 로그인 상태 확인
export const isLoggedIn = (): boolean => {
  const { accessToken } = getTokens();
  return !!accessToken; // accessToken이 있으면 true, 없으면 false
};

// 로그아웃 (토큰 삭제)
export const logout = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userNickname");
};

// Authorization 헤더 생성
export const getAuthHeaders = () => {
  const { accessToken } = getTokens();
  return accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
};
