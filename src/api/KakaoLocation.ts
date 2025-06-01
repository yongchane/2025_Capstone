// 카카오 로컬 검색 API 응답 타입 정의
export interface KakaoPlace {
  id: string;
  place_name: string;
  category_name: string;
  category_group_code: string;
  category_group_name: string;
  phone: string;
  address_name: string;
  road_address_name: string;
  x: string; // 경도
  y: string; // 위도
  place_url: string;
  distance: string;
}

export interface KakaoLocationResponse {
  documents: KakaoPlace[];
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
    same_name: {
      region: string[];
      keyword: string;
      selected_region: string;
    };
  };
}

// 검색 옵션 인터페이스
export interface SearchOptions {
  query: string; // 검색 키워드
  category_group_code?: string; // 카테고리 그룹 코드
  x?: string; // 중심 좌표의 X 혹은 경도
  y?: string; // 중심 좌표의 Y 혹은 위도
  radius?: number; // 중심 좌표부터의 반경거리 (미터 단위, 0~20000)
  rect?: string; // 사각형 영역 내 제한 검색
  page?: number; // 결과 페이지 번호 (1~45, 기본값: 1)
  size?: number; // 한 페이지에 보여질 문서의 개수 (1~15, 기본값: 15)
  sort?: "distance" | "accuracy"; // 결과 정렬 순서
}

class KakaoLocationAPI {
  private readonly API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  private readonly BASE_URL = import.meta.env.VITE_KAKAO_BASE_URL;

  constructor() {
    // 환경변수 유효성 검사
    if (!this.API_KEY) {
      console.error(
        "❌ VITE_KAKAO_REST_API_KEY 환경변수가 설정되지 않았습니다."
      );
      throw new Error(
        "카카오 API 키가 설정되지 않았습니다. .env 파일을 확인해주세요."
      );
    }
    if (!this.BASE_URL) {
      console.error("❌ VITE_KAKAO_BASE_URL 환경변수가 설정되지 않았습니다.");
      throw new Error(
        "카카오 API URL이 설정되지 않았습니다. .env 파일을 확인해주세요."
      );
    }

    console.log("✅ 카카오 API 설정 완료");
  }

  // 키워드로 장소 검색
  async searchByKeyword(
    options: SearchOptions
  ): Promise<KakaoLocationResponse> {
    const { query, ...params } = options;

    if (!query.trim()) {
      throw new Error("검색 키워드는 필수입니다.");
    }

    const searchParams = new URLSearchParams();
    searchParams.append("query", query);

    // 선택적 파라미터들 추가
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value.toString());
      }
    });

    // 카카오 개발자 문서에 따른 올바른 URL 형태
    const fullURL = `${
      this.BASE_URL
    }/v2/local/search/keyword.json?${searchParams.toString()}`;

    try {
      console.log(`카카오 API 호출 시작: ${fullURL}`);

      const response = await fetch(fullURL, {
        method: "GET",
        headers: {
          Authorization: `KakaoAK ${this.API_KEY}`,
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
        },
      });

      // 응답 상태 로깅
      console.log(`API 응답 상태: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        // 응답 텍스트 확인
        const errorText = await response.text();
        console.error("API 오류 응답:", errorText);

        throw new Error(
          `카카오 API 오류: ${response.status} ${response.statusText}\n응답: ${errorText}`
        );
      }

      const data: KakaoLocationResponse = await response.json();
      console.log("카카오 API 응답 성공:", data);
      return data;
    } catch (error) {
      console.error("카카오 장소 검색 API 호출 실패:", error);

      throw error;
    }
  }
}

// 싱글톤 인스턴스 생성
const kakaoLocationAPI = new KakaoLocationAPI();

export default kakaoLocationAPI;
