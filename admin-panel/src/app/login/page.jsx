"use client"
import React, { useState } from 'react';
import Button from '@/components/buttons/Button';
import { admin } from '@/context/UserContext';

function Login() {
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");
  const {login} = admin();

  const loginHandler = (e) => {
     e.preventDefault();
     login(username,password);
  }
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={loginHandler} method='POST'  className="background-transparent backdrop-blur-lg p-6 rounded-2xl shadow-lg w-80 space-y-4 inset-ring-2 inset-ring-green-700">
        <h1 className="text-xl font-semibold text-center text-white">Login</h1>
        <div>
          <input 
            type="text" 
            name="username" 
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div>
          <input 
            type="password" 
            name="password" 
            placeholder="Password"
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div className="pt-2 text-center">
          <Button name="Login" type="submit" onClick={loginHandler}/>
        </div>
      </form>
    </div>
  )
}

export default Login;