const z = require("zod").z;
const { email, password, required } = require("./validationRules");

exports.AuthUserSchema = z.object({
  email: email(),
  password: password(6),
});

exports.ForgotPasswordSchema = z.object({
  email: email(),
});

exports.AuthUserWithTokenSchema = z.object({
  email: email(),
  token: required("Token"),
});

exports.UpdatePasswordSchema = z
  .object({
    password: password(6),
    passwordConfirm: password(6, "Confirm Password"),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        message: "Password does not match",
        path: ["passwordConfirm"],
      });
    }
  });

exports.UpdateEmailSchema = z
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
