import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings} from "@material-ui/icons";
import {  useDispatch, useSelector } from "react-redux";
import { logoutt } from "../../redux/apiCalls";
import { Navigate, useNavigate } from "react-router-dom";
export default function Topbar() {
const navigate=useNavigate();
  const user=useSelector(state=>state.user.currentUser)
  console.log(user)
  const dispatch = useDispatch();
  const handleclick=()=>{
    
    logoutt(dispatch)
    navigate("/login")
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">EShopping</span>
        </div>
        <div className="topRight">
      
          <div className="topbarIconContainer">
            <button onClick={handleclick}>Logout</button>
          </div>
          {user?.username}
          <img src={user?.img} alt="" className="topAvatar" />
        
        </div>
      </div>
    </div>
  );
}
