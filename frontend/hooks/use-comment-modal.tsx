import { Comment } from "@/types";
import { create } from "zustand";

interface useComment {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  comment: Comment | undefined;
  setComment: (comment: Comment | undefined) => void;
}

export const useCommentModal = create<useComment>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
  comment: undefined,
  setComment: (comment: Comment | undefined) => set({ comment }),
}));
