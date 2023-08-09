import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
  DoubleArrowUpIcon,
  ReloadIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "PE",
    label: "Pending",
    icon: CircleIcon,
  },
  {
    value: "FR",
    label: "For Review",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "IP",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "CO",
    label: "Completed",
    icon: CheckCircledIcon,
  },
  {
    value: "RO",
    label: "Reopen",
    icon: ReloadIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "MD",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "HI",
    icon: ArrowUpIcon,
  },
  {
    label: "Immediate",
    value: "IM",
    icon: DoubleArrowUpIcon,
  },
];
