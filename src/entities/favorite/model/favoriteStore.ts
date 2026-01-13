import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FavoriteState, FavoriteLocationId } from "./favoriteTypes";

const MAX_FAVORITES = 6;

interface FavoriteStore extends FavoriteState {
  // Actions
  addFavorite: (id: FavoriteLocationId) => boolean;
  removeFavorite: (id: FavoriteLocationId) => boolean;
  toggleFavorite: (id: FavoriteLocationId) => boolean;
  setFavoriteAlias: (id: FavoriteLocationId, alias: string) => void;
  clearFavoriteAlias: (id: FavoriteLocationId) => void;
  clearAllFavorites: () => void;
  
  // Selectors (computed values)
  isFavorite: (id: FavoriteLocationId) => boolean;
  getAlias: (id: FavoriteLocationId) => string | undefined;
}

export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    (set, get) => ({
      // Initial state
      ids: [],
      aliases: {},

      // Actions
      addFavorite: (id: FavoriteLocationId) => {
        const state = get();
        
        // 이미 존재하면 false
        if (state.ids.includes(id)) return false;

        // 최대 개수 체크
        if (state.ids.length >= MAX_FAVORITES) {
          return false;
        }

        // 추가
        set({
          ids: [...state.ids, id],
        });
        return true;
      },

      removeFavorite: (id: FavoriteLocationId) => {
        const state = get();
        
        if (!state.ids.includes(id)) return false;

        const newIds = state.ids.filter((fid) => fid !== id);
        const newAliases = { ...state.aliases };
        
        // alias도 제거
        if (newAliases[id] !== undefined) {
          delete newAliases[id];
        }

        set({
          ids: newIds,
          aliases: newAliases,
        });
        return true;
      },

      toggleFavorite: (id: FavoriteLocationId) => {
        const state = get();
        if (state.ids.includes(id)) {
          return state.removeFavorite(id);
        } else {
          return state.addFavorite(id);
        }
      },

      setFavoriteAlias: (id: FavoriteLocationId, alias: string) => {
        const state = get();
        
        if (!state.ids.includes(id)) {
          throw new Error(`Location ${id} is not in favorites`);
        }

        const trimmedAlias = alias.trim();
        const newAliases = { ...state.aliases };

        if (trimmedAlias === "") {
          // 빈 문자열이면 alias 제거
          delete newAliases[id];
        } else {
          // alias 설정
          newAliases[id] = trimmedAlias;
        }

        set({ aliases: newAliases });
      },

      clearFavoriteAlias: (id: FavoriteLocationId) => {
        const state = get();
        
        if (!state.ids.includes(id)) {
          throw new Error(`Location ${id} is not in favorites`);
        }

        const newAliases = { ...state.aliases };
        if (newAliases[id] !== undefined) {
          delete newAliases[id];
          set({ aliases: newAliases });
        }
      },

      clearAllFavorites: () => {
        set({
          ids: [],
          aliases: {},
        });
      },

      // Selectors
      isFavorite: (id: FavoriteLocationId) => {
        return get().ids.includes(id);
      },

      getAlias: (id: FavoriteLocationId) => {
        return get().aliases[id];
      },
    }),
    {
      name: "favoriteLocations:v1",
      partialize: (state) => ({
        ids: state.ids,
        aliases: state.aliases,
      }),
    }
  )
);




