import { NextRequest, NextResponse } from 'next/server';
import { validate } from '@/utils/validateUser';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(req: NextRequest) {

    console.log("inside login")
    const { email, password } = await req.json();
    console.log("email " + email + " password " + password)

    if (!email || !password) {
        return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const user = await validate(password, email)

    if (!user) {
        console.log("no user exist")
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!);

    

    //   // Normally you'd set cookies or JWT here

    (await cookies()).set('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
    });

    
    return NextResponse.json({ message: 'Login successful' });
}
