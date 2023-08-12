import { Member } from "@/types";
import { create } from "zustand";

interface useUpdateRole {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  member: Member | undefined;
  setMember: (member: Member | undefined) => void;
}

export const useUpdateRoleModal = create<useUpdateRole>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  member: undefined,
  setMember: (member: Member | undefined) => set({ member }),
}));
