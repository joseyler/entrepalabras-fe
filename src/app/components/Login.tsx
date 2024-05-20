"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login, getInformacionUsuario } from "../services/auth";

export const Login = () => {
  const router = useRouter();
  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUsuario((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const body = {
      username: usuario.username,
      password: usuario.password,
    };

    const loginExitoso = await login(body);
    if (loginExitoso) {
      const userData = await getInformacionUsuario();
      if (userData?.role === "ADM") {
        router.push("./administrador");
      } else {
        router.push("./jugador");
      }
    }
    
  };

  return (
    <form>
      <h2>Login</h2>
      {/* <input type="number" onChange={handleChange} /> */}
      <label htmlFor="username">Usuario</label>
      <input
        type="text"
        name="username"
        value={usuario.username}
        onChange={handleChange}
        className="input"
      />
      <label htmlFor="password">Contraseña</label>
      <input
        type="text"
        name="password"
        value={usuario.password}
        onChange={handleChange}
        className="input"
      />

      <br />
      <button type="button" onClick={handleLogin} className="submit-button">
        Log In
      </button>
    </form>
  );
};
