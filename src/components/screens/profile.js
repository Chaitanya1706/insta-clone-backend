import React, {useEffect,useState,useContext} from "react";
import '../../asset/profile.css'
import { UserContext } from "../../App";

const Profile = () => {
    const [mypics,setPics] = useState([])
    const {state,dispatch} = useContext(UserContext)
    useEffect(()=>{
        fetch('/post/myposts',{
            headers : {
                "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result);
            setPics(result.myposts);
        })
    },[])

    return (
        <div style={{maxWidth : "550px", margin : "0px auto"}}>
            <div className="profile_details">
                <div className="profile_pic">
                    <img src="https://images.unsplash.com/photo-1541911087797-f89237bd95d0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlcnNvbnxlbnwwfDJ8MHx8&auto=format&fit=crop&w=600&q=60"/>
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                    <div className="numbers">
                        <h6>120 posts</h6>
                        <h6>1.2M followers</h6>
                        <h6>316 following</h6>
                    </div>
                </div>
            </div>

            <div className="gallery">
                  {
                      mypics.map(item=>{
                          return(
                            <img className="item" src={item.photo} alt={item.title}/>
                              
                          )
                      })
                  }

                 {/* <img className="item" src="https://images.unsplash.com/photo-1472213984618-c79aaec7fef0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=600&q=60"/>
                 <img className="item" src="https://images.unsplash.com/photo-1471180625745-944903837c22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=600&q=60"/>
                 <img className="item" src="https://images.unsplash.com/photo-1553856622-d1b352e9a211?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fG5hdHVyZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=600&q=60"/>
                 <img className="item" src="https://images.unsplash.com/photo-1559244673-9cee88d551f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fG5hdHVyZXxlbnwwfDJ8MHx8&auto=format&fit=crop&w=600&q=60"/>
                 <img className="item" src="https://images.unsplash.com/photo-1433048980017-63f162f662b0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=600&q=60"/> */}

            </div>
        </div>
    )
}

export default Profile;