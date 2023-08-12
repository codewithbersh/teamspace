import { Member } from "@/types";
import { create } from "zustand";

interface useAcceptMember {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  member: Member | undefined;
  setMember: (member: Member | undefined) => void;
}

export const useAcceptMemberModal = create<useAcceptMember>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  member: undefined,
  setMember: (member: Member | undefined) => set({ member }),
}));
