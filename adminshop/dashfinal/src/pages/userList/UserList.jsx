import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userrequest } from "../../requestmethod";

export default function UserList() {
  const [data, setData] = useState(userRows);

  
  const handleDelete = async(id) => {
    try {
      const user = localStorage.getItem('user');
      const json = JSON.parse(user);
      const token=json["accessToken"];
      const headers = { Authorization: `Bearer ${token}`};
      await userrequest.delete(`/users/${id}`,{headers})
    } catch (error) {
      
    }
  };
  const [users,setUsers]=useState([])

  useEffect(() => {
const getUsers=async ()=>{
  try {
    
    const user = localStorage.getItem('user');
      const json = JSON.parse(user);
      const token=json["accessToken"];
      const headers = { Authorization: `Bearer ${token}`};
  const res=await userrequest.get("/users",{headers})
  setUsers(res.data)
  }
  catch (error) {
    
  }
}
getUsers();
  },[handleDelete])
  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "user",
      headerName: "UserName",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 180 },
   
  
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
           
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
      <DataGrid
        rows={users}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row)=>row?._id}
      />
    </div>
  );
}
