"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { login, signUp, getInformacionUsuario } from "../services/auth";

export const Login = () => {
  const router = useRouter();
  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
  });
  const [register, setRegister] = useState(false); 

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

  const handleRegister = async () => {
    const body = {
      email: usuario.username,
      password: usuario.password,
    };

    const registroExitoso = await signUp(body);
    if (registroExitoso) {
      toggleForms('login')
    }
  };

  const toggleForms = (val: string) => {
    setRegister(val == 'register');
  }

  return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container">
            <div className="toggle-container">
                <button id="login-toggle" className="btn btn-custom" onClick={() => toggleForms('login')}>Login</button>
                <button id="register-toggle" className="btn btn-custom" onClick={() => toggleForms('register')}>Register</button>
            </div>
            {!register && (
              <form id="login-form">
                <h2 className="text-center">Login</h2>
                <div className="form-group">
                    <label htmlFor="login-username">Email</label>
                    <input 
                      type="text" 
                      id="username" 
                      name="username" 
                      className="form-control" 
                      required 
                      value={usuario.username}
                      onChange={(e) => handleChange(e)}
                      />
                </div>
                <div className="form-group">
                    <label htmlFor="login-password">Password</label>
                    <input 
                      type="password" 
                      id="password" 
                      name="password" 
                      className="form-control" 
                      value={usuario.password}
                      onChange={handleChange}
                      required 
                    />
                </div>
                <button type="button" className="btn btn-custom btn-block  mt-4" onClick={() => handleLogin()}>Login</button>
            </form>
            )}
            {register && (
              <form id="register-form">
                <h2 className="text-center">Register</h2>
                <div className="form-group">
                    <label htmlFor="register-username">Email</label>
                    <input 
                      type="text" 
                      id="username" 
                      name="username" 
                      className="form-control" 
                      value={usuario.username}
                      onChange={handleChange}
                      required 
                      />
                </div>
                <div className="form-group">
                    <label htmlFor="register-password">Password</label>
                    <input 
                      type="password" 
                      id="password" 
                      name="password" 
                      className="form-control" 
                      required 
                      value={usuario.password}
                      onChange={handleChange}
                      />
                </div>
                <button type="button" className="btn btn-custom btn-block mt-4"  onClick={() => handleRegister()}>Register</button>
            </form>
            )}
            
        </div>
    </div>
  );
};
