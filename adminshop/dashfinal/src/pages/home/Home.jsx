import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useMemo, useState } from "react";
import { userrequest } from "../../requestmethod";

export default function Home() {
  const [userStats,setUserstats]=useState([])
const MONTHS = useMemo(
  () => [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  []
);

useEffect(() => {
  const getStats = async () => {
    try {
      const user = localStorage.getItem('user');
      const json = JSON.parse(user);
      const token=json["accessToken"];
      const headers = { Authorization: `Bearer ${token}`};
      const res = await userrequest.get("/users/stats",{headers});
      res.data.map((item) =>
        setUserstats((prev) => [
          ...prev,
          { name: MONTHS[item._id - 1], "Active User": item.total },
        ])
      );
    } catch {}
  };
  getStats();
}, [MONTHS]);
console.log(userStats)
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
