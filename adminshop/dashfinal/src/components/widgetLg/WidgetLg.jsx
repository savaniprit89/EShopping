import { useEffect, useState } from "react";
import { userrequest } from "../../requestmethod";
import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  
  const [orders,setOrders]=useState([])

  useEffect(()=>{
const getOrders=async ()=>{
  try {
    
    const user = localStorage.getItem('user');
    const json = JSON.parse(user);
    const token=json["accessToken"];
    const headers = { Authorization: `Bearer ${token}`};
  const res=await userrequest.get("/orders",{headers})
  setOrders(res.data)
  }
  catch (error) {
    
  }
}
getOrders();
  },[])
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map(order=>(
        <tr className="widgetLgTr" key={order._id}>
          <td className="widgetLgUser">
            <span className="widgetLgName">{order.userId}</span>
          </td>
          <td className="widgetLgDate">{order.createdAt}</td>
          <td className="widgetLgAmount">${order.amount}</td>
          <td className="widgetLgStatus">
            <Button type={order.status} />
          </td>
        </tr>
        ))}
    
      </table>
    </div>
  );
}
