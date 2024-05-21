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

  // useEffect(() => {
  //   async function loadUsers() {
  //     const retrievedUsers = await getAllUsers();
  //     setUsers(retrievedUsers);
  //   }
  //   loadUsers();
  // }, []);

  return (
    
    <div className="d-flex flex-column juego justify-content-center align-items-center mt-5">
      <div className="palabra-del-dia">
        Palabra del día 21-05-2024
      </div>
      <div>Intentos 1/20</div>
      <div className="d-flex flex-row justify-content-evenly juego-row">
        <div className="flex-row justify-content-center align-items-center letraJuego letraJuegoPorcentaje ">90%</div>
        <div className="flex-row justify-content-center align-items-center letraJuego">A</div>
        <div className="flex-row justify-content-center align-items-center letraJuego">A</div>
        <div className="flex-row justify-content-center align-items-center letraJuego">A</div>
        <div className="flex-row justify-content-center align-items-center letraJuego">A</div>
        <div className="flex-row justify-content-center align-items-center letraJuego">A</div>
        <div className="juegospacer" />
      </div>
      <div className="d-flex flex-row justify-content-evenly juego-row">
        <div className="flex-row justify-content-center align-items-center letraJuego letraJuegoMiddle " />
        <input className="form-control letraJuego letraEditable" /> 
        <input className="form-control letraJuego letraEditable"  /> 
        <input className="form-control letraJuego letraEditable"  /> 
        <input className="form-control letraJuego letraEditable"  /> 
        <input className="form-control letraJuego letraEditable"  /> 
        <button type="button" className="btn btn-success btn-enviar">Enviar</button>
      </div>
      <div className="d-flex flex-row justify-content-evenly juego-row">
        <div className="flex-row justify-content-center align-items-center letraJuego letraJuegoPorcentaje ">90%</div>
        <div className="flex-row justify-content-center align-items-center letraJuego">Z</div>
        <div className="flex-row justify-content-center align-items-center letraJuego">Z</div>
        <div className="flex-row justify-content-center align-items-center letraJuego">Z</div>
        <div className="flex-row justify-content-center align-items-center letraJuego">Z</div>
        <div className="flex-row justify-content-center align-items-center letraJuego">Z</div>
        <div className="juegospacer" />
      </div>
    </div>
  );
}
