exports.config = {
  siteUrl: process.env.APP_BASE_URL,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
};

exports.formatError = (zodError) => {
  const formattedErrors = {};
  zodError.errors.forEach((err) => {
    const k = err.path.pop();
    if (formattedErrors[k] == null) {
      formattedErrors[k] = err.message;
    }
  });
  return formattedErrors;
};

exports.success = (message, data) => ({
  success: true,
  message,
  ...data,
});

exports.fault = (message, data) => ({
  success: false,
  message,
  ...data,
});
