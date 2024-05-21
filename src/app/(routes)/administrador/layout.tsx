"use client"
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <header className="header">
          <nav>
              <a href="#palabras">Palabras</a>
              <a href="#jugadas">Jugadas</a>
              <a href="#usuarios">Usuarios</a>
          </nav>
          <div className="user-info">
              <span>Administrador</span>
              <button className="btn btn-logout">Logout</button>
          </div>
      </header>
      {children}
    </>
  );
}
