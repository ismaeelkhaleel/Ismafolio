import React from 'react'
import Button from '@/components/buttons/Button'

function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form className="background-transparent backdrop-blur-lg p-6 rounded-2xl shadow-lg w-80 space-y-4">
        <h1 className="text-xl font-semibold text-center text-white">Login</h1>
        
        <div>
          <input 
            type="text" 
            name="username" 
            placeholder="Username"
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div>
          <input 
            type="password" 
            name="password" 
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        
        <div className="pt-2 text-center">
          <Button name="Login" />
        </div>
      </form>
    </div>
  )
}

export default Login