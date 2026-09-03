const raw =
  process.env.NEXT_PUBLIC_API_URL ??
  "https://admin.adcbind.com/api";

const API_BASE_URL = raw.replace(/\/api\/?$/, "");

export default API_BASE_URL;
