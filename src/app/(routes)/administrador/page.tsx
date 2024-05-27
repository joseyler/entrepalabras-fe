"use client";
import { withRoles } from "@/app/components/HOC/WithRoles";
import { getInformacionUsuario } from "@/app/services/auth";
import clienteAxios from "@/app/services/axios";
import { useState } from "react";


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

export default withRoles(Page,['ADM'], '/')
