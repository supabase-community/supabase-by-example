const {
  createSupabaseClient,
  CookieAuthStorageAdapter,
  DEFAULT_COOKIE_OPTIONS,
} = require("@supabase/auth-helpers-shared");

class ExpressStorageAdapter extends CookieAuthStorageAdapter {
  constructor(context, cookieOptions) {
    super(cookieOptions);
    this.context = context;
  }

  getCookie(name) {
    const cookies = this.context.req.cookies;
    const cookie = cookies[name] ?? "";
    return decodeURIComponent(cookie);
  }
  setCookie(name, value) {
    if (!this.context.res) return;
    this.context.res.cookie(name, encodeURIComponent(value), {
      ...this.cookieOptions,
      sameSite: "Lax",
      httpOnly: false,
    });
  }
  deleteCookie(name) {
    if (!this.context.res) return;
    this.context.res.cookie(name, "", { maxAge: -1 });
  }
}

exports.createClient = (
  context,
  {
    supabaseUrl = process.env.SUPABASE_URL,
    supabaseKey = process.env.SUPABASE_ANON_KEY,
    options,
    cookieOptions,
  } = {}
) => {
  return createSupabaseClient(supabaseUrl, supabaseKey, {
    ...options,
    global: {
      ...options?.global,
      headers: {
        ...options?.global?.headers,
        "X-Client-Info": `expressjs@0.0.1`,
      },
    },
    auth: {
      storageKey: cookieOptions?.name,
      storage: new ExpressStorageAdapter(context, {
        ...DEFAULT_COOKIE_OPTIONS,
        ...cookieOptions,
      }),
    },
  });
};
