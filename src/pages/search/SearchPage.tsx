import { PageLayout } from "../../shared/layout/PageLayout";
import { Header } from "../../shared/ui/Header";
import { LocationSearchWidget } from "../../widget/location/LocationSearchWidget";

export const SearchPage = () => {
  return (
    <PageLayout>
      <Header showBack title="지역 검색" />

      <div className="px-4 py-6 pb-24 md:pb-24">
        <LocationSearchWidget />
      </div>

      {/* 최근 검색, 인기 지역 등 추가 가능 */}
    </PageLayout>
  );
};
