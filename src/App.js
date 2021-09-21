import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile } from "firebase/auth";
import './App.css';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './Firebase.Config';
initializeApp(firebaseConfig);


function App() {
  const [newUser,setNewUser]=useState(false)
  const auth = getAuth();
  const [user,setUser]=useState({
    isSignIn:false,
    name:"",
    email:"",
    photo:"",
    password:"",
    errorMessage:"",
    success:false,
    newUser:false,
  })

   const handleBlur=(e)=>{
    let isFormValid=true;
    if(e.target.name==="email")
    {
      isFormValid= /\S+@\S+\.\S+/.test(e.target.value);
    }
    if(e.target.name==="password")
    {
      isFormValid=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/.test(e.target.value);
      // const isValiedd= e.target.value.length>5;
    }
    if(isFormValid){
      const newUserUpdate={...user}
      newUserUpdate[e.target.name]=e.target.value;
      setUser(newUserUpdate)

    }
   }

   const handleSignIn=(e)=>{
   if(newUser && user.name && user.password){
    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then(() => {
      // Signed in 
      const newUserUpdate={...user}
      newUserUpdate["errorMessage"]="";
      newUserUpdate["success"]=true;
      setUser(newUserUpdate)
      UpdateUser(user.name)
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      const errorMessage = error.message;
      // console.log(errorCode,errorMessage);
      const newUserUpdate={...user}
      newUserUpdate["errorMessage"]=errorMessage;
      newUserUpdate["success"]=false;
      setUser(newUserUpdate)
      // ..
    });
   }
   if(!newUser && user.email && user.password){
    const auth = getAuth();
  signInWithEmailAndPassword(auth, user.email, user.password)
  .then((req) => {
    // Signed in 
    const newUserUpdate={...user}
      newUserUpdate["errorMessage"]="";
      newUserUpdate["success"]=true;
      setUser(newUserUpdate)
      console.log(req.user);
    // ...
  })
  .catch((error) => {
    const errorMessage = error.message;
    const newUserUpdate={...user}
      newUserUpdate["errorMessage"]=errorMessage;
      newUserUpdate["success"]=false;
      setUser(newUserUpdate)
  });
   }
   e.preventDefault();
  }
  const UpdateUser= name=>{
    const auth = getAuth();
updateProfile(auth.currentUser, {
  displayName: name,
}).then(() => {
  console.log("user name update successfully.");
  // ...
}).catch((error) => {
  console.log(error);
  // ...
});
  }

  return (
    <div style={{padding:"20px",margin:"20px"}}>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut amet obcaecati harum nesciunt laboriosam nostrum repudiandae aliquam laborum debitis asperiores earum, nihil at aliquid dolor, accusamus eius molestiae ipsum sapiente?</p>

      <form action="" onSubmit={handleSignIn}>
        <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="" id="newUser" />
        <label htmlFor="newUser">newUser</label> <br /> <br />
       {
         newUser &&  <input type="text" onBlur={handleBlur} name="name" placeholder="your name" required />
       } <br /> <br />
        <input type="email" onBlur={handleBlur} name="email" id="email" placeholder="Email"required /> <br /> <br />
        <input type="password" onBlur={handleBlur} name="password" id="password" placeholder="Password"required /> <br /> <br />
        <input  type="submit" value={newUser?"sign Up":"sign In"} /> <br />
      </form>
      {
        user.errorMessage && <p style={{color:"red",padding:"10px",backgroundColor:"#ddd"}}>{user.errorMessage}</p>
        
      }
      {
        user.success &&<p style={{color:"black",padding:"10px",backgroundColor:"#ddd"}}>user {newUser ?"new account create":"Log in "} successfully</p>
      }
      {/* <p>Name: {user.name}</p>
      <p>Email:{user.email}</p>
      <p>Passsword:{user.password}</p> */}
    </div>
  );
}

export default App;
