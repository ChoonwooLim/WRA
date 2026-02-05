import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Mock User for Demonstration
                // In production, verify against database here
                if (credentials?.email === "admin@wra.com" && credentials?.password === "admin123") {
                    return { id: "admin", name: "Administrator", email: "admin@wra.com", image: "", role: "admin" };
                }
                if (credentials?.email === "test@wra.com" && credentials?.password === "password") {
                    return { id: "1", name: "Test Student", email: "test@wra.com", image: "", role: "student" };
                }
                // Accept any login for demo purposes if specific test user not used,
                // OR return null to fail. Let's return a dummy user for ANY input for smoother demo.
                if (credentials?.email) {
                    return { id: "demo-user", name: "Demo User", email: credentials.email, image: "" };
                }
                return null;
            }
        })
    ],
    // Optional: Add callbacks or pages configuration here
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                // @ts-ignore
                session.user.role = token.role;
            }
            return session;
        }
    },
    pages: {
        signIn: '/login', // Custom login page
    },
});

export { handler as GET, handler as POST };
