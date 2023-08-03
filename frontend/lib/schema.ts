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
      (name) => /^[\w ]+$/.test(name),
      "Name can only contain letters, numbers, and space"
    ),
});

export const joinTeamSpaceSchema = z.object({
  code: z
    .string({ required_error: "Code is required to join a team space" })
    .min(8, "Code should be 8 digits")
    .max(8, "Code should be 8 digits"),
});
