import { create } from 'zustand';

export const useBannerStore = create((set) => ({
  banner: null,
  setBanner: (banner) => set({ banner }),
  resetBanner: () => set({ banner: null }),
}));
