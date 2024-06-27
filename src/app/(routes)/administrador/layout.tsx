"use client"

import { UserContext } from "@/app/context/user.context";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userData, setUserData } = useContext(UserContext);
  const router = useRouter();

  const logout = ():void => {
    localStorage.removeItem("accessToken");
    setUserData(undefined);
    router.push("/");
  }
  return (
    <>
    <header className="header">
          <nav>
              <a href="#palabras">Palabras</a>
              <a href="#jugadas">Jugadas</a>
              <a href="#usuarios">Usuarios</a>
          </nav>
          <div className="user-info">
              <span>{userData?.email}</span>
              <button className="btn btn-logout" onClick={() => logout()}>Logout</button>
          </div>
      </header>
      {children}
    </>
  );
}
