# 패턴 기반 맞춤형 경로 추천 서비스 (Capstone)

이 저장소는 React + TypeScript + Vite 기반의 프론트엔드 애플리케이션입니다. 본 프로젝트는 사용자 행동 패턴을 학습해 개인화된 경로와 장소를 추천하는 것을 목표로 합니다.

## 1. 서비스 소개

- 목적: 사용자의 이동/검색 패턴을 분석하여 개인 맞춤형 경로 및 장소를 추천합니다.
- 주요 기능:
  - 사용자 패턴 수집 및 분석 (AI 기반 패턴 분석)
  - 카카오맵 연동을 통한 지도/마커/경로 표시
  - 로그인 · 인증 (JWT 기반)
  - 장소 검색, 자동완성, 추천 결과 제공

## 2. 주요 기술 및 설계 포인트

- 패턴 기반 추천: GPT(또는 커스텀 ML)를 활용한 패턴 분석 모듈로 사용자 성향을 파악하고 가중치 기반 추천을 제공합니다.
- 빠른 지도 렌더링: 카카오맵 API를 연동하고 클라이언트 캐싱으로 렌더링 부하를 줄였습니다.
- 인증/보안: JWT 토큰 기반 인증 흐름 (인증 서버는 백엔드에서 담당).
- 성능 목표: 평균 API 응답 2초 이내, UI 응답성 최적화.

## 3. 사용한 기술 스택

- 프론트엔드
  - React (v18+)
  - TypeScript
  - Vite (개발 서버 및 번들)
  - Tailwind CSS (스타일링)
  - Zustand (또는 유사한 경량 상태관리: repo의 store 디렉터리 참조)
- 지도/위치
  - Kakao Maps API
  - TMap 관련 보조 API (프로젝트 내 TmapAuto, TmapClickAPI 등)
- 네트워크/인증
  - REST API 연동 (Backend 제공), JWT 인증
- AI / 분석
  - OpenAI GPT 계열 연동(패턴 분석 / 추천 보조)
- 개발·도구
  - ESLint, Prettier (설정 파일 포함 가능)
  - Vite, npm

## 4. 파일 구조

아래는 저장소의 주요 파일/폴더와 간단한 설명입니다. (생성자/기능 담당 파일을 빠르게 파악하기 위해 요약)

루트
- `index.html` - 앱 진입 HTML
- `package.json` - 스크립트 및 의존성
- `vite.config.ts` - Vite 설정
- `tsconfig.*.json` - TypeScript 설정

src/
- `main.tsx` - React 진입점
- `App.tsx` - 최상위 앱 컴포넌트
- `index.css` - 전역 스타일 (Tailwind 포함)

폴더별 설명
- `api/` - 외부 API 호출 래퍼
  - `KakaoLocation.ts`, `TmapAuto.ts`, `TmapClickAPI.ts`, `Login.ts`, `Register.ts` 등
- `assets/` - 이미지, 아이콘, Lottie 등 정적 자산
- `components/` - 공통 재사용 컴포넌트 (버튼, 입력, 로딩 등)
- `context/` - React context (예: 폰트 사이즈 등)
- `layout/` - 레이아웃 컴포넌트 (헤더, 푸터)
- `page/` - 라우팅 대상 페이지들
  - `login/`, `main/`, `place/`, `search/` 등 폴더로 구성
- `router/` - 라우터 설정
- `store/` - 전역 상태 관리 (Zustand 기반 플로우)
- `style/` - 전역 스타일 구성 요소
- `utils/` - 토큰 관리, 인증 헬퍼 등 유틸리티

예시 (편의를 위해 주요 파일/폴더만 발췌):

- `src/api/Login.ts` — 로그인 API 호출
- `src/page/main/Home.tsx` — 메인 홈 화면
- `src/page/place/PlaceSearch.tsx` — 장소 검색 화면
- `src/store/useLocationStore.ts` — 위치 상태 관리

## 5. 프로젝트 일정 요약

- Phase 1 (기획): 아이디어 구체화, 와이어프레임, API 명세 작성, 7주차 피버팅으로 핵심 기능 재정의
- Phase 2 (개발): Backend 인증(JWT), Frontend 카카오맵 연동, 로그인/메인/검색 기능 구현, OpenAI 연동으로 패턴 분석
- Phase 3 (통합): 통합 테스트, 버그 수정, Swagger 문서 및 성능 최적화

성과 (프로젝트 내부 지표): 개발 목표 달성률 92%, API 평균 응답 1.8초, 코드 커버리지 73%

## 6. 로컬 실행 방법

아래는 macOS(zsh)를 기준으로 한 기본 실행 방법입니다.

1) 의존성 설치

```bash
npm install
```

2) 개발 서버 시작

```bash
npm run dev
```

3) 빌드

```bash
npm run build
```

4) 빌드 결과 미리보기

```bash
npm run preview
```
## 7. 팀원

<table>
  <tr> 
    <th align='center'><strong>FRONT-END</strong></th> 
    <th align='center'><strong>BACK-END</strong></th> 
    <th align='center'><strong>DESIGN</strong></th> 
    <th align='center'><strong>PM</strong></th> 
  </tr>
  <tr> 
    <td align='center'><strong>현용찬</strong></td> 
    <td align='center'><strong>김려원,맹진영</strong></td> 
    <td align='center'><strong>현용찬</strong></td> 
    <td align='center'><strong>현용찬</strong></td> 
  </tr>
</table>
