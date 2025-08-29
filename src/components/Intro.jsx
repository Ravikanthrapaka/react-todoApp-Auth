
import hero from "../assets/hero.png"

import React from 'react'

function Intro() {
  return (
   <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-50 to-white p-6">
        
        <img className="h-36 inline" src={hero} alt="" />
        
        <h1 className="text-4xl font-extrabold mb-4 text-00">Welcome to Todora ✨</h1>
        <p className="text-gray-600 mb-6 text-center max-w-md">
          Todora helps you stay productive and organized.  
          Create tasks, track progress, and manage your day effortlessly.  
        </p>
        
</div>
  )
}

export default Intro
