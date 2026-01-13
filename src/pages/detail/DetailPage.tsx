import { WeatherDetailHeader, WeatherDetailWidget } from "@/widgets/weather";

export const DetailPage = () => {
  return (
    <>
      <WeatherDetailHeader />
      <div className="pb-24 md:pb-24">
        <WeatherDetailWidget />
      </div>
    </>
  );
};
