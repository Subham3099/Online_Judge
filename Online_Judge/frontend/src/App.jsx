import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Signup from './SignUp.jsx'
import Login from './Login.jsx';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Signup/>}></Route>
          <Route path = '/login' element = {<Login/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;