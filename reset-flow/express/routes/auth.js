const express = require("express");
const router = express.Router();

const ZodError = require("zod").ZodError;
const { formatError, success, fault } = require("../lib/utils");
const {
  AuthUserSchema,
  ForgotPasswordSchema,
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
  const { error } = await supabase.auth.signInWithPassword({ email, password });

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
  res.redirect(303, "/");
});

router.get("/signup", function (req, res, next) {
  res.render("auth/signup", { email: "", title: "Sign up" });
});
router.post("/signup", async function (req, res, next) {
  const { email, password } = req.body;
  try {
    AuthUserSchema.parse({ email, password });
  } catch (err) {
    if (err instanceof ZodError) {
      const errs = formatError(err);
      return res.render("auth/signup", {
        errors: errs,
        email,
      });
    }
  }

  const supabase = createClient({ req, res });

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `http://localhost:3000/auth/callback`,
    },
  });

  if (error) {
    if (error && error.status === 400) {
      return res.render(
        "auth/signup",
        fault("Invalid credentials.", { email })
      );
    }

    return res.render("auth/signup", fault(error.message, { email }));
  }

  res.render(
    "auth/signup",
    success("Please check your email for a magic link to log into the website.")
  );
});

router.get("/forgotpassword", function (req, res, next) {
  res.render("auth/forgotpassword", { email: "", title: "Sign up" });
});
router.post("/forgotpassword", async function (req, res, next) {
  const { email } = req.body;
  try {
    ForgotPasswordSchema.parse({ email });
  } catch (err) {
    if (err instanceof ZodError) {
      const errs = formatError(err);
      return res.render("auth/forgotpassword", {
        errors: errs,
        email,
      });
    }
  }

  const supabase = createClient({ req, res });

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `http://localhost:3000/auth/callback?next=/account/update-password`,
  });

  if (error) {
    return res.render(
      "auth/forgotpassword",
      fault("Server error. Try again later.", { email })
    );
  }

  res.render(
    "auth/forgotpassword",
    success(
      "Please check your email for a password reset link to log into the website."
    )
  );
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
