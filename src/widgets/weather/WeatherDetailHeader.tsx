import { useParams } from "react-router";
import { WeatherMobileHeader } from "./WeatherMobileHeader";
import { WeatherDesktopHeader } from "./WeatherDesktopHeader";

/**
 * 날씨 상세 페이지 헤더 위젯
 * 모바일/데스크탑 헤더를 분기하여 표시
 */
export const WeatherDetailHeader = () => {
  const { locationId } = useParams();

  if (!locationId) {
    return null;
  }

  return (
    <>
      <WeatherMobileHeader locationId={locationId} />
      <WeatherDesktopHeader locationId={locationId} />
    </>
  );
};
