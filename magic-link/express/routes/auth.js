const express = require("express");
const router = express.Router();

const ZodError = require("zod").ZodError;
const { formatError, success, fault, config } = require("../lib/utils");
const {
  AuthUserSchema,
  ForgotPasswordSchema,
  AuthUserWithTokenSchema,
} = require("../lib/validationSchema");

const { createClient } = require("../lib/supabase");

router.get("/signin", function (req, res, next) {
  res.render("auth/signin", { email: "", title: "Sign In" });
});
router.post("/signin", async function (req, res, next) {
  const { email, password } = req.body;
  try {
    AuthUserSchema.parse({ email, password });
  } catch (err) {
    if (err instanceof ZodError) {
      const errs = formatError(err);
      req.flash("errors", errs);
      return res.render("auth/signin", { errors: errs, email });
    }
  }

  const supabase = createClient({ req, res });
  // try signing in
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${config.siteUrl}/auth/callback` },
  });

  if (error) {
    if (error && error.status === 400) {
      return res.render(
        "auth/signin",
        fault("Email or Password is incorrect.", { email })
      );
    }

    return res.render("auth/signin", fault(error.message, { email }));
  }

  // redirect to / if successful
  res.render(
    "auth/signin",
    success("Please check your email for a magic link to log into the website.")
  );
});

router.get("/verify-token", function (req, res, next) {
  res.render("auth/verify-token", { email: "", title: "Verify Token" });
});
router.post("/verify-token", async function (req, res, next) {
  const { email, token } = req.body;
  try {
    AuthUserWithTokenSchema.parse({ email, token });
  } catch (err) {
    if (err instanceof ZodError) {
      const errs = formatError(err);
      return res.render("auth/verify-token", { errors: errs, email, token });
    }
  }

  const supabase = createClient({ req, res });
  // try signing in
  const { error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    if (error && error.status === 400) {
      return res.render(
        "auth/verify-token",
        fault("Email or Token is incorrect.", { email, token })
      );
    }

    return res.render("auth/verify-token", fault(error.message, { email }));
  }

  // redirect to / if successful
  res.redirect(303, "/");
});

router.get("/callback", async function (req, res) {
  const code = req.query.code;
  const next = req.query.next ?? "/";

  if (code) {
    const supabase = createClient({ req, res });
    await supabase.auth.exchangeCodeForSession(code);
  }

  res.redirect(303, next);
});

router.get("/confirm", async function (req, res) {
  const token_hash = req.query.token_hash;
  const type = req.query.type;
  const next = req.query.next ?? "/";

  if (token_hash && type) {
    const supabase = createClient({ req, res });
    await supabase.auth.verifyOtp({ type, token_hash });
  }

  res.redirect(303, `/${next.slice(1)}`);
});

router.post("/signout", async function (req, res) {
  const supabase = createClient({ req, res });

  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    await supabase.auth.signOut();
    res.redirect(302, "/auth/signin");
  }
});

module.exports = router;
