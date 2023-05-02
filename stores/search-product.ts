import { defineStore } from "pinia";

export interface SearchProductStore {
  search: string | null;
}

export const useSearchProductStore = defineStore("search-product", {
  state: (): SearchProductStore => ({
    search: null,
  }),
});
