import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import StatusCard from "../components/status-card/StatusCard";
import Badge from "../components/badge/Badge";
import "../../src/assets/css/tableDashboard.css"

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};
 
const Dashboard = () => {
  const [topCustomer, setTopCustomer] = useState([]);
  const [latestorders, setLatestOrder] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const topCustomerUrl = "https://tengu-nodejs.herokuapp.com/api/analytics/top-customer";
  const latestOrderUrl = "https://tengu-nodejs.herokuapp.com/api/analytics/latest-orders";
  const analyticsUrl = "https://tengu-nodejs.herokuapp.com/api/order/statistics"
  const token = localStorage.getItem("accessToken");
  

  useEffect(() => {
    axios.get(analyticsUrl, { headers: { token: token } })
    .then((response) => {
      setAnalytics(response.data);
    });
  },[]);

  useEffect(() => {
    axios.get(topCustomerUrl, { headers: { token: token } })
    .then((response) => {
      setTopCustomer(response.data.message);
    });
  },[]);

  useEffect(() => {
    axios.get(latestOrderUrl, { headers: { token: token } })
    .then((response) => {
      setLatestOrder(response.data.message);
    });
  },[]);


  const themeReducer = useSelector((state) => state.ThemeReducer.mode);

  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-12">
          <div className="row">
              <div className="col-6" id="1">
                <StatusCard
                  icon="bx bx-shopping-bag"
                  count={analytics.totalSales}
                  title="Total sales"
                />
              </div>
              <div className="col-6" id="2">
                <StatusCard
                  icon="bx bx-dollar-circle"
                  count={analytics.totalIncome}
                  title="Total income"
                />
              </div>
              <div className="col-6" id="3">
                <StatusCard
                  icon="bx bx-receipt"
                  count={analytics.totalOrders}
                  title="Total orders"
                />
              </div>
        </div>
        </div>
        
        <div className="col-5">
          <div className="card">
            <div className="card__header">
              <h3>Top customers</h3>
            </div>
            <div className="card__body1">             
              <table className="tb1 col-12">
                <thead className="the1">
                  <tr className="tb_left">
                    <th className="th1"><a>ID</a></th>
                    <th className="th1"><a>Username</a></th>
                    <th className="th1"><a>Total Spending</a></th>
                  </tr>
                </thead>
                <tbody>
                {topCustomer.map((idx) => (
                    <tr id={idx._id}>
                       <td>#...{idx._id.slice(19,24)} </td>
                         <td>{idx.firstName} {idx.lastName}</td>                     
                        <td style={{paddingLeft: "40px"}}>{idx.total_spending}</td>
                      </tr>
                  ))}
                </tbody>
              </table>
            
            </div>
            <div className="card__footer">
              <Link to="/admin/customers"><u style={{color:"red"}}>view all</u></Link>
            </div>
          </div>
        </div>
        <div className="col-7">
          <div className="card">
            <div className="card__header">
              <h3>latest orders</h3>
            </div>

            <div className="card__body1 ">
                  <table className="tb1 col-12">
                    <thead className="the1">
                      <tr>
                        <th className="th1">ID</th>
                        <th className="th1"> Username</th>
                        <th className="th1">Total price</th>
                        <th className="th1">Date</th>
                        <th className="th1">Statusb</th>
                      </tr>
                    </thead>
                    <tbody>      
                      {latestorders.map((idx)=>(
                        <tr id={idx._id}>
                          <td>#...{idx._id.slice(19,24)}</td>
                          <td>{idx.customerId.firstName} {idx.customerId.lastName}</td>
                          <td>{idx.payableAmount}</td>
                          <td>{idx.createdAt.slice(0,10)}</td>
                          <td className="status">
                          <Badge type={orderStatus[(idx.status === "pending") ? "pending" : "paid"]} content={idx.status} />
                          </td>
                      </tr>
                       ))}
                  </tbody>
                  </table>
                  
             
     </div>
            <div className="card__footer">
              <Link to="/admin/orders"><u style={{color:"red"}}>view all</u></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
