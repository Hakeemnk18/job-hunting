import { NextRequest, NextResponse } from 'next/server';
import { register } from '@/utils/addUser';

export async function POST(req: NextRequest) {
    
    console.log("inside signup")
    const { email, password, name } = await req.json();
    console.log("email "+email+" password "+password+" name : "+name)


    if (!email || !password) {
        return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const user = await register(name,email,password)

    if (!user) {
        console.log("user exist")
        return NextResponse.json({ message: 'Email already registered' }, { status: 401 });
    }


   return NextResponse.json({ message: 'Login successful'});
}