'use client'

import { create } from 'zustand'

type NavigationState = {
  isNavOpened: boolean
  toggleNavOpen: () => void
  setNavOpen: (val: boolean) => void
}

export const useMobileNavigationStore = create<NavigationState>((set) => ({
  isNavOpened: false,
  toggleNavOpen: () => set((state) => ({ isNavOpened: !state.isNavOpened })),
  setNavOpen: (val: boolean) => set({ isNavOpened: val })
}))
