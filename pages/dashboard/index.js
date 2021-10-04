import React from "react";
import AppLayout from "../../component/Layout/layout";
import Student from "./student/student";
import { useEffect, useState } from "react";

export default function DashBoard() {
  return (
    <AppLayout>
      <Student />
    </AppLayout>
  );
}
