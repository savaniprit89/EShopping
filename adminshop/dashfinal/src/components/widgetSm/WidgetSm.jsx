import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userrequest } from "../../requestmethod";

export default function WidgetSm() {
  const [users,setUsers]=useState([])

  useEffect(()=>{
const getUsers=async ()=>{
  try {
    
    const user = localStorage.getItem('user');
    const json = JSON.parse(user);
    const token=json["accessToken"];
    const headers = { Authorization: `Bearer ${token}`};
  const res=await userrequest.get("/users?new=true",{headers})
  setUsers(res.data)
  }
  catch (error) {
    
  }
}
getUsers();
  },[])
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
      {users.map(user=>(
        <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.img||""}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li> 
        ))}
      </ul>
    </div>
  );
}
