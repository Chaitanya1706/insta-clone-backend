import React, {useState} from "react";
import { Link , useNavigate } from "react-router-dom";
import M from 'materialize-css'

const Signup = () => {
    const navigate = useNavigate()
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const PostData = () => {
        fetch("/user/signup", {
            method : "post",
            headers : {
                "Content-Type" : "application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res => res.json())
        .then(data => {
            if(data.error){
                M.toast({html : data.error,classes : "#c62828 red darken-3"})
            }
            else{
                M.toast({html : data.message, classes : "#43a047 green darken-1"})
                navigate('/user/signin');
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
                <input type="text" placeholder="Username" value={name}
                onChange = {(e)=>setName(e.target.value)}
                />
                <input type="email" placeholder="email" value={email}
                onChange = {(e)=>setEmail(e.target.value)}
                />
                <input type="password" placeholder="password" value={password}
                onChange = {(e)=>setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
                onClick={()=>PostData()}
                >SignUp</button>
                <h5>
                    <Link to="/user/signin">Already Have an Account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup;