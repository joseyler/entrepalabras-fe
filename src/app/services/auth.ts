"use client";
import { jwtDecode } from "jwt-decode";

export async function login(body: { username: string; password: string }) {
  const response = await fetch("http://localhost:3000/login/", {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  if (json?.accessToken) {
    localStorage.setItem("accessToken", json.accessToken);

    return getAuthenticatedUser();
  }
}

export function getAuthenticatedUser():
  | { email: string; role: string }
  | undefined {
  const token = localStorage.getItem("accessToken");
  if (token) {
    return jwtDecode(token);
  }
}
