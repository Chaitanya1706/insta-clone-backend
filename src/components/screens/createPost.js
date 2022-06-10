import React, {useState,useEffect} from "react";
import { Link , useNavigate } from "react-router-dom";
import M from 'materialize-css'

const CreatePost = () => {
    
    const navigate = useNavigate()
    const [title,setTitle] = useState("");
    const [body,setBody] = useState("");
    const [image,setImage] = useState("");
    const [url,setUrl] = useState("");

    useEffect(()=>{
        if(url){
            fetch("/post/createpost", {
                method : "post",
                headers : {
                    "Content-Type" : "application/json",
                    "Authorization" : "Bearer "+localStorage.getItem("jwt")
                },
                body:JSON.stringify({
                    title,
                    body,
                    photo:url
                })
            }).then(res => res.json())
            .then(data => {
                // console.log(url);
                // console.log(data);
                if(data.err){
                    M.toast({html : data.err,classes : "#c62828 red darken-3"})
                    return;
                }
                else{
                    M.toast({html : "Posted Successfully", classes : "#43a047 green darken-1"})
                    navigate('/');
                }
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },[url])

    const postDetails = () => {
        const data = new FormData();
        data.append("file", image)
        data.append("upload_preset","insta-clone")
        data.append("cloud_name","chats")
        fetch("https://api.cloudinary.com/v1_1/chats/image/upload",{
            method : "post",
            body : data
        })
        .then(res=>res.json())
        .then(data=>{
            // console.log(data)
            setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })


        // fetch("/post/createpost", {
        //     method : "post",
        //     headers : {
        //         "Content-Type" : "application/json",
        //         "Authorization" : "Bearer "+localStorage.getItem("jwt")
        //     },
        //     body:JSON.stringify({
        //         title,
        //         body,
        //         photo:url
        //     })
        // }).then(res => res.json())
        // .then(data => {
        //     // console.log(url);
        //     // console.log(data);
        //     if(data.err){
        //         M.toast({html : data.err,classes : "#c62828 red darken-3"})
        //         return;
        //     }
        //     else{
        //         M.toast({html : "Posted Successfully", classes : "#43a047 green darken-1"})
        //         navigate('/');
        //     }
        // })
        // .catch(err=>{
        //     console.log(err)
        // })

    }

    return (
        <div className="card input-field" style={{
            margin : "30px auto", 
            maxWidth: "500px",
            padding: "10px",
            textAlign : "center"
            }}
        >
            <input type="text" placeholder="title" value={title}
            onChange ={(e)=> {setTitle(e.target.value)}}
            />
            <input type="text" placeholder="description" value={body}
            onChange ={(e)=> {setBody(e.target.value)}}
            />
            <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Uplaod Image</span>
                <input type="file"
                onChange ={(e)=> setImage(e.target.files[0])}
                />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/>
            </div>
            </div>
            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postDetails()}
            >Submit Post</button>

        </div>
    )
}

export default CreatePost;