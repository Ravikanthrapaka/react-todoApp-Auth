import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import Card from "./components/TodoCard";
import Loader from "./components/Loader";

import logo from "../src/assets/logo.svg"
import Intro from "./components/Intro";
import { useUser,useAuth } from "@clerk/clerk-react";










const firebaseUrl = import.meta.env.VITE_FIREBASE_URL;


function App(){

  let {user}=useUser();
  let{isSignedIn}=useAuth();


  
  let taskInput=useRef(null)
  
  let[todos,setTodos]=useState([])

  let[formStatus,setFormStatus]=useState(false)

  function handleSubmit(){
    let task=taskInput.current.value

    if(!task) return; 
    setFormStatus(true)
    axios.post(`${firebaseUrl}todos.json`,{

      title:task,
      createdBy:user.username
    }).then(()=>{
      setFormStatus(false);
      fetchTodos()
    })

  }



  function fetchTodos(){

    axios.get(`${firebaseUrl}todos.json`).then(todos=>{

      let tempTodos=[];

      for(let key in todos.data){

        let todo={
          id:key,
          ...todos.data[key]
        }
        tempTodos.push(todo)
      }
      setTodos(tempTodos)
      // console.log(tempTodos)
    })
  }

  function handleDelete(id){

    axios.delete(`${firebaseUrl}todos/${id}.json`).then(()=>{

      fetchTodos()
    })
    // console.log('delete func is called')
  }

  useEffect(()=>{
    fetchTodos()//function called
  },[])
  return(

    <>

    <div className="border-b py-3 px-5 ">
      <div className="max-w-4xl mx-auto flex justify-between ">
        {/* <h1 className="text-lg font-semibold">Todora</h1> */}
        <img className="h-8" src={logo} alt="" />
        <header>
      <SignedOut>
        <SignInButton className="bg-black text-white px-5 py-2 rounded-lg hover:cursor-pointer hover:bg-neutral-800" />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
      </div>
    </div>
    
   <SignedIn className="">
    <div>

    <div className="w-[400px] mx-auto mt-12 ">
      <h1 className="text-2xl font-bold">Manage your tasks!<span className="text-neutral-600">@{isSignedIn ? user.firstName : ""}</span></h1>
      <p className="text-neutral-600">Simple, fast, and effective task management for your daily workflow.</p>
      
      
      <div className="flex gap-2">
        <input ref={taskInput} className="mt-2 border rounded-xl p-3 w-full focus:outline-none border-neutral-300" type="text" placeholder="Add task i.e. Learn Hooks in react" />

      <button disabled={formStatus} onClick={handleSubmit} className="mt-2 bg-black py-3 px-8 rounded-xl text-white flex items-center gap-4">Add{!formStatus ? " " : <Loader/>}</button>
    
      </div>
      
    
    <div className="mt-12">

      

      {
        
        todos.filter(todo=> isSignedIn ? todo.createdBy==user.username : true).map(todo=><Card title={todo.title} id={todo.id} handleDelete={handleDelete} key={todo.id} />)
      }
    </div>
    
    
    </div>
   </div>
   </SignedIn>


   <SignedOut>

    <Intro/>
    
   </SignedOut>
    
    </>
  )
}



export default App;
