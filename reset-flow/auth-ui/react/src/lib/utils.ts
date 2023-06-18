import type { ZodError } from "zod";

export const formatError = (zodError: ZodError) => {
  const formattedErrors: Record<string, string> = {};
  zodError.errors.forEach((err) => {
    const k = err.path.pop() as string;
    if (formattedErrors[k] == null) {
      formattedErrors[k] = err.message;
    }
  });
  return formattedErrors;
};

export const success = <T extends Record<string, unknown> | undefined>(
  message: string,
  data?: T
) => ({
  success: true,
  message,
  ...data,
});

export const fault = <T extends Record<string, unknown> | undefined>(
  message: string,
  data?: T
) => ({
  success: false,
  message,
  ...data,
});

export function waitload(sec: number) {
  return new Promise((resolve) => setTimeout(resolve, sec * 1000));
}

export const classAppearance = {
  extend: false,
  className: {
    container: "space-y-2 mb-4",
    label: "text-gray-500 py-2 mb-2 block w-full",
    input:
      "py-2 px-3 border text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 rounded w-full mb-2",
    button:
      "w-full block bg-blue-500 border border-blue-700 hover:border-blue-400 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded px-4 py-3 mt-6",
    message:
      "font-regular text-center mb-4 block w-full p-4 text-base text-red-500 mt-5",
  },
};
