import { Home, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router";
import { Icon, Text } from "@packages/ui";

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isSearch = location.pathname === "/search";

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 shadow-lg">
      <div 
        className="flex items-center justify-around h-16 px-4 md:max-w-2xl md:mx-auto md:px-8" 
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <button
          onClick={() => navigate("/")}
          className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors active:bg-gray-50 hover:bg-gray-50 md:max-w-[200px] ${
            isHome ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <Icon size="md">
            <Home className={isHome ? "fill-current" : ""} />
          </Icon>
          <Text size="xs" weight={isHome ? "semibold" : "normal"}>
            홈
          </Text>
        </button>

        <button
          onClick={() => navigate("/search")}
          className={`flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors active:bg-gray-50 hover:bg-gray-50 md:max-w-[200px] ${
            isSearch ? "text-blue-600" : "text-gray-500"
          }`}
        >
          <Icon size="md">
            <Search className={isSearch ? "fill-current" : ""} />
          </Icon>
          <Text size="xs" weight={isSearch ? "semibold" : "normal"}>
            검색
          </Text>
        </button>
      </div>
    </nav>
  );
};

