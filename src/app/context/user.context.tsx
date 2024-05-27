"use client"
import React, { createContext, useMemo, useState } from "react";
import { IUser } from '../model/user/IUser';

export const UserContext = createContext<{ userData?: IUser, setUserData:Function}>({
  setUserData: () => {},
});

export const UserContextProvider = ({ children }: { children: React.ReactNode}):React.ReactNode => {
  const [userData, setUserData] = useState<IUser | undefined>();
  const userContextValue = useMemo(() => ({
    userData,
    setUserData,
  }), [userData]);

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}