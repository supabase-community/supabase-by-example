var express = require("express");
var router = express.Router();

const ZodError = require("zod").ZodError;
const { formatError, success, fault } = require("../lib/utils");
const { UpdateEmailSchema } = require("../lib/validationSchema");

const { createClient } = require("../lib/supabase");

router.get("/", function (req, res, next) {
  const session = res.locals.session;
  res.render("app/account/index", { user: session?.user });
});

router.get("/update-email", function (req, res, next) {
  const session = res.locals.session;
  res.render("app/account/update-email", { user: session?.user });
});
router.post("/update-email", async function (req, res, next) {
  const session = res.locals.session;
  const { email, emailConfirm } = req.body;
  try {
    UpdateEmailSchema.parse({ email, emailConfirm });
  } catch (err) {
    if (err instanceof ZodError) {
      const errs = formatError(err);
      return res.render("app/account/update-email", {
        errors: errs,
        user: session?.user,
        email,
        emailConfirm,
      });
    }
  }

  const supabase = createClient({ req, res });

  const { error } = await supabase.auth.updateUser({ email });

  if (error) {
    return res.render(
      "app/account/update-email",
      fault("Server error. Try again later.", {
        email,
        emailConfirm,
        user: session?.user,
      })
    );
  }

  res.render(
    "app/account/update-email",
    success("Your email was updated successfully.", { user: session?.user })
  );
});

module.exports = router;
