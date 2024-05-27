"use client";

import clienteAxios from "./axios";
export async function login(body: { username: string; password: string }):Promise<boolean> {
  try {
    const response = await clienteAxios.post("/login", body );
    const token = response.data.accessToken;
    localStorage.setItem("accessToken", token);
    return true;
  } catch (e) {
    return false;
  }
}

export async function signUp(body: { email: string; password: string }):Promise<boolean> {
  try {
    const response = await clienteAxios.post("/register", body );
    return true;
  } catch (e) {
    return false;
  }
}

export const getInformacionUsuario = async (): Promise<{ email: string; role: string }> => {
  const response = await clienteAxios.get("/usuarios/info");
  return response.data;
}
