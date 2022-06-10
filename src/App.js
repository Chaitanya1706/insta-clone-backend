import './App.css';
import Navbar from './components/navbar';
import './App.css'
import React, {useEffect,createContext, useReducer, Fragment, Switch, useContext} from 'react';
import {BrowserRouter, Route, Routes, useNavigate} from 'react-router-dom'


import Home from './components/screens/home'
import Signup from './components/screens/signup'
import Signin from './components/screens/signin'
import Profile from './components/screens/profile'
import CreatePost from './components/screens/createPost'
import {reducer,initialState} from './reducers/userReducer'

export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate()
  const {state,dispatch} = useContext(UserContext);
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch({type:"USER",payload:user})
    }else{
      navigate('/user/signin')
    }
  },[])
  return (
    <React.Fragment>
    <Routes>
        <Route path='/user/signin' element={<Signin/>}/>
      
        <Route path='/user/signup' element={<Signup/>}/>
        
        <Route path='/user/profile' element={<Profile/>}/>

        <Route path='/post/create' element={<CreatePost/>}/>

        <Route path='/' element={<Home/>}/>
      </Routes>
    </React.Fragment>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer,initialState);
  return (
    <UserContext.Provider value={{state,dispatch}}>
      <BrowserRouter>
        <Navbar/>
        
        <Routing/>
        
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
