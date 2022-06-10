import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
    const navigate = useNavigate();
    const {state,dispatch} = useContext(UserContext)
    const renderList = () =>{
        if(state){
            return [
                <li><Link to="/user/profile">Profile</Link></li>,
                <li><Link to="/post/create">Create Post</Link></li>,
                <li>
                    <button className="btn #c62828 red darken-3"
                    onClick={()=>{
                        localStorage.clear();
                        dispatch({type:"CLEAR"})
                        navigate('/user/signin')
                    }}
                    >LogOut</button>
                </li>
            ]
        }
        else{
            return [
                <li><Link to="/user/signin">Login</Link></li>,
                <li><Link to="/user/signup">Signup</Link></li>
            ]
        }
    }
    return (
        <nav>
            <div class="nav-wrapper white">
            <Link to={state ? "/" : "/user/signin"} className ="brand-logo left">Instagram</Link>
            
            <ul id="nav-mobile" className ="right">
                {renderList()}
            </ul>
            </div>
        </nav>
    )
}

export default Navbar;