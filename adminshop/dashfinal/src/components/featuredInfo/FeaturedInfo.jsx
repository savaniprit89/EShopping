import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { userrequest } from "../../requestmethod";

export default function FeaturedInfo() {
 
    const[income ,setincome]=useState([
  ]);
const[pre,setper]=useState(0)

    useEffect(() => {
    const getincome=async()=>{
      try {
        const user = localStorage.getItem('user');
    const json = JSON.parse(user);
    const token=json["accessToken"];
    const headers = { Authorization: `Bearer ${token}`};
        const res=await userrequest.get("/orders/income",{headers});
        setincome(res.data)
        console.log(income)
        setper((res.data[1].total*100) / res.data[0].total  - 100);

      } catch (error) {
        
      }
    }
    getincome()
    }, [])
    console.log(income)
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[1]?.total}</span>
          <span className="featuredMoneyRate">
            %{Math.floor(pre)} 
            {
              pre < 0 ?(<ArrowDownward  className="featuredIcon negative"/>):(<ArrowUpward className="featuredIcon"/>)
            }
            
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/> 
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
