import { useState } from "react";
import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import AppLayout from "../../component/Layout/layout";

// const url = "https://cms.chtoma.com/api/logout";
// const token = JSON.parse(localStorage.getItem("user")).token;
// const authHeader = { Authorization: `Bearer ${token}` };

export default function DashBoard() {
  const storage = localStorage;
  // const [collapsed, setCollapsed] = useState(false);
  // const router = useRouter();
  // const onCollapsed = () => {
  //   setCollapsed(!collapsed);
  // };
  // const logout = () => {
  //   axios
  //     .post(url, {}, { headers: authHeader })
  //     .then(() => {
  //       localStorage.removeItem("user");
  //       router.push("/");
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };
  return (
    <AppLayout localStorage={storage}>
      <h1>Dashboard</h1>
    </AppLayout>
  );
}
