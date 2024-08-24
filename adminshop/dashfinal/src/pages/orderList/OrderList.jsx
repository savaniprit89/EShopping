import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userrequest } from "../../requestmethod";
import { Typography } from "@material-ui/core";

export default function OrderList() {

  
  const handleDelete = async(id) => {
    try {
      const user = localStorage.getItem('user');
      const json = JSON.parse(user);
      const token=json["accessToken"];
      const headers = { Authorization: `Bearer ${token}`};
      await userrequest.delete(`/orders/${id}`,{headers})
    } catch (error) {
      
    }
  };
  const [orders,setorders]=useState([])

  useEffect(() => {
const getorders=async ()=>{
  try {
    const user = localStorage.getItem('user');
    const json = JSON.parse(user);
    const token=json["accessToken"];
    const headers = { Authorization: `Bearer ${token}`};
  
  const res=await userrequest.get("/orders",{headers})

  setorders(res.data)
  }
  catch (error) {
    
  }
}
getorders();
  },[handleDelete])
  const columns = [
    { field: "userId", headerName: "ID", width: 220 },
    
    { field: "amount", headerName: "amount", width: 180 },
   
    { field: "address", headerName: "address", width: 180 },
    { field: "status", headerName: "status", width: 180 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
           
            <DeleteOutline
              className="orderListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="orderList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(row)=>row?._id}
      />
    </div>
  );
}
