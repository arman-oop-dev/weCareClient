import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: ["https://wecare-nine-henna.vercel.app"],
  plugins: [jwtClient()],
});
