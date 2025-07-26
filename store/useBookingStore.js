import { create } from 'zustand';

export const useBookingStore = create((set) => ({
  selectedRetreatId: null,
  selectedDate: null,
  selectedPeople: null,
  participants: [], // Array des participants avec leurs coordonnées
  setRetreatId: (id) => set({ selectedRetreatId: id }),
  setDate: (date) => set({ selectedDate: date }),
  setPeople: (n) => set({ selectedPeople: n }),
  setParticipants: (participants) => set({ participants }),
  addParticipant: (participant) =>
    set((state) => ({
      participants: [...state.participants, participant],
    })),
  updateParticipant: (index, participant) =>
    set((state) => ({
      participants: state.participants.map((p, i) => (i === index ? participant : p)),
    })),
  removeParticipant: (index) =>
    set((state) => ({
      participants: state.participants.filter((_, i) => i !== index),
    })),
  resetBooking: () =>
    set({
      selectedRetreatId: null,
      selectedDate: null,
      selectedPeople: null,
      participants: [],
    }),
}));
