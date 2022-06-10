import React, {useState,useContext} from "react";
import { Link , useNavigate } from "react-router-dom";
import M from 'materialize-css'
import { UserContext } from "../../App";

const Signin = () => {
    const {state,dispatch} = useContext(UserContext);
    const navigate = useNavigate()
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const PostData = () => {
        fetch("/user/signin", {
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.error){
                M.toast({html : data.error,classes : "#c62828 red darken-3"})
                return
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html : "SigIn Successfull", classes : "#43a047 green darken-1"})
                navigate('/');
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input type="email" placeholder="email" value={email}
                onChange = {(e)=>setEmail(e.target.value)}
                />
                <input type="password" placeholder="password" value={password}
                onChange = {(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>PostData()}
                >SignIn</button>
                <h5>
                    <Link to="/user/signup">Don't Have an Account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signin;