import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styled from "@emotion/styled";

import SearchIcon from "../assets/Search.svg?react";
import StartIcon from "../assets/Start.svg?react";
import EndIcon from "../assets/End.svg?react";
import ExchangeIcon from "../assets/Exchange.svg?react";

import useLocationStore from "../store/useLocationStore";
import usePublicStore from "../store/usePublicStore";

import kakaoLocationAPI from "../api/KakaoLocation";
import FilterTransit from "../api/FilterTransit";

interface InputPlaceProps {
  width?: string;
  comwidth?: string;
  paths?: string;
  simplestart?: string;
  simpleend?: string;
  onSimpleEndProcessed?: () => void;
  onSimpleStartProcessed?: () => void;
  onClick?: () => void;
  onSearchClick?: () => void;
}

const InputPlace = ({
  width = "320px",
  comwidth = "250px",
  paths = location.pathname,
  simplestart,
  simpleend,
  onSimpleEndProcessed,
  onSimpleStartProcessed,
  onClick,
  onSearchClick,
}: InputPlaceProps) => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const {
    end: endbtn,
    setEnd: setEndBtn,
    setSearchE,
    setClick,
    startX,
    startY,
    endX,
    endY,
  } = useLocationStore();
  const {
    start: startbtn,
    setStart: setStartBtn,
    setSearchS,
  } = useLocationStore();

  const { setFilterData } = usePublicStore();

  const navigate = useNavigate();
  const location = useLocation();

  // useLocationStore의 start, end 값 변경 감지 및 API 호출
  useEffect(() => {
    const searchLocation = async (
      location: string,
      type: "출발지" | "목적지"
    ) => {
      if (!location.trim()) return;

      try {
        const result = await kakaoLocationAPI.searchByKeyword({
          query: location,
          size: 5, // 5개의 결과만 가져오기
        });

        console.log(`${type} "${location}" 검색 결과:`, result);
        console.log(
          `${type} 장소 목록:`,
          result.documents.map((place) => ({
            name: place.place_name,
            address: place.address_name,
            category: place.category_name,
            x: place.x,
            y: place.y,
          }))
        );
      } catch (error) {
        console.error(`${type} "${location}" 검색 실패:`, error);
      }
    };

    // 출발지 검색
    if (startbtn) {
      searchLocation(startbtn, "출발지");
    }

    // 목적지 검색
    if (endbtn) {
      searchLocation(endbtn, "목적지");
    }
  }, [startbtn, endbtn]);

  // simpleend props가 전달되면 end 값을 설정하고 초기화 콜백 호출
  useEffect(() => {
    if (simpleend && simpleend.trim()) {
      setEnd(simpleend);
      // props 처리가 완료되었음을 부모에게 알림
      if (onSimpleEndProcessed) {
        onSimpleEndProcessed();
      }
    }
  }, [simpleend, onSimpleEndProcessed]);

  // simplestart props가 전달되면 start 값을 설정
  useEffect(() => {
    if (simplestart && simplestart.trim()) {
      setStart(simplestart);
      // props 처리가 완료되었음을 부모에게 알림
      if (onSimpleStartProcessed) {
        onSimpleStartProcessed();
      }
    }
  }, [simplestart, onSimpleStartProcessed]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStart(value);
    // 타이핑할 때마다 store 업데이트하여 API 호출 트리거
    if (value.trim()) {
      setStartBtn(value);
    }
  };

  const handleChangeEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEnd(value);
    // 타이핑할 때마다 store 업데이트하여 API 호출 트리거
    if (value.trim()) {
      setEndBtn(value);
    }
  };

  // Enter 키 입력 처리 함수
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEndBtn(end);
      setStartBtn(start);
      setSearchE(end);
      setSearchS(start);
    }
  };

  const handleExchange = () => {
    const tempStart = start;
    setStart(end);
    setEnd(tempStart);
  };

  const handleSearch = async () => {
    setEndBtn(end);
    setStartBtn(start);
    setSearchE(end);
    setSearchS(start);

    // 현재 경로에 따라 다른 동작 수행
    if (location.pathname === "/simple") {
      // "/simple" 경로에서: FilterTransit API만 호출 (TmapClickAPI 호출 안함)
      if (
        startX !== null &&
        startY !== null &&
        endX !== null &&
        endY !== null
      ) {
        try {
          const filterResponse = await FilterTransit({
            startX,
            startY,
            endX,
            endY,
          });
          console.log("FilterTransit 응답:", filterResponse);
          // store에 응답 데이터 저장
          setFilterData(filterResponse);
        } catch (error) {
          console.error("FilterTransit 실패:", error);
        }
      } else {
        console.log("좌표 정보가 불완전합니다:", {
          startX,
          startY,
          endX,
          endY,
        });
      }
    } else if (location.pathname !== "/simple") {
      // "/search" 등 다른 경로에서: onSearchClick 콜백 호출 (TmapClickAPI + FilterTransit)
      if (start === "" || end === "") {
        alert("출발지 또는 목적지를 입력해주세요.");
      } else {
        // TmapClickAPI 호출 (부모 컴포넌트의 handleTmapSearch 실행)
        if (onSearchClick) {
          onSearchClick();
        }
        navigate(paths);
      }
    }
  };

  // placeholder에 따라 click 값 설정하는 함수
  const handleInputClick = (placeholder: string) => {
    if (placeholder === "출발") {
      setClick("출발");
    } else if (placeholder === "목적지") {
      setClick("목적지");
    }
    console.log(
      "input clicked, placeholder:",
      placeholder,
      "click set to:",
      placeholder
    );
    // 부모 컴포넌트의 onClick도 호출
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className="flex flex-col mt-[30px] "
      onClick={() => navigate("/search")}
    >
      <div
        className="h-[140px] bg-[#ffffff] rounded-[12px] flex flex-col items-center justify-center border border-[#B3DBED] relative cursor-pointer"
        style={{ width }}
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <StartIcon />
          <InputPlaceComponent
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="출발"
            value={start || simplestart || ""}
            $comWidth={comwidth}
            onClick={() => handleInputClick("출발")}
          />
          <StyledButton onClick={handleSearch} value={startbtn} paths={paths}>
            <SearchIcon />
          </StyledButton>
        </div>

        <StyledButton
          onClick={handleExchange}
          className="absolute right-[60px] top-1/2 transform -translate-y-1/2 z-10"
        >
          <ExchangeIcon />
        </StyledButton>

        <div
          className="w-[280px] h-[1px] bg-[#E5E5E5]"
          style={{ width: `calc(${width} - 40px)` }}
        />

        <div className="flex items-center justify-between">
          <EndIcon />
          <InputPlaceComponent
            onChange={handleChangeEnd}
            onKeyDown={handleKeyDown}
            placeholder="목적지"
            value={end || simpleend || ""}
            $comWidth={comwidth}
            onClick={() => handleInputClick("목적지")}
          />
          <StyledButton onClick={handleSearch} value={endbtn}>
            <SearchIcon />
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default InputPlace;

const InputPlaceComponent = styled.input<{ $comWidth: string }>`
  width: ${({ $comWidth }) => $comWidth};
  height: 65px;
  background-color: #ffffff;
  padding: 10px 15px;
  border: none;
  outline: none;
`;

const StyledButton = styled.button<{ paths?: string }>`
  width: 30px;
  height: 30px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  border: none;
  outline: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border: none;
  }
`;
