const z = require("zod").z;
const { email, password, required } = require("./validationRules");

exports.AuthUserSchema = z.object({
  email: email(),
});

exports.AuthUserWithTokenSchema = z.object({
  email: email(),
  token: required("Token"),
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
