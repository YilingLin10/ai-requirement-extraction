import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { signInSchema } from "./lib/zod"
import { prisma } from "@/lib/prisma"
import { verifyPassword } from "@/lib/password"
 
export default { providers: [
    Credentials({
        authorize: async (credentials) => {
          try {
            let user = null;
            const validatedData = signInSchema.safeParse(credentials);
            if (!validatedData.success) {
              return null;
            }
            const { email, password } = validatedData.data
            // verify if the user exists
            user = await prisma.user.findFirst({
              where: {
                email,
              }
            });
            if (!user || !user.email || !user.password) {
              return null;
            }
            const isValid = await verifyPassword(password, user.password)
            if (!isValid) {
              return null;
            }
            return user;
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            return null;
          }
        }
      }),
] } satisfies NextAuthConfig