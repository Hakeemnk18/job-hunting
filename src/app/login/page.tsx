'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name,setName] = useState('')
    const [error, setError] = useState({
        nameError:'',
        emailError:'',
        passwordError:''
    });
    
    const [loginStatus, setLoginStatus] = useState('Login')

    
    //handle login
    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        let isValid = true
       
        const errorObj = {
            nameError:'',
            emailError:'',
            passwordError:''
        }
        if(name.trim() === '' && loginStatus === 'SignUp'){
            errorObj.nameError = "Name is required"
            isValid = false
        }
        
        if(password.trim() === ''){
            errorObj.passwordError = 'Password is required'
            isValid = false
        }
        
        if(email.trim() === ''){
           
            errorObj.emailError = 'Email is Required'
            isValid = false
        }

        if(!isValid){
            
            setError(errorObj)
            return
        }
        
        setError(errorObj)

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            router.push('/dashboard'); // Redirect on success
        } else {
            setError(data.message || 'Login failed');
        }
    }

    //handle sign in 
    async function handleSignIn(e: React.FormEvent) {
        e.preventDefault();
        

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();

        if (res.ok) {
            router.push('/dashboard'); // Redirect on success
        } else {
            setError(data.message || 'Login failed');
        }
    }

    return (
        

        
        <div className="bg-[url('https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover flex items-center justify-center h-screen  ">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
                <h2 className="text-2xl mb-4 font-bold">{loginStatus}</h2>
                
                {loginStatus === 'SignUp'
                    ?
                    <>
                        <input
                        type="text"
                        placeholder="full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border p-2 mb-6 rounded-[10px] border-gray-400"
                        required
                    />
                    { error.nameError && <span className='text-red-400'>Name is required</span>}
                    
                    </>
                    
                    : <></>
                }
                <>
                <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border p-2 mb-6 rounded-[10px] border-gray-400"
                        
                    />
                    { error.emailError && <span className='text-red-400'>Email is required</span>}
                    
                </>
                <>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border p-2 mb-6 rounded-[10px] border-gray-400"
                    
                />
                { error.passwordError && <span className='text-red-400'>Password is required</span>}
                
                </>
                
                {
                    loginStatus === 'SignUp'
                    ?  <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full rounded-[10px]">
                          Sign up
                       </button>
                    :
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 w-full rounded-[10px]">
                       Login
                    </button>
                }

                {
                    loginStatus === 'SignUp' 
                    ? <button
                        onClick={()=> setLoginStatus('Login')}
                    >already have an account ? <a className='text-blue-400'>login</a></button>
                    : <button
                    onClick={()=> setLoginStatus('SignUp')}
                    >new user ? <a className='text-blue-400'>sign up</a></button>
                }
                
            </form>
        </div>
        
    );
}
