import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Title";
import RegisterAPI from "../../api/Register";

const Register = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleRegister = async () => {
    setIsLoading(true);
    setMessage("");

    // 입력값 검증
    if (!nickname.trim()) {
      setMessage("닉네임을 입력해주세요.");
      setIsLoading(false);
      return;
    }
    if (!age.trim() || isNaN(Number(age)) || Number(age) <= 0) {
      setMessage("올바른 나이를 입력해주세요.");
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      setMessage("비밀번호를 입력해주세요.");
      setIsLoading(false);
      return;
    }

    try {
      // 회원가입 api 불러오고 저장된 값 전달
      const response = await RegisterAPI({
        nickname: nickname.trim(),
        age: Number(age),
        password: password.trim(),
      });

      setMessage("회원가입이 완료되었습니다!");
      console.log("회원가입 성공:", response);

      // 성공 후 로그인 페이지로 이동
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error: unknown) {
      // 회원가입 실패 알고리즘
      console.error("회원가입 실패:", error);
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string }; status?: number };
        };
        if (axiosError.response?.data?.message) {
          setMessage(`회원가입 실패: ${axiosError.response.data.message}`);
        } else if (axiosError.response?.status === 400) {
          setMessage("입력한 정보를 다시 확인해주세요.");
        } else if (axiosError.response?.status === 409) {
          setMessage("이미 존재하는 닉네임입니다.");
        } else {
          setMessage("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        setMessage("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="hover:cursor-pointer"
        onClick={() => {
          navigate("/login");
        }}
      >
        <Title title="간편하게!" />
      </div>
      <div className="flex flex-col items-center justify-center pt-[70px]">
        <div className="bg-[#F7FBFE] w-full h-full flex flex-col items-center gap-[30px]">
          <div>
            <Font>닉네임</Font>
            <InputBox
              placeholder="닉네임을 입력하세요"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <Font>비밀번호</Font>
            <InputBox
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <Font>나이</Font>
            <InputBox
              type="number"
              placeholder="나이를 입력하세요"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              disabled={isLoading}
            />
          </div>

          {message && (
            <MessageBox
              isError={message.includes("실패") || message.includes("오류")}
            >
              {message}
            </MessageBox>
          )}

          <div className="pt-[100px] hover:cursor-pointer">
            <RegisterButton
              onClick={handleRegister}
              disabled={isLoading}
              isLoading={isLoading}
            >
              {isLoading ? "회원가입 중..." : "회원가입"}
            </RegisterButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

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
  color: #333;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #6488ff;
    box-shadow: 0 0 0 2px rgba(100, 136, 255, 0.2);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }

  &::placeholder {
    color: gray;
  }
`;

const Font = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-left: 5px;
  margin-bottom: 10px;
`;

const MessageBox = styled.div<{ isError: boolean }>`
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  margin-top: 10px;
  background-color: ${(props) => (props.isError ? "#fee" : "#e8f5e8")};
  color: ${(props) => (props.isError ? "#c53030" : "#2f855a")};
  border: 1px solid ${(props) => (props.isError ? "#feb2b2" : "#9ae6b4")};
`;

const RegisterButton = styled.button<{ isLoading: boolean }>`
  width: 320px;
  height: 53px;
  background-color: ${(props) => (props.isLoading ? "#a0a0a0" : "#6488ff")};
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  cursor: ${(props) => (props.isLoading ? "not-allowed" : "pointer")};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #5577ee;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #a0a0a0;
    cursor: not-allowed;
  }
`;
