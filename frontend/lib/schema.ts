import { z } from "zod";

export const teamSpaceSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(6, "Name should be at least 6 characters")
    .max(12, "Name should not exceed 12 characters")
    .trim()
    .refine(
      (name) => !/ {2,}/.test(name),
      "Name can't have two or more consecutive spaces"
    )
    .refine(
      (name) => /^[\w -]+$/.test(name),
      "Name can only contain letters, numbers, and space"
    ),
});

export const joinTeamSpaceSchema = z.object({
  code: z
    .string({ required_error: "Code is required to join a team space" })
    .min(8, "Code should be 8 digits")
    .max(8, "Code should be 8 digits"),
});

const assigneeSchema = z.object({
  value: z.string(),
  label: z.string(),
});

export const ticketSchema = z.object({
  type: z.enum(["FR", "IS", "IM"], {
    required_error: "Ticket type is required",
  }),
  priority: z.enum(["LW", "MD", "HI", "IM"], {
    required_error: "Ticket priority is required",
  }),
  title: z
    .string({ required_error: "Title is required" })
    .min(8, "Title should be at least 8 characters")
    .max(64, "Title should not exceed 64 characters")
    .trim(),
  description: z.string().max(512).optional(),
  starting_date: z.date().optional().nullable(),
  end_date: z.date().optional().nullable(),
  assignee: z.array(z.string()).optional(),
});

export const ticketCommentSchema = z.object({
  description: z
    .string({ required_error: "Comment should not be blank." })
    .max(64, "Comment should not exceed 64 characters")
    .nonempty("Comment should not be blank."),
});
