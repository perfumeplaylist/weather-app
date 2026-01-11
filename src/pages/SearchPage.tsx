import { PageLayout } from "../shared/layout/PageLayout";
import { Header } from "../shared/ui/Header";
import { LocationSearchBar } from "../features/search-location";

export const SearchPage = () => {
  return (
    <PageLayout>
      <Header showBack title="지역 검색" />

      <div className="px-4 py-6">
        <LocationSearchBar />
      </div>

      {/* 최근 검색, 인기 지역 등 추가 가능 */}
    </PageLayout>
  );
};
