import { Member, Ticket } from "@/types";
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

const ROLE_MAP: Record<Member["role"], string> = {
  NA: "Developer",
  AD: "Admin",
  SU: "Owner",
};

export const translateMemberRole = (code: Member["role"]) => {
  return ROLE_MAP[code] || "Unknown";
};

type OptionsType = {
  value: Ticket["status"];
  label: string;
  hidden?: boolean;
};

export const getOptions = (role: Member["role"]) => {
  const isHidden = role === "NA";
  const statuses: OptionsType[] = [
    {
      value: "PE",
      label: "Pending",
    },
    {
      value: "IP",
      label: "In progress",
    },
    {
      value: "FR",
      label: "For review",
    },
    {
      value: "CO",
      label: "Completed",
      hidden: isHidden,
    },
    {
      value: "RO",
      label: "Reopen",
      hidden: isHidden,
    },
  ];

  return statuses;
};
