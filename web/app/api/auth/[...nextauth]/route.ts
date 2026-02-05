import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    // Optional: Add callbacks or pages configuration here
    pages: {
        signIn: '/login', // Custom login page
    },
});

export { handler as GET, handler as POST };
