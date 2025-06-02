import axios from "axios";

// 회원가입 요청 타입 정의
export interface RegisterRequest {
  nickname: string;
  age: number;
  password: string;
}

// 회원가입 API 함수
const Register = async (userData: RegisterRequest): Promise<string> => {
  try {
    const response = await axios.post(
      "/api/auth/register", // 프록시를 통해 요청
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
};

export default Register;
