import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Signup from './SignUp.jsx'
import Login from './Login.jsx';
import Home from './framework/Home.jsx';
import ProblemSet from './framework/ProblemSet.jsx';
import ProblemDesc from './framework/ProblemDesc.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Signup/>}></Route>
          <Route path = '/login' element = {<Login/>}></Route>
          <Route path = '/home' element = {<Home/>}></Route>
          <Route path = '/problemset' element = {<ProblemSet/>}></Route>
          <Route path = "/problemset/:id" element = {<ProblemDesc/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;