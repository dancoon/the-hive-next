import type { NextAuthOptions } from "next-auth";
import GoogleProvidor from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
export default {
  providers: [
    GoogleProvidor({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRETE!,
    }),
    GithubProvider({
      clientSecret: process.env.GITHUB_CLIENT_SECRETE!,
      clientId: process.env.GITHUB_CLIENT_ID!,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "e.g vstech",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "***********",
        },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        try {
          const res = await fetch("/your/endpoint", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          });
          const user = await res.json();

          // If no error and we have user data, return it
          if (res.ok && user) {
            return user;
          }
        } catch (error) {
          console.error("Err authenticating with credentials: ", error);
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
} as NextAuthOptions;
