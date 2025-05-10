import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export function middleware(request: NextRequest, res: NextResponse) {

    console.log("inside middleware")
    
    const token = request.cookies.get('token')?.value;

    if (!token) {
        console.log("no token")
        return NextResponse.redirect(new URL('/login', request.url));
    }

    console.log("token available ",token)
    
    return NextResponse.next();
    
    
    
}

export const config = {
    matcher: [],
};