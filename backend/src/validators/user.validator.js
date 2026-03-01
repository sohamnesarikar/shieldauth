import { z } from "zod";

export const registerUserSchema = z.object({
  username: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Username is required" : "Not a string",
    })
    .trim()
    .min(4, "Username must be atleast 4 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscore",
    ),

  email: z
    .email("Invalid email")
    .trim()
    .lowercase()
    .min(1, "Email is required"),

  password: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Password is required" : "Not a string",
    })
    .trim()
    .min(6, "Password must be atleast 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});
