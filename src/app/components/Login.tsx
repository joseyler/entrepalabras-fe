"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login, signUp, getInformacionUsuario } from "../services/auth";
import { UserContext } from "../context/user.context";

export const Login = () => {
  const router = useRouter();
  const { setUserData } = useContext(UserContext);
  const [usuario, setUsuario] = useState({
    username: "",
    password: "",
  });

  const [register, setRegister] = useState(false); 
  const [showLogin, setShowLogin] = useState(false);

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
      setUserData(userData);
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

  const cargarUsuarioLogueado = async () => {
    try {
    const userData = await getInformacionUsuario();
    setUserData(userData);
      if (userData?.role === "ADM") {
        router.push("./administrador");
      } else {
        router.push("./jugador");
      }
    } catch {
      setShowLogin(true);
      localStorage.removeItem("accessToken");
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      cargarUsuarioLogueado();
    } else {
      setShowLogin(true);
    }
  }, []);

  return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container">
        {!showLogin && (
          <div className="loader" />
        )}
          {showLogin && (
            <div className="toggle-container">
                <button id="login-toggle" className="btn btn-custom" onClick={() => toggleForms('login')}>Login</button>
                <button id="register-toggle" className="btn btn-custom" onClick={() => toggleForms('register')}>Register</button>
            </div>
          )}
            {!register && showLogin && (
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
            {register && showLogin && (
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
