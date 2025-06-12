import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
  profile?: string;
}

interface UserWithoutPassword {
  id: string;
  email: string;
  name: string;
  profile?: string;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const users: MockUser[] = [
          { id: "1", email: "user@example.com", password: "password123", name: "Usuário Teste" },
          { id: "2", email: "loja@example.com", password: "password123", name: "Loja Teste", profile: "Loja" },
          { id: "3", email: "influencer@example.com", password: "password123", name: "Influencer Teste", profile: "Influencer" },
        ];

        const user = users.find(u => u.email === credentials?.email);

        if (user && user.password === credentials?.password) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            ...(user.profile && { profile: user.profile })
          };
        }
        return null;
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        const userWithProfile = user as UserWithoutPassword;
        if (userWithProfile.profile) {
          token.profile = userWithProfile.profile;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.profile = token.profile as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };