"use client";

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

export default function Page() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function loadUsers() {
      const retrievedUsers = await getAllUsers();
      setUsers(retrievedUsers);
    }
    loadUsers();
  }, []);

  return (
    <>
      <h1>Hola Admin</h1>
      <div>
        <h2>Listado de Usuarios</h2>
        <p>ID&emsp;&emsp;Email&emsp;&emsp;Activo/Inactivo</p>
        {users.map((u: any) => (
          <p key={u.email}>
            {u.id}&emsp;{u.email}&emsp;{u.activo ? "Activo" : "Inactivo"}
          </p>
        ))}
      </div>
    </>
  );
}
