import { NextRequest, NextResponse } from 'next/server';
//import { validateUser } from '@/lib/auth';

export async function POST(req: NextRequest) {
    console.log("inside login api")
//   const { email, password } = await req.json();

//   if (!email || !password) {
//     return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
//   }

//   //const user = await validateUser(email, password);

//   if (!user) {
//     return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
//   }

//   // Normally you'd set cookies or JWT here
   return NextResponse.json({ message: 'Login successful'});
}
