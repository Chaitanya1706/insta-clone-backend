import React, {useState,useEffect, useContext} from "react";
import '../../asset/home.css'
import { UserContext } from "../../App";

const Home = () => {
    const {state,dispatch} = useContext(UserContext);
    const [data,setData] = useState([])
    useEffect(()=>{
        fetch('/post/allpost',{
            headers : {
                "Authorization" : "Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setData(result.posts)
        })
    },[])

    const likePost = (id) => {
        fetch('/post/like',{
            method : "put",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            body : JSON.stringify({
                postId : id
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result);
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    const unlikePost = (id) => {
        fetch('/post/unlike',{
            method : "put",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            },
            body : JSON.stringify({
                postId : id
            })
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result);
            const newData = data.map(item=>{
                if(item._id==result._id){
                    return result
                }
                else{
                    return item
                }
            })
            setData(newData)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    return (
        <div className="home">

            {
                data.map(item=>{
                    return(
                        <div className="card home_card">
                            <h5>{item.postedBy.name}</h5>
                            <div className="card-image">
                                <img src={item.photo}/>
                            </div>
                            <div className="card-content">
                                <i className="material-icons" style={{color : "red"}}>favorite</i>
                                {item.likes.includes(state._id)
                                ?
                                <i className="material-icons click"
                                onClick={()=>{unlikePost(item._id)}}
                                >thumb_down</i>
                                :
                                <i className="material-icons click"
                                onClick={()=>{likePost(item._id)}}
                                >thumb_up</i>
                                }
                                
                                <h6>{item.likes.length} likes</h6>
                                <h6>{item.title}</h6>
                                <p>{item.body}</p>
                                <input type="text" placeholder="add comment"/>
                            </div>
                        </div>
                    )
                })
            }

            
        </div>
    )
}

export default Home;