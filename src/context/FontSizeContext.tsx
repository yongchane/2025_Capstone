import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface FontSizeOption {
  title: string;
  subtitle: string;
  fontSize: number;
  left: number;
}

export const fontSizeOptions: FontSizeOption[] = [
  { title: "작은 텍스트", subtitle: "A", fontSize: 12, left: 70 },
  { title: "중간 텍스트", subtitle: "A", fontSize: 18, left: 70 },
  { title: "큰 텍스트", subtitle: "A", fontSize: 30, left: 70 },
];

interface FontSizeContextType {
  currentFontSize: FontSizeOption;
  setFontSize: (fontSize: FontSizeOption) => void;
  fontScale: number; // 기본 사이즈 대비 배율
}

const FontSizeContext = createContext<FontSizeContextType | undefined>(
  undefined
);

interface FontSizeProviderProps {
  children: ReactNode;
}

export const FontSizeProvider: React.FC<FontSizeProviderProps> = ({
  children,
}) => {
  // 기본값은 중간 텍스트
  const [currentFontSize, setCurrentFontSize] = useState<FontSizeOption>(
    fontSizeOptions[1]
  );

  // localStorage에서 저장된 폰트 사이즈 불러오기
  useEffect(() => {
    const savedFontSize = localStorage.getItem("selectedFontSize");
    if (savedFontSize) {
      try {
        const parsedFontSize = JSON.parse(savedFontSize);
        const foundOption = fontSizeOptions.find(
          (option) => option.fontSize === parsedFontSize.fontSize
        );
        if (foundOption) {
          setCurrentFontSize(foundOption);
        }
      } catch (error) {
        console.log("저장된 폰트 사이즈 불러오기 실패:", error);
      }
    }
  }, []);

  // CSS 변수로 폰트 사이즈 적용
  useEffect(() => {
    const root = document.documentElement;
    const fontScale = currentFontSize.fontSize / 18; // 18px을 기준으로 배율 계산

    // CSS 변수 설정
    root.style.setProperty("--base-font-size", `${currentFontSize.fontSize}px`);
    root.style.setProperty("--font-scale", fontScale.toString());
    root.style.setProperty(
      "--title-font-size",
      `${currentFontSize.fontSize * 1.5}px`
    );
    root.style.setProperty(
      "--subtitle-font-size",
      `${currentFontSize.fontSize * 0.9}px`
    );
    root.style.setProperty(
      "--small-font-size",
      `${currentFontSize.fontSize * 0.8}px`
    );
  }, [currentFontSize]);

  const setFontSize = (fontSize: FontSizeOption) => {
    setCurrentFontSize(fontSize);
    localStorage.setItem("selectedFontSize", JSON.stringify(fontSize));
  };

  const fontScale = currentFontSize.fontSize / 18; // 기준값 18px 대비 배율

  return (
    <FontSizeContext.Provider
      value={{ currentFontSize, setFontSize, fontScale }}
    >
      {children}
    </FontSizeContext.Provider>
  );
};

export const useFontSize = (): FontSizeContextType => {
  const context = useContext(FontSizeContext);
  if (context === undefined) {
    throw new Error("useFontSize must be used within a FontSizeProvider");
  }
  return context;
};
