import { Ticket } from "@/types";
import { create } from "zustand";

interface useDeleteTicket {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  ticket: Ticket | undefined;
  setTicket: (ticket: Ticket | undefined) => void;
}

export const useDeleteTicketModal = create<useDeleteTicket>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  ticket: undefined,
  setTicket: (ticket: Ticket | undefined) => set({ ticket }),
}));
