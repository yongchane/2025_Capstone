import styled from "@emotion/styled";
import Btn from "../../components/Btn";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import { useState } from "react";
import LoginAPI from "../../api/Login";
import { saveTokens } from "../../utils/auth";

const Login = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleLogin = async () => {
    // 입력값 검증
    if (!nickname.trim()) {
      setErrorMessage("닉네임을 입력해주세요.");
      return;
    }
    if (!password.trim()) {
      setErrorMessage("비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await LoginAPI({
        nickname: nickname.trim(),
        password: password.trim(),
      });
      console.log("로그인 성공:", response, "nickname", nickname);

      // 토큰 저장 (유틸리티 함수 사용)
      saveTokens(response.token, response.refreshToken, nickname.trim());

      // 로그인 성공 시 메인 페이지로 이동
      console.log("페이지 이동 중...");
      navigate("/font", { replace: true }); // replace: true로 뒤로가기 방지
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
      console.error("로그인 실패:", error);
    } finally {
      setIsLoading(false);
      console.log("로그인 완료확인", isLoading);
    }
  };

  return (
    <>
      {/* 로그인 관련 연동 필요, 상태관리 */}
      <Title title="로그인" />
      <div className="flex flex-col items-center justify-center pt-[70px]">
        <InputBox
          placeholder="아이디 입력"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          disabled={isLoading}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />
        <InputBox
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />

        {/* 오류 메시지 표시 */}
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </div>
      <div
        className="flex flex-col items-center justify-center pt-[70px] hover:cursor-pointer"
        onClick={isLoading ? undefined : handleLogin}
      >
        <Btn text={isLoading ? "로그인 중..." : "로그인"} />
      </div>
      <div
        className="text-[14px] text-gray-500 relative right-[-130px] mt-[29px] hover:cursor-pointer"
        onClick={() => {
          navigate("/register");
        }}
      >
        회원가입
      </div>
    </>
  );
};

export default Login;

const InputBox = styled.input`
  width: 320px;
  height: 53px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 5px;
  border: 1px solid #b3dbed;
  display: flex;
  align-items: center;
  padding-left: 10px;
  color: gray;

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
  padding: 8px 16px;
  background-color: #ffeaea;
  border: 1px solid #ffcdd2;
  border-radius: 5px;
  max-width: 320px;
`;
