"use client";

import { withRoles } from "@/app/components/HOC/WithRoles";
import { useEffect, useState } from "react";

// Ejemplo uso de token
async function getAllUsers() {
  const token = localStorage.getItem("accessToken");
  const response = await fetch("http://localhost:3000/usuarios/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();
  return json;
}

const Page = () => {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   async function loadUsers() {
  //     const retrievedUsers = await getAllUsers();
  //     setUsers(retrievedUsers);
  //   }
  //   loadUsers();
  // }, []);

  return (
    <div className="palabra-del-dia">
      Palabra del día 21-05-2024:
      <span>PAPAYA</span>
    </div>
  );
}

export default withRoles(Page,['Administrador'],['Administrador'], '/')
