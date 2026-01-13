import { QueryClient } from "@tanstack/react-query";

/**
 * React Router loader에서 사용할 수 있도록 QueryClient 인스턴스를 export
 * queryProvider.tsx와 동일한 설정을 사용하여 일관성 유지
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      retry: false,
      throwOnError: true,
      staleTime: 1000 * 60 * 10, // 10분
      gcTime: 1000 * 60 * 30, // 30분
    },
    mutations: {
      retry: false,
    },
  },
});
