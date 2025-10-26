import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/lib/mongodb';
import Employee from '@/models/Employee';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter your email and password');
        }

        await connectDB();

        const employee = await Employee.findOne({ email: credentials.email });
        
        if (!employee) {
          throw new Error('No employee found with this email');
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          employee.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        return {
          id: employee._id.toString(),
          email: employee.email,
          name: employee.name,
          role: employee.role,
          employeeId: employee.employeeId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.employeeId = (user as any).employeeId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).employeeId = token.employeeId;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

