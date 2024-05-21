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
              <a href="#palabras">Jugar</a>
              <a href="#jugadas">Jugadas Anteriores</a>
          </nav>
          <div className="user-info">
              <span>Hola usuario</span>
              <button className="btn btn-logout">Logout</button>
          </div>
      </header>
      {children}
    </>
  );
}
