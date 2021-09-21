import React from 'react';
import './App.css';
import { initializeApp } from 'firebase/app';
import firebaseConfig from './Firebase.Config';
initializeApp(firebaseConfig);

function App() {
  return (
    <div>
      <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut amet obcaecati harum nesciunt laboriosam nostrum repudiandae aliquam laborum debitis asperiores earum, nihil at aliquid dolor, accusamus eius molestiae ipsum sapiente?</p>
      <form action="">
        <input type="email" name="" id="" />
        <input type="password" name="" id="" />
        <input type="submit" value="" />
      </form>
    </div>
  );
}

export default App;
