import "./styles/app.scss";
import Dashboard from "./pages/Dashboard";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Personal_Info from "./pages/Personal_Info";
import { useState } from "react";
import Budget from "./pages/Budget";
import Signup from "./pages/Signup";
import Investing from "./pages/Investing";
import Spending from "./pages/Spending";
import Login from "./pages/Login";
import { useSelector, useDispatch } from "react-redux";


function App() {
  const labels = ["Bills", "Other", "Entertainment", "Food", "Gas", "Groceries", "Rent"];
  const {loginVerify, statementInfo} = useSelector(({ user }) => user);
 
  const barData = {
    labels: labels,
    datasets: [
      {
        label: "",
        backgroundColor: ["#3d7e8a", "#405f77", "#3d7e8a", "#088985", "#12b296", "#0a5554", "#3d8180"],
        data: [statementInfo.bills, statementInfo.other, statementInfo.entertainment, statementInfo.food, statementInfo.gas, statementInfo.groceries, statementInfo.rent],
      },
    ],
  };
  const pielabels = ["Necessities", "Discretionary", "Savings"];
  const pieData = {
    labels: pielabels,

    datasets: [
      {
        label: "Budget Categories",
        backgroundColor: ["#8cccab", "#405f77", "#3d7e8a", "#37d4ae"],
        borderColor: "black",
        data: [statementInfo.bills + statementInfo.food + statementInfo.gas + statementInfo.groceries + statementInfo.rent + statementInfo.entertainment, statementInfo.discretionary, (statementInfo.TFSA + statementInfo.RRSP)/12],
      },
    ],
  };
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/personal-info" element={loginVerify ? (<Personal_Info />) : (<Login />)} />
          <Route path="/dashboard" element={loginVerify ? (<Dashboard barData={barData} pieData={pieData} />) : (<Login />)} />
          <Route path="/budget" element={loginVerify ? (<Budget pieData={pieData} />) : (<Login />)} />
          <Route path="/investing" element={loginVerify ? (<Investing />) : (<Login />)} />
          <Route path="/spending" element={loginVerify ? (<Spending barData={barData} />) : (<Login />)} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
