import { Ticket } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const { parseISO, format } = require("date-fns");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(inputDate: Date) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

const PRIORITY_MAP: Record<Ticket["priority"], string> = {
  LW: "Low",
  MD: "Medium",
  HI: "High",
  IM: "Immediate",
};

export const translateTicketPriority = (code: Ticket["priority"]) => {
  return PRIORITY_MAP[code] || "Unknown";
};

const TYPE_MAP: Record<Ticket["type"], string> = {
  IM: "Improvement",
  FR: "Feature Request",
  IS: "Issue",
};

export const translateTicketType = (code: Ticket["type"]) => {
  return TYPE_MAP[code] || "Unknown";
};

const STATUS_MAP: Record<Ticket["status"], string> = {
  CO: "Completed",
  FR: "For review",
  IP: "In progress",
  PE: "Pending",
  RO: "Reopen",
};

export const translateTicketStatus = (code: Ticket["status"]) => {
  return STATUS_MAP[code] || "Unknown";
};
