import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "database";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import path from "path";

// Initialize Prisma
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET || "my-super-secret-jwt-key-that-is-at-least-32-chars-long",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string || "placeholder-google-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string || "placeholder-google-secret",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string || "placeholder-facebook-id",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string || "placeholder-facebook-secret",
    }),
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        if (!user || !user.passwordHash) {
          throw new Error("Invalid credentials");
        }
        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role || "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).role = token.role as string;
      }
      return session;
    }
  }
};
