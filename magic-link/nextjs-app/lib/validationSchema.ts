import { z } from "zod";
import { email, required } from "./validationRules";

export const AuthUserSchema = z.object({
  email: email(),
});

export const AuthUserWithTokenSchema = z.object({
  email: email(),
  token: required("Token"),
});

export const UpdateEmailSchema = z
  .object({
    email: email(),
    emailConfirm: email("Confirm Email"),
  })
  .superRefine(({ email, emailConfirm }, ctx) => {
    if (email !== emailConfirm) {
      ctx.addIssue({
        code: "custom",
        message: "Email Address does not match",
        path: ["emailConfirm"],
      });
    }
  });
